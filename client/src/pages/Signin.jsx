import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  signinStart,
  signinSuccess,
  signinFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signinStart());
      const res = await axios.post("/api/auth/signin", formData);
      dispatch(signinSuccess(res.data));
      toast.success("User Login successfull");
      navigate("/");
    } catch (error) {
      if (error.response.data.message) {
        dispatch(signinFailure(error.response.data.message));
      } else {
        dispatch(signinFailure("Something went wrong"));
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
        <p className="text-red-500 mt-5">{error ? error : ""}</p>
      </div>
    </div>
  );
};

export default Signin;
