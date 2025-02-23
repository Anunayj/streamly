import React, { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const JoinRoom = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const createNewRoom = (e) => {
    e.preventDefault();
    // const id = uuidV4();
    const id = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomId(id);
    toast.success("Created a new room");
  };

  const joinRoom = () => {
    if (! /^[a-zA-Z0-9]{6}$/.test(roomId)) {
      toast.error("Invalid Room ID");
      return;
    }

    if(username.length < 3 || username.length > 20) {
      toast.error("Username should be between 3 to 20 characters");
      return;
    }

    if (!roomId || !username) {
      toast.error("Please fill all the fields");
      return;
    }

    navigate(`/room/${roomId}`, {
      state: {
        username,
      },
    });
  };

  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="formWrapper bg-grey bg-opacity-10 rounded-lg backdrop-blur-md sm:max-w-96 px-10 py-10 p-8 max-w-md mx-auto">
      <h4 className="text-xl text-white mb-6">Enter Room Details to Join</h4>
      <div className="inputGroup space-y-4">
        <input
          type="text"
          className="inputBox w-full p-3 rounded bg-white bg-opacity-20 text-black placeholder-gray-500 focus:outline-none focus:bg-opacity-30"
          placeholder="Room ID"
          onChange={(e) => setRoomId(e.target.value)}
          value={roomId}
          onKeyUp={handleInputEnter}
        />
        <input
          type="text"
          className="inputBox w-full p-3 rounded bg-white bg-opacity-20 text-black placeholder-gray-500 focus:outline-none focus:bg-opacity-30"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          onKeyUp={handleInputEnter}
        />
        <button
          className="btn joinBtn w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 transition duration-300"
          onClick={joinRoom}
        >
          Join Room
        </button>
        <span className="createInfo text-gray-300 text-sm ">
          Don't have an invite? Create a{" "}
          <a
            onClick={createNewRoom}
            href="#"
            className="text-red-500 hover:text-red-600"
          >
            new room
          </a>
        </span>
      </div>
    </div>
  );
};

export default JoinRoom;
