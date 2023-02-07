import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

const ListUser = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users")
    setUser(response.data);
  }

  const delateUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`)
      getUsers();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
          <Link to={`add`} className="button is-success">
            Add New
          </Link>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Country</th>
              <th>Horoscope</th>
              <th>Hobby</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>{user.Country.name}</td>
                <td>{user.Horoscope.name}</td>
                <td>{user.Hobby.name}</td>
                <td>
                  <Link to={`edit/${user.id}`} className='button is-small is-info'>Edit</Link>
                  <button onClick={() => delateUser(user.id)} className='button is-small is-danger'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListUser