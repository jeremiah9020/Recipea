import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import './TestAPIConsumer.css';

function TestAPIConsumer(props) {
  const [response,setResponse] = useState("")

    useEffect(() => {
        axios.get("http://localhost:3001/testing/authorized",{headers:{Authorization: `Bearer ${props.token}`}})
          .then((response) => {
            setResponse(response.data.message)
          })
          .catch((e) => {
            setResponse(e.message)
          });
      });

      return (
        <div>
          {response}
        </div>
      );
}

export default TestAPIConsumer;