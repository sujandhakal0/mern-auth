import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      setErrorMessage("");
      const res = await axios.post("/api/auth/signin", formData);
      setLoading(false);
      setError(false);
      setErrorMessage("");
      toast.success("User Login successfull");
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(true);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Something went wrong!");
      }
    }
    const form = e.target;
    form.reset();
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="p-3 max-w-lg mx-auto w-full">
        <h1 className="text-3xl text-center font-semibold my-7">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {loading ? "loading..." : "Login"}
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Don't have an account?</p>
          <Link to="/signup">
            <span className="text-blue-500">Create an account</span>
          </Link>
        </div>
        <p className="text-red-500 mt-5">{errorMessage}</p>
      </div>
    </div>
  );
};

export default Signin;
