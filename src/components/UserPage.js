
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


function UserPage() {

  const navigate = useNavigate()

  const { userName } = useParams();
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState({
    name1: '',
    age: '',
    gender: '',
    company_name: '',
  }); // checking the user details

  useEffect(() => {
     const fetchUser =async()=> {
      try {
        const response = await axios.get(
          `https://assignment.8848digitalerp.com/api/method/assignment.API.specific_user.get_specific?name1=${userName}`,
          {
            headers: {
              Authorization: 'token eb33bed41ebc137:348f33df4a5e962',
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          const specificUser = response.data?.message?.data?.specific_user?.[0]; // this will give the Specific user 

          if (specificUser) {
            setUser(specificUser);
            setEditedUser(specificUser);
          } else {
            console.error('User not found.');
          }
        } else {
          console.error('Failed to fetch user:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchUser();
  }, [userName]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  // Handling any changes to the user listed
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `https://assignment.8848digitalerp.com/api/resource/Assignment/${userName}`,
        editedUser,
        {
          headers: {
            Authorization: 'token eb33bed41ebc137:348f33df4a5e962',
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        console.log('User data updated successfully'); // if the input is edited it will redirect to listingpage where all the updated details will be shown
        navigate("/listing")
      } else {
        console.error('Failed to update user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

;
 // this will check if the enterted age is valid or not 
  const validateAge = (age) => {
    const parsedAge = parseInt(age, 10);
    return !isNaN(parsedAge) && parsedAge >= 0 && parsedAge <= 100;
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">User Page</h1>
      {user ? (
        <div className="card shadow">
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label htmlFor="userName" className="form-label">
                  User Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  name="name1"
                  value={editedUser.name1}
                  readOnly // Make the name field readonly based on condition so that the value of name should not change or edit
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="userAge" className="form-label">
                  User Age
                </label>
                <input
                  type="number" // Use number type for age input
                  className={`form-control ${validateAge(editedUser.age) ? '' : 'is-invalid'}`}
                  id="userAge"
                  name="age"
                  value={editedUser.age}
                  onChange={handleInputChange}
                />
                
                {!validateAge(editedUser.age) && (
                  <div className="invalid-feedback">Age must be a number between 0 and 100.</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="userGender" className="form-label">
                  User Gender
                </label>
                <select
                  className="form-select"
                  id="userGender"
                  name="gender"
                  value={editedUser.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
               
              </div>
              <div className="mb-3">
                <label htmlFor="userCompanyName" className="form-label">
                  User Company Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="userCompanyName"
                  name="company_name"
                  value={editedUser.company_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="d-grid gap-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdate}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>  // if the api failed to load user this <p> will display
      )}
    </div>
  );
}

export default UserPage;

