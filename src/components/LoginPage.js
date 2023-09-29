
import React, { useState } from 'react';
import axios from 'axios'; // for fetching data 
import { useNavigate } from "react-router-dom"

function LoginPage() {

  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    if (!email || !password) {
      // Check if email or password is empty
      setErrorMessage('Email and password are required.');
      return;
    }
  
    try {
      const response = await axios.get(
        `https://assignment.8848digitalerp.com/api/method/assignment.API.access_token.get_access_token?usr=${email}&pwd=${password}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200 && response.data.message.msg === 'success') {
        // Authentication successful
        console.log('Authentication successful. Access Token:', response.data.message.data.access_token); // this will tell us if we are authenticated user or not.
        // You can navigate to the listing page or perform other actions here.
        // localStorage.setItem('authenticated', JSON.stringify(response));
        
        navigate("/listing");
      } else {
        // Authentication failed
        setErrorMessage('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while logging in. Please try again.');
    }
  };
  

  return (

    // Used bootstrap for UI
    <div
      className="container d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="card shadow w-50 h-20">
        <div className="card-body">
          <h1 className="text-center mb-4">Login</h1>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid">
              <button type="button" className="btn btn-primary" onClick={handleLogin}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

