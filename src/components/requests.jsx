import React, { useEffect, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import { addrequests } from '../utils/requestSlice';
import toast, { Toaster } from 'react-hot-toast';


const Spinner = () => {
  return (
    <div className="flex justify-center items-center my-24">
      <div className="w-30 h-30 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

const Requests = () => {
  const [loading, setLoading] = React.useState(false);
    
       const dispatch=useDispatch()
    const requests= useSelector((state)=>state.request)
    console.log("Requests",requests)
    
  const getRequests = async () => {

    
    try {
      setLoading(true)
        const response= await fetch(`http://localhost:3000/api/profile/user/requests`,{
            method:"GET",
            credentials:"include",
            headers:{"Content-Type":"application/json"}
        })
        const data = await response.json()
        console.log("Requests Data",data)
        
        dispatch(addrequests(data.data))
        if(!response.ok){
            throw new Error(data.message || "Error occured while fetching requests")
        }
    } catch (error) {
        console.log("Error",error)
    }
    finally{
      setLoading(false)
    }
  }

  const reviewRequest = async (status, id) => {

    const toastLoading = toast.loading("Sending request...");
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
      if(response.ok){
      dispatch(removeUserFromFeed(id))
      toast.success(data.message || "Request reviewed successfully",{
        id:toastLoading
      });
    }else{
      toast.error(data.message || "Error occured while reviewing request",{
        id:toastLoading
      });

    }
     
      
    } catch (error) {
      console.log("Error", error);
      toast.error("Error occured while reviewing request",{
        id:toastLoading
      });
    }
  }
  useEffect(() => {
    getRequests()
  }
, [])

if (!requests) return;
if(loading) return   <Spinner />



  if (requests.length === 0)
    return <h1 className="flex justify-center my-10"> No Requests Found</h1>;
return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-3xl mb-6">Connection Requests</h1>
       <Toaster/>
      { requests.length >0 && requests.map((request) => {
        const { _id, email,name, photoUrl, age, gender, about } = request.senderId;
  
        return (
          <div
            key={_id}
            className="flex flex-row items-center border-2 border-gray-200 rounded-lg p-4 m-4 max-w-2xl mx-auto shadow-lg bg-white"
          >
            {/* Left Side: Profile Image */}
            <div className="w-32 h-32 flex-shrink-0">
              <img
                src={photoUrl || 
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgJCptPOx71EJH7cxh-m3JebMLah27zZgA7Ewl7hE6a0QpxLMhBsbrHx8&s"}
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
