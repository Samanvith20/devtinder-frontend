
import React, {  useEffect, useState,} from 'react'
import FeedCard from './FeedCard'
import { useDispatch, useSelector } from 'react-redux'
import { addfeed } from '../utils/feedSlice'


const Spinner = () => {
  return (
    <div className="flex justify-center items-center my-24">
      <div className="w-30 h-30 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

const Feed = () => {
 
 const[loading ,setLoading]=useState(true)
  const dispatch=useDispatch()
  const feed=useSelector((state)=>state.feed.feedpage)
  console.log("Feed",feed)

   const getFeed=async()=>{
    if(feed.length >0 ) return
    try {
      const response = await fetch(`http://localhost:3000/api/profile/view/feed`, {
        method: "GET",
        credentials:"include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log("Feed Data",data)
      
      dispatch(addfeed(data.data))
      if(!response.ok){
        throw new Error(data.message || "Error  occured while fetching feed")
      }
    } catch (error) {
      console.log("Error",error)
      
    }
    finally{
      setLoading(false)
    }
   }
   useEffect(() => {
    getFeed()
   }, [])

   if (!feed) return;
   if(loading) return <Spinner/>

  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;
  return (
    <div>
       <h1 className='text-5xl font-bold text-center'> Feed page</h1>
    {
      feed && feed.length >0 &&  (
      <div className="flex justify-center my-10">
        <FeedCard user={feed[0]} />
      </div>
      )
}
    
    </div>
  )
}

export default Feed
