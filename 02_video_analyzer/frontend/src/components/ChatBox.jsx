import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket.js";
import axios from "axios";

export default function ChatBox({ myId, selectedUser }) {
  const socket = useSocket();
  const chatId = [myId, selectedUser._id].sort().join("_");

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!socket) return;

    socket.emit("joinRoom", chatId);

    axios
      .get(`http://localhost:5000/api/chat/${chatId}`)
      .then(res => setMessages(res.data));

    socket.on("receiveMessage", msg => {
      setMessages(prev => [...prev, msg]);
    });
    

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket, selectedUser]);

  const send = () => {
    if (!text.trim()) return;

    const msg = {
      chatId,
      sender: myId,
      receiver: selectedUser._id,
      text
    };

    socket.emit("sendMessage", msg);
    setMessages(prev => [...prev, msg]);
    setText("");
  };

  return (
    <div>
      <h3>Chat with {selectedUser.username}</h3>

      {messages.map((m, i) => (
        <p key={i}>{m.text}</p>
      ))}

      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={send}>Send</button>
    </div>
  );
}
