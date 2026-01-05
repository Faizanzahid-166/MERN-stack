import axios from "axios";
import react from 'react'

export default function UserList({ myId, setSelectedUser }) {
  const [users, setUsers] = react.useState([]);

  react.useEffect(() => {
    axios.get(`http://localhost:5000/api/auth/${myId}`)
      .then(res => setUsers(res.data));
  }, []);

  return (
    <div>
      {users.map(user => (
        <div
          key={user._id}
          onClick={() => setSelectedUser(user)}
          style={{ cursor: "pointer" }}
        >
          {user.username}
        </div>
      ))}
    </div>
  );
}
