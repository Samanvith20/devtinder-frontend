import React, {  useEffect, useState } from 'react'
import FeedCard from './FeedCard'

const Feed = () => {
  const [feedpage, setFeedpage] = useState([])
  console.log("Feed Page",feedpage)

   const getFeed=async()=>{
    try {
      const response = await fetch(`http://localhost:3000/api/profile/view/feed`, {
        method: "GET",
        credentials:"include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log("Feed Data",data)
      setFeedpage(data.data)
      if(!response.ok){
        throw new Error(data.message || "Error  occured while fetching feed")
      }
    } catch (error) {
      console.log("Error",error)
      
    }
   }
   useEffect(() => {
    getFeed()
   }, [])

  return (
    <div>
       <h1 className='text-5xl font-bold text-center'> Feed page</h1>
      <div>
        {feedpage.map((item)=>{
          return(
           <FeedCard key={item._id} item={item}/>
          )
        })}
      </div>
    </div>
  )
}

export default Feed
