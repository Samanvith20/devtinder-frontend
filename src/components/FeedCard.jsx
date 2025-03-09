import React from "react";

const FeedCard = ({ item }) => {
  const { name, profilePicture, age, gender, skills, about } = item;
  return (
    <div className="border-2 border-gray-200  p-4 m-4 max-w-md mx-auto">
      <h1 className="text-center">{name}</h1>
      {
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgJCptPOx71EJH7cxh-m3JebMLah27zZgA7Ewl7hE6a0QpxLMhBsbrHx8&s"
          alt="profile"
          width="100"
          height="100"
        />
      }
      {age && <h3>{age}</h3>}
      {gender && <h3>{gender}</h3>}
      {skills && (
        <div>
          {skills.map((skill) => {
            return <span key={skill}>{skill}</span>;
          })}
        </div>
      )}
      {about && <h3>{about}</h3>}
      <div className="flex justify-center items-center space-x-4">
        <div>
          <button className="px-4 py-2 text-center bg-green-500 text-white rounded-md">
            Accept
          </button>
        </div>
        <div>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
