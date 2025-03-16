import React, { useEffect, useRef, useState } from "react";
import Client from "../components/Client";
import VideoPlayer from "../components/VideoPlayer";
import ACTIONS from "../../shared/Actions";
import { initSocket } from "../socket";

import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-toastify";

async function wait(element, targetevent) {
  // eat the event.
  return new Promise(resolve =>  element.addEventListener(targetevent, () => resolve()));
}

const RoomPage = () => {
  const socketRef = useRef(null);
  const playerRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const [clients, setClients] = useState([]);
  const [videoSrc, setVideoSrc] = useState("/videos/placeholder.webm");
  const reactNavigator = useNavigate();

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later.");
        reactNavigator("/");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      //Listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room.`);
          }
          setClients(clients);
        }
      );

      //Listening for disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });

      const video = playerRef.current;
      
      if(!video) {
        console.log("WTF? Where the video at?");
        return;
      };

      // Socket listeners for playback events
      // Local handlers
      const onLocalPlay = () => {
        socketRef.current.emit(ACTIONS.PLAY, {
          currentTime: video.currentTime,
          username: location.state?.username,
        });
      };
      const onLocalPause = () => {
        socketRef.current.emit(ACTIONS.PAUSE, {
          currentTime: video.currentTime,
          username: location.state?.username,
        });
      };
      const onLocalSeek = () => {
        socketRef.current.emit(ACTIONS.SEEK, {
          currentTime: video.currentTime,
          username: location.state?.username,
        });
      };

      // Attach local events
      video.addEventListener("play", onLocalPlay);
      video.addEventListener("pause", onLocalPause);
      video.addEventListener("seeked", onLocalSeek);

      // Remote handlers
      const removeLocalEvents = () => {
        video.removeEventListener("play", onLocalPlay);
        video.removeEventListener("pause", onLocalPause);
        video.removeEventListener("seeked", onLocalSeek);
      };
      const addLocalEvents = () => {
        video.addEventListener("play", onLocalPlay);
        video.addEventListener("pause", onLocalPause);
        video.addEventListener("seeked", onLocalSeek);
      };

      const awaitEvents = async () => {
        await wait(video, 'play');
        await wait(video, 'pause');
        await wait(video, 'seeked');
        addLocalEvents();
      };

      socketRef.current.on(ACTIONS.PLAY, async ({ currentTime, username }) => {
        if (username === location.state?.username) return;
        removeLocalEvents();
        video.currentTime = currentTime;
        video.play();
        toast.info(`${username} played the video.`);
        await awaitEvents();
      });

      socketRef.current.on(ACTIONS.PAUSE, async ({ currentTime, username }) => {
        if (username === location.state?.username) return;
        removeLocalEvents();
        video.currentTime = currentTime;
        video.pause();
        toast.info(`${username} paused the video.`);
        await awaitEvents();
      });

      socketRef.current.on(ACTIONS.SEEK, async ({ currentTime, username }) => {
        if (username === location.state?.username) return;
        removeLocalEvents();
        video.currentTime = currentTime;
        toast.info(`${username} seeked the video.`);
        await awaitEvents();
      });


    };


    init();
    return () => {
      if (socketRef.current) {
        // Check if socketRef.current is not null
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
        socketRef.current.off(ACTIONS.PLAY);
        socketRef.current.off(ACTIONS.PAUSE);
        socketRef.current.off(ACTIONS.SEEK);
      }
    };
  }, []);

  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID has been copied to your clipboard");
    } catch (err) {
      toast.error("Failed to copy Room ID to clipboard");
      console.error("Error:", err);
    }
  }

  function leaveRoom() {
    reactNavigator("/");
  }

  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setVideoSrc(fileURL);
    }
  }

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div
      className="flex flex-col h-screen min-h-screen "
      style={{
        backgroundImage: "url('../images/room-back.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="flex flex-1 overflow-hidden bg-grey bg-opacity-10 backdrop-blur-md">
        <div className="flex flex-col p-4 sm:max-w-60 text-white w-64 border-r border-white">
          <div className=" mt-20 flex-1">
            <div className="border-b border-gray-200 pb-2">
              <div className="text-2xl font-bold text-white">Connected</div>
            </div>

            <div className="flex flex-wrap gap-5">
              {clients.map((client) => (
                <Client key={client.socketId} username={client.username} />
              ))}
            </div>
          </div>
          <button
            className="cursor-pointer btn bg-amber-100 text-black py-2 px-4 rounded mt-4"
            onClick={copyRoomId}
          >
            Copy Room ID
          </button>
          <button
            className="cursor-pointer btn bg-red-500 text-white py-2 px-4 rounded mt-2"
            onClick={leaveRoom}
          >
            Leave Room
          </button>
          <button
            className="cursor-pointer btn bg-blue-500 text-white py-2 px-4 rounded mt-2"
            onClick={() => document.getElementById('fileInput').click()}
          >
            Browse
          </button>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={(e) => handleFileSelect(e)}
          />
        </div>

        {/* Video Player Section */}
        <div className="flex-1">
          <VideoPlayer videoSrc={videoSrc} ref={playerRef}/>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
