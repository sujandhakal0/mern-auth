import React from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signinSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";


const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleOAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const { displayName, email, photoURL } = result.user;
      const res = await axios.post("/api/auth/google", {
        name: displayName,
        email,
        photo: photoURL,
      });
      dispatch(signinSuccess(res.data));
      toast.success("User Login successfull");
      navigate("/");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleOAuth}
      type="button"
      className=" text-blace bg-white hover:bg-gray-100 border-gray-300 border font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-3"
    >
      <FcGoogle className="text-xl" />
      Continue with Google
    </button>
  );
};

export default OAuth;
