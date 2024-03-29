import { useDispatch, useSelector } from "react-redux";
import { IoMdSend } from "react-icons/io";
import { CiSquareRemove } from "react-icons/ci";
import { chatActions } from "../redux/reducers/chatReducer";
import { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";
import { useRef } from "react";
import BASE_URL from "../utility/environment";

export const Chat = ({ friendData }) => {
  // console.log(friendData);
  
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const isChatToFriend = useSelector(
(state) => state.chatReducer.isChatToFriend
  );
  const userData = JSON.parse(localStorage.getItem("userData"));
 
  const dispatch = useDispatch();
  const messageScroll = useRef(null);
  /** Create Room Id */
  const roomId = [friendData.id, userData._id]
    .sort()
    .toString()
    .substring(17, 30);
  
  
  // const socket = useMemo(() => io('localhost:4000'  , { transports: ['websocket', 'polling'] }), []);
  const socket = useMemo(
    () =>
      io( BASE_URL,{ transports: ["websocket",'polling'] }),
    []
  );

  useEffect(() => {
    if (messageScroll.current) {
      // console.log(messageScroll.current);
      messageScroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Update with your server URL
  useEffect(() => {
    // Listen for private messages
    socket.on("connect", () => {
      console.log("userId connected!");
    });
    socket.emit("joinRoom", roomId);  
    socket.on("chat", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      // console.log("data from server",data);
    });
    // Clean up the socket connection on component unmount
    return () => {
      socket.off("message");
    };
  }, [socket, roomId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== "") {
      socket.emit("sendMessage", {
        roomId: roomId,
        userId: userData._id,
        message: inputMessage,
      });
      setInputMessage("");
    }
  };

  return (
    <>
      <div className="chatBox">
        <div className="friendProfile">
          <div className="">{friendData.friendName}</div>
          <button
            className="cut_btn"
            onClick={() => {
              dispatch(chatActions.chatBox(isChatToFriend));
            }}
          >
            <CiSquareRemove fontSize={40} fontWeight={900} />
          </button>
        </div>
        <div className="chatContainer" >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`messageContainer ${
                msg.userId === userData._id ? "chatRight" : "chatLeft"
              }`}
              ref={messageScroll}
            >
              {msg.message}
            </div>
          ))}
        </div>
        <div className="messageBox">
          <input
            className="messageInput"
            onChange={(e) => {
              setInputMessage(e.target.value);
            }}
            value={inputMessage}
            placeholder="Write Your Message ....."
          />
          <button
            className="btnSendMessage"
            onClick={(e) => {
              handleSendMessage(e);
            }}
          >
            <IoMdSend size="30px" />
          </button>
        </div>
      </div>
    </>
  );
};
