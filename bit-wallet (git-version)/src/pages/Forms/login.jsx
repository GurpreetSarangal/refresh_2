import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const URL = "http://localhost:5000/api/auth/login";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const responseData = await response.json();
      console.log("after login: ", responseData);

      if (response.ok) {
        // Save token in localStorage
        localStorage.setItem("token", responseData.token);

        // Navigate to home page after login
        setTimeout(() => navigate("/user-pannel"), 500);
      } else {
        alert(responseData.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.log("Login Error:", error);
      alert("Something went wrong. Please check your network and try again.");
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen">
      <main className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">Login Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleInput}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInput}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#00d084] text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login Now
          </button>

          {/* Create account link */}
          <p className="text-center text-gray-600 text-sm mt-3">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Create account here
            </Link>
          </p>
        </form>
      </main>
    </section>
  );
};

export default Login;
