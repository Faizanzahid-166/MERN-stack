import { useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../context/AuthContext";

const socket = io("http://localhost:5000", {
  autoConnect: false
});

export const useSocket = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    // ✅ attach listeners FIRST
    socket.on("connect", () => {
      console.log("🟢 Frontend socket connected:", socket.id);
      socket.emit("addUser", user.userId);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Frontend socket disconnected");
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket error:", err.message);
    });

    // 🔌 then connect
    socket.connect();

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.disconnect();
    };
  }, [user]);

  return socket;
};

export default useSocket;
