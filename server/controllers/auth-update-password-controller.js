const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const ENCRYPTION_ALGORITHM = "aes-256-cbc";

// 🔐 Reuse same encryption/decryption logic
function decryptPrivateKey(encryptedWithIv, password) {
    console.log(encryptedWithIv);
    const [encrypted, iv] = encryptedWithIv.split(":");
    console.log("this works");
  const key = crypto.scryptSync(password, "salt", 32);
  const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, key, Buffer.from(iv, "hex"));
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

function encryptPrivateKey(privateKey, password) {
  const key = crypto.scryptSync(password, "salt", 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, key, iv);

  let encrypted = cipher.update(privateKey, "utf8", "hex");
  encrypted += cipher.final("hex");

  return `${encrypted}:${iv.toString("hex")}`;
}

// 🔄 POST /api/wallet/update-settings
const updatePasswordController = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.userId;
    
    if (!currentPassword || !newPassword) {
        return res.status(400).json({ msg: "Both current and new passwords are required." });
    }
    
    const user = await User.findById(userId).select("+password +accounts.private_key");
    
    if (!user) return res.status(404).json({ msg: "User not found" });
    
    // ✅ Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
        return res.status(401).json({ msg: "Incorrect current password" });
    }
    
    // 🔓 Decrypt existing private key using current password
    const existingEncrypted = user.accounts[0].private_key;
    console.log(user.accounts[0])
    let decryptedKey;
    try {
        decryptedKey = decryptPrivateKey(existingEncrypted, currentPassword);
        // console.log(currentPassword);
        // console.log(newPassword);
    } catch (err) {
        return res.status(500).json({ msg: "Private key decryption failed. Password incorrect." });
    }
    
    // 🔐 Re-encrypt private key with new password
    const newEncrypted = encryptPrivateKey(decryptedKey, newPassword);
    user.accounts[0].private_key = newEncrypted;

    // 🔄 Update password (hashed)
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.status(200).json({ msg: "Password and private key updated successfully." });

  } catch (error) {
    console.error("Password update error:", error);
    res.status(500).json({ msg: "Server error while updating password." });
  }
};

module.exports = { updatePasswordController };
