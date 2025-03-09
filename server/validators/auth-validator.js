const { z } = require("zod");

//create an object scheema
const signupSchema = z.object({
        username: z.string({ required_error: " Name is required"})
        .trim()
        .min(3, {message:"Name must be at least 3 characters long"})
        .max(255, {message:"Name must not be at most 255 characters long"}),

        email: z.string({ required_error: " Email is required"})
        .trim()
        .email({message:"Invalid email address"})
        .min(3, {message:"Email must be at least 3 characters long"})
        .max(255, {message:"Email must not be at most 255 characters long"}),

        password: z.string({ required_error: " Password is required"})
        .trim()
        .min(7, {message:"Password must be at least 3 characters long"})
        .max(1024, {message:"Passwprd must not be at most 255 characters long"}),
        

    
});

module.exports = signupSchema;