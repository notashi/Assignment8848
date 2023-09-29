import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function ListingPage() {
  const [users, setUsers] = useState([]);  // setting the state user so that it can render it on ui

  useEffect(() => {
    const fetchUsers =async()=> {
      try {
        const response = await axios.get(
          'https://assignment.8848digitalerp.com/api/method/assignment.API.all_users_api.get_user',
          {
            headers: {
              'Authorization': 'token eb33bed41ebc137:348f33df4a5e962',
            },
          }
        );

        if (response.status === 200) {
          setUsers(response.data.message.data);
        } else {
          console.error('Failed to fetch users:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="text-center mb-4" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
                Listing Page
              </h1>
              <table className="table table-bordered">
                <thead className="table-dark">
                  <tr>
                    {users.length > 0 &&
                      Object.keys(users[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      {Object.values(user).map((value, index) => (
                        <td key={index}>
                          {index === 0 ? (
                            <Link to={`/user/${value}`}>{value}</Link> // using link so that it will direct to the selected user
                          ) : (
                            value
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ListingPage;
