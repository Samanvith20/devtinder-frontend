import React from "react";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";




const FeedCard = ( props) => {

  

  const url=window.location.href
  console.log("URL",url)
  
  
  console.log("props", props);
  const { name, photoUrl, age, gender, about,skills,_id} = props.user;
       console.log("User",props.user)
   const dispatch=useDispatch() 

  const handleSendRequest = async (status, id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/request/send/${status}/${id}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          
        }
      );
      const data = await response.json();
      console.log("Data", data);
      dispatch(removeUserFromFeed(id))

      if (!response.ok) {
        throw new Error(data.message || "Error occurred while sending request");
      }
      
    } catch (error) {
      console.log("Error", error);
    }
  }
  return (
    <div
      className="flex flex-row items-center border-2 border-gray-200 rounded-lg p-4 m-4 max-w-2xl mx-auto shadow-lg bg-white"
    >
      {/* Left Side: Profile Image */}
      <div className="w-32 h-32 flex-shrink-0">
        <img
          src={photoUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgJCptPOx71EJH7cxh-m3JebMLah27zZgA7Ewl7hE6a0QpxLMhBsbrHx8&s"}
          alt="profile"
          className="w-full h-full object-cover rounded-full border-2 border-gray-300"
        />
      </div>
  
      {/* Right Side: User Details & Actions */}
      <div className="ml-6 text-left flex flex-col justify-between w-full">
        <div>
          <h1 className="text-xl font-bold text-gray-800">{name}</h1>
          {age && <p className="text-sm text-gray-600">Age: {age}</p>}
          {gender && <p className="text-sm text-gray-600">Gender: {gender}</p>}
          {about && <p className="text-sm text-gray-600">About: {about}</p>}
          {skills && <p className="text-sm text-gray-600">Skills: {skills}</p>}
        </div>
  
        {/* Action Buttons */}
         {
          !url.includes("/profile") &&(
         
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => handleSendRequest("interested", _id)}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
                        Interested

          </button>
          <button
            onClick={() => handleSendRequest("ignored", _id)}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
               Ignore
          </button>
        </div>
          )
        }
      </div>
    </div>
  );
  
};

export default FeedCard;
