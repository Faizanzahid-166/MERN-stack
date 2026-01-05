import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import ChatBox from "../components/ChatBox";
import { io } from "socket.io-client";

// create socket OUTSIDE component (important)
const socket = io("http://localhost:5000");

export default function ChatBook() {
  const { user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]); // ✅ FIX

  /* ---------------- FETCH USERS ---------------- */
  useEffect(() => {
    if (!user) return;

    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        const otherUsers = res.data.filter(
          (u) => u._id !== user.userId
        );
        setUsers(otherUsers);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, [user]);

  /* ---------------- SOCKET: ONLINE USERS ---------------- */
  useEffect(() => {
    if (!user) return;

    // tell backend user is online
    socket.emit("addUser", user.userId);

    // receive online users list
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("onlineUsers");
    };
  }, [user]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* USERS LIST */}
      <div
        style={{
          width: "250px",
          borderRight: "1px solid gray",
          padding: "10px"
        }}
      >
        <h3>Users</h3>

        {users.length === 0 && <p>No other users</p>}

        {users.map((u) => {
          const isOnline = onlineUsers.includes(u._id);

          return (
            <div
              key={u._id}
              onClick={() => setSelectedUser(u)}
              style={{
                padding: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background:
                  selectedUser?._id === u._id ? "#eee" : "transparent"
              }}
            >
              {/* online indicator */}
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: isOnline ? "green" : "gray"
                }}
              />
              {u.username}
            </div>
          );
        })}
      </div>

      {/* CHAT AREA */}
      <div style={{ flex: 1 }}>
        {selectedUser ? (
          <ChatBox
            myId={user.userId}
            selectedUser={selectedUser}
            socket={socket}
          />
        ) : (
          <p style={{ padding: "20px" }}>
            Select a user to start chat
          </p>
        )}
      </div>
    </div>
  );
}
