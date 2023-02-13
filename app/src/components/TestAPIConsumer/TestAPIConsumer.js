import { useState, useEffect } from 'react'
import axios from 'axios'
import './TestAPIConsumer.css';



function TestAPIConsumer() {
    const [users, setUsers] = useState([]);
    const [error,setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3000/users")
          .then((response) => {
            setUsers(response.data);
            setError(null);
          })
          .catch(setError);
      }, []);

      if (error) return <p>An error occurred</p>

      return (
        <div className='middle'>
          {users.map(({ username, email, password }) => (
            <div key="div" className='group'>
                <span key="username">Username: {username}</span>
                <span key="email">Email: {email}</span>
                <span key="password">Password: {password}</span>
            </div>
          ))}
        </div>
      );
}

export default TestAPIConsumer;