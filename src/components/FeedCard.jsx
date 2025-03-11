import React from "react";

const FeedCard = ({ item }) => {
  const { name, profilePicture, age, gender, about,skills,_id} = item;

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
      if (!response.ok) {
        throw new Error(data.message || "Error occurred while sending request");
      }
      
    } catch (error) {
      console.log("Error", error);
    }
  }
  return (
    <div className="border-2 w-full  flex flex-col  border-gray-200  p-4 m-4 max-w-md mx-auto">
      <h1 className="text-center">{name}</h1>
      {
        profilePicture ?
        (
          <img
          src={profilePicture}
          alt="profile"
          width="100"
          height="100"
        />
        ) :(
          <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgJCptPOx71EJH7cxh-m3JebMLah27zZgA7Ewl7hE6a0QpxLMhBsbrHx8&s"
          alt="profile"
          width="100"
          height="100"
          className="rounded-full w-40 h-30"
        />
        )
      }
      {age && <h3 className="text-sm "> Age: {age}</h3>}
      {gender && <h3> Gender: {gender}</h3>}
     
      {about && <h3>{about}</h3>}
      {
        skills && <h3>Skills: {skills}</h3>
      }
      <div className="flex justify-center items-center space-x-4">
        <div>
          <button 
            onClick={() => handleSendRequest("interested", _id)}
          className="px-4 py-2 text-center bg-green-500 text-white rounded-md">
            Accept
          </button>
        </div>
        <div>
          <button 
            onClick={() => handleSendRequest("ignored", _id)}
          className="px-4 py-2 bg-red-500 text-white rounded-md">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
