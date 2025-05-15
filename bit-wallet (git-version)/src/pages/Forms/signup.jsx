import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    phone_number: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, phone_number } = user;

    // Basic validation
    if (!username || !email || !password || !phone_number) {
      alert("All fields are required!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Invalid email format!");
      return;
    }

    if (!/^\d{10}$/.test(phone_number)) {
      alert("Phone number must be 10 digits!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        setUser({ username: "", email: "", password: "", phone_number: "" });
        navigate("/login");
      } else {
        alert(data.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Register error:", error);
      alert("Something went wrong, please try again.");
    }
  };

  return (
    <section className="flex justify-center items-center mt-20">
      <main className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">Registration Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-600">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleInput}
              placeholder="Enter your username"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInput}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="phone_number" className="block text-gray-600">Phone Number</label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              value={user.phone_number}
              onChange={handleInput}
              placeholder="Enter your phone number"
              pattern="[0-9]{10}"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleInput}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#00d084] text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Register Now
          </button>

          <p className="text-center text-gray-600 text-sm mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </main>
    </section>
  );
};

export default Signup;
