import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FeedCard from "./FeedCard";
import { addUser } from "../utils/UserSlice";
import toast, { Toaster } from "react-hot-toast";

const EditProfile = ({ user }) => {
  // console.log("User", user);
  const [firstName, setFirstName] = useState(user.name);
  //   const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const[skills,setSkills]=useState(user.skills || [])

  const dispatch = useDispatch();
  useEffect(() => {
    setFirstName(user.name || "");
    setPhotoUrl(user.photoUrl || "");
    setAge(user.age || "");
    setGender(user.gender || "");
    setAbout(user.about || "");
    setSkills((user.skills) ? user.skills : []);
  }, [user]);

  const saveProfile = async () => {
    const toastId=toast.loading("Saving Profile...")
    try {
      const response = await fetch(
        `http://localhost:3000/api/profile/view/edit-profile`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName,
           skills,
            photoUrl,
            age,
            gender,
            about,
          }),
        }
      );
      const data = await response.json();
      console.log("Data", data);
      if (!response.ok) {
        throw new Error(data.message || "Error occurred while saving profile");
      }
      dispatch(addUser(data.data));
      toast.success("Profile Saved Successfully",{id:toastId})
    } catch (error) {
      console.log("Error", error);
      toast.error("Error occurred while saving profile",{id:toastId})
    }
  };

  return (
    <div className="flex flex-col md:flex-row  justify-center items-start gap-10 my-10 px-6">
      {/* Edit Profile Form */}
      <Toaster />
      <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full md:w-1/2">
        <h2 className="text-2xl font-bold text-center mb-4">Edit Profile</h2>
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700">First Name:</span>
            <input
              type="text"
              value={firstName}
              className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-blue-400 hover:shadow-lg bg-gray-100"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Photo URL:</span>
            <input
              type="text"
              value={photoUrl}
              className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-blue-400 hover:shadow-lg bg-gray-100"
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Age:</span>
            <input
              type="number"
              value={age}
              className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-blue-400 hover:shadow-lg bg-gray-100"
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Gender:</span>
            <input
              type="text"
              value={gender}
              className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-blue-400 hover:shadow-lg bg-gray-100"
              onChange={(e) => setGender(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Skills</span>
            <input
              type="text"
              value={skills}
              className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-blue-400 hover:shadow-lg bg-gray-100"
              onChange={(e) => setSkills(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">About:</span>
            <textarea
              value={about}
              className=" text-sm w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-blue-400 hover:shadow-lg bg-gray-100"
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
          </label>
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition duration-300"
            onClick={saveProfile}
          >
            Save Profile
          </button>
        </div>
      </div>

      {/* Live Preview */}
      <div className=" w-1/2 bg-[re flex justify-center">
        <FeedCard user={{ firstName, photoUrl, age, gender, about,skills }} />
      </div>
    </div>
  );
};

export default EditProfile;
