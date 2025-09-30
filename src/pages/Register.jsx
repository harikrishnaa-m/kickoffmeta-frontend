import { useState } from "react";
import {
  FaFutbol,
  FaUser,
  FaEnvelope,
  FaLock,
  FaArrowRight,
} from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import { GoogleloginAPI, loginAPI, registerAPI } from "../services/allAPIs";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({});
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isLogin) {
      setLoginDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  console.log(formData);
  console.log(loginDetails);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Registration
    if (!isLogin) {
      const { password, confirmPassword } = formData;

      if (password !== confirmPassword) {
        toast.error("Passwords don't match!");
        return;
      }

      try {
        const res = await registerAPI(formData);
        if (res.status === 401) {
          toast.warning("user already existing");
        }

        if (res.status === 201) {
          toast.success("User registered successfully!");
          //switch to login view
          setIsLogin(true);
        }
      } catch (err) {
        toast.error("Something went wrong. Please try again.");
      }
    } //login
    else {
      try {
        const result = await loginAPI(loginDetails);
        console.log(result);
        if (result.status == 200) {
          sessionStorage.setItem("token", result.data.token);
          sessionStorage.setItem(
            "existingUser",
            JSON.stringify(result.data.existinguser)
          );
          toast.success("Login successfull..", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setLoginDetails({
            email: "",
            password: "",
          });
          if (result.data.existinguser.role == "user") {
            navigate("/");
          } else {
            navigate("/competitions");
          }
        } else {
          toast.error(result.response.data, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleGoogleAuth = async (credentialResponse) => {
    console.log(credentialResponse);
    const decode = jwtDecode(credentialResponse.credential);
    console.log(decode);
    try {
      const result = await GoogleloginAPI({
        fullName: decode.name,
        email: decode.email,
        password: "googlepswd",
        photo: decode.picture,
      });
      console.log(result);
      if (result.status == 200) {
        sessionStorage.setItem("token", result.data.token);
        sessionStorage.setItem(
          "existingUser",
          JSON.stringify(result.data.existinguser)
        );
        toast.success("Login successfull..", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoginDetails({
          email: "",
          password: "",
        });
        if (result.data.existinguser.role == "user") {
          navigate("/");
        } else {
          navigate("/competitions");
        }
      } else {
        toast.error(result.response.data, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      console.log("errpr:", err);
    }
  };

  console.log(formData);

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center  bg-gray-50 p-4">
        <div className="w-full max-w-6xl bg-white   rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
          {/* Left side - Green panel */}
          <div className="w-full md:w-2/5 bg-gradient-to-br from-black/90 to-indigo-950 p-10 text-white flex flex-col justify-center">
            <div className="text-center md:text-left">
              <FaFutbol className="mx-auto md:mx-0 text-5xl mb-6 opacity-90" />
              <h2 className="text-3xl font-bold mb-4">
                {isLogin ? "Welcome Back!" : "Join KickOff Meta"}
              </h2>
              <p className="text-lg mb-8 opacity-90">
                {isLogin
                  ? "Sign in to manage your tournaments"
                  : "Register now to create and manage your football tournaments with our powerful tools!"}
              </p>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="w-full md:w-3/5 p-10">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center md:text-left">
                {isLogin ? "Sign In" : "Create Account"}
              </h3>

              {!isLogin && (
                <>
                  {/* Full Name */}
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        name="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                        placeholder="Arjen Robben"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        name="email"
                        type="email"
                        required
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {/* Role Dropdown */}
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">
                      I want to:
                    </label>
                    <div className="relative">
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full pl-3 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent appearance-none"
                        required
                      >
                        <option value="organizer">Build a Tournament</option>
                        <option value="user">Kick Off with a Team</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                        ▼
                      </div>
                    </div>
                  </div>
                </>
              )}
              {isLogin && (
                <div className="mb-8">
                  <label className="block text-gray-700 mb-2">Email Id</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="email"
                      type="text"
                      required
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                      placeholder="Enter your Email ID"
                    />
                  </div>
                </div>
              )}

              {/* Password */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">
                  {isLogin ? "Password" : "Create Password"}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="password"
                    type="password"
                    required
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                    placeholder={
                      isLogin ? "Enter your password" : "Create a password"
                    }
                  />
                </div>
              </div>

              {/* Confirm Password */}
              {!isLogin && (
                <div className="mb-8">
                  <label className="block text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>
              )}

              {/* Remember me & Forgot Password */}
              {isLogin && (
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 cursor-pointer text-green-600 focus:ring-blue-800 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#"
                    className="text-sm text-blue-800 hover:text-blue-700"
                  >
                    Forgot password?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-br from-black/90 to-indigo-950 hover:bg-green-700 text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 transition duration-300"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </button>

              {/* Toggle between Sign In / Register */}
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-800 hover:text-blue-700 cursor-pointer font-medium inline-flex items-center focus:outline-none"
                >
                  {isLogin
                    ? "Don't have an account? Register"
                    : "Already have an account? Sign In"}
                  <FaArrowRight className="ml-2" />
                </button>
              </div>

              {/* OR Google Sign-In */}
              {isLogin ? (
                <div>
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      console.log(credentialResponse); //generates a token...decoded using jwt-decode
                      handleGoogleAuth(credentialResponse);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </div>
              ) : null}
              {/* <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-2 bg-white text-gray-500 text-sm">
                      Or
                    </span>
                  </div>
                </div>

                <button className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 mt-6">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="text-sm font-medium">
                    Continue with Google
                  </span>
                </button>
              </div> */}
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Register;
