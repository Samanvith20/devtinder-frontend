import React, { useEffect, useState } from 'react'

const Connections = () => {
const [connections, setConnections] = useState([])
  const getConnections = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/profile/view/connections`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log("Connections Data", data)
      if (!response.ok) {
        throw new Error(data.message || "Error  occured while fetching connections")
      }
    } catch (error) {
      console.log("Error",error)
      
    }
  }

  useEffect(() => {
    getConnections()
  }, [])
  return (
    <div>
      connections 
    </div>
  )
}

export default Connections
