import React, { useEffect, useState } from "react";


const Spinner = () => {
  return (
    <div className="flex justify-center items-center my-24">
      <div className="w-30 h-30 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("Connections", connections);

  const getConnections = async () => {
    if (connections.length > 0) return;
   
    try {
      const response = await fetch(`http://localhost:3000/api/profile/view/connections`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log("Connections Data", data);
      setConnections(data.data);
      
      if (!response.ok) {
        throw new Error(data.message || "Error occurred while fetching connections");
      }
    
    } catch (error) {
      
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (loading) return <Spinner />;

  if (!loading && connections.length === 0) {
    return <div className="text-center text-gray-500 text-xl my-10">No Connections</div>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-3xl mb-6">Connections</h1>
      
      {connections.map((item) => (
        <div
          key={item._id}
          className="flex flex-row items-center border-2 border-gray-200 rounded-lg p-4 m-4 max-w-2xl mx-auto shadow-lg bg-white"
        >
          {/* Left Side: Profile Image */}
          <div className="w-32 h-32 flex-shrink-0">
            <img
              src={
                item.photoUrl ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgJCptPOx71EJH7cxh-m3JebMLah27zZgA7Ewl7hE6a0QpxLMhBsbrHx8&s"
              }
              alt="profile"
              className="w-full h-full object-cover rounded-full border-2 border-gray-300"
            />
          </div>

          {/* Right Side: User Details */}
          <div className="ml-6 text-left">
            <h1 className="text-xl font-bold text-gray-800">{item.name}</h1>
            {item.age && <p className="text-sm text-gray-600">Age: {item.age}</p>}
            {item.email && <p className="text-sm text-gray-600">Email: {item.email}</p>}
            {item.about && <p className="text-sm text-gray-600">About: {item.about}</p>}
            {item.skills && <p className="text-sm text-gray-600">Skills: {item.skills}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Connections;
