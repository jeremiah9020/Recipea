import React from 'react';
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/authContext'
import './TestAPIConsumer.css';

function TestAPIConsumer(props) {
  const [response,setResponse] = useState("")
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "http://localhost:3001/api/test", 
        {
          method:'POST',
          credentials:'include'
        })

      if (response.ok) {
        setResponse("You are authenticated")
      } else {
        setResponse("You are not authenticated")
      }
    }

    getData();
    },[isAuthenticated]);

    return (
      <div>
        {response}
      </div>
    );
}

export default TestAPIConsumer;