import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-11">Profile</h1>
      <form className="flex flex-col items-center gap-4">
        <img
          src={currentUser.profilePhoto}
          alt="Profile-photo"
          className="h-24 w-24 rounded-full"
        />
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
        <button className="bg-slate-700 text-white p-3 rounded-xl w-full uppercase hover:bg-slate-500">Update</button>
      </form>
      <div className="flex justify-between mt-4">
         <span className="text-red-700 cursor-pointer">Delete Account</span>
         <span className="text-red-700 cursor-pointer">Signout</span>
      </div>
    </div>
  );
};

export default Profile;
