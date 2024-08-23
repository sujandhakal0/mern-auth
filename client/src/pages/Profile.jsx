import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
const Profile = () => {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});

  const { currentUser } = useSelector((state) => state.user);

  const handleImageUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePhoto: downloadURL })
        );
      }
    );
  };

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-11">Profile</h1>
      <form className="flex flex-col items-center gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
<<<<<<< HEAD
        />
        <img
          src={formData.profilePhoto || currentUser.profilePhoto}
          alt="Profile-photo"
          className="h-24 w-24 rounded-full cursor-pointer"
          onClick={() => fileRef.current.click()}
        />
        <p>
          {imageError ? (
            <span className="text-red-700">
              Error uploading image(file size must be less then 2 MB)
            </span>
=======
        />
        <img
          src={currentUser.profilePhoto}
          alt="Profile-photo"
          className="h-24 w-24 rounded-full cursor-pointer"
          onClick={() => fileRef.current.click()}
        />
        <p>
          {imageError ? (
            <span className="text-red-700">Error uploading image(file size must be less then 2 MB)</span>
>>>>>>> a58a236bd9f301ca0c9bc96acdba9ee60774e365
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Uploading image...: ${imagePercent}%`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image Uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="w-full bg-slate-100 rounded-xl p-3"
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="email"
          className="w-full bg-slate-100 rounded-xl p-3"
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="w-full bg-slate-100 rounded-xl p-3"
        />
        <button className="bg-slate-700 text-white p-3 rounded-xl w-full uppercase hover:bg-slate-500">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Signout</span>
      </div>
    </div>
  );
};

export default Profile;
