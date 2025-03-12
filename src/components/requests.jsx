import React, { useEffect, useState } from 'react'

const Requests = () => {
    const[requests,setRequests] = useState([])
  const getRequests = async () => {
    try {
        const response= await fetch(`http://localhost:3000/api/profile/user/requests`,{
            method:"GET",
            credentials:"include",
            headers:{"Content-Type":"application/json"}
        })
        const data = await response.json()
        console.log("Requests Data",data)
        setRequests(data.data)
        if(!response.ok){
            throw new Error(data.message || "Error occured while fetching requests")
        }
    } catch (error) {
        console.log("Error",error)
    }
  }
  const reviewRequest = async (status, id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/request/review/${status}/${id}`,
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
  useEffect(() => {
    getRequests()
  }
, [])
if(requests.length === 0){
    return <div className='text-center text-gray-500 text-xl my-10'>No Requests</div>
}
return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-3xl mb-6">Connection Requests</h1>
  
      {requests.map((request) => {
        const { _id, email,name, photoUrl, age, gender, about } = request.senderId;
  
        return (
          <div
            key={_id}
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
                <h2 className="text-xl font-bold text-gray-800">{name}</h2>
                {age && <p className="text-sm text-gray-600">Age: {age}</p>}
                {email && <p className="text-sm text-gray-600">Email: {email}</p>}
                {gender && <p className="text-sm text-gray-600">Gender:{gender} </p>}
                {about && <p className="text-sm text-gray-600">{about}</p>}
              </div>
  
              {/* Action Buttons */}
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => reviewRequest("rejected", request._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Reject
                </button>
                <button
                  onClick={() => reviewRequest("accepted", request._id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
  
};

export default Requests
