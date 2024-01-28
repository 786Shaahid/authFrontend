import { useDispatch, useSelector } from "react-redux"
import { IoMdSend } from "react-icons/io";
import { CiSquareRemove } from "react-icons/ci";
import { chatActions } from "../redux/reducers/chatReducer";
import io from 'socket.io-client';
import { useEffect, useState } from "react";


export const Chat = ({ friendId }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([{
         
  }]);
  const isChatToFriend = useSelector(state => state.chatReducer.isChatToFriend);
  const userData = useSelector(state => state.authReducer.userData);
  const dispatch = useDispatch();

  /** Create Room Id */
  const roomId = [friendId, userData._id].sort().toString().substring(17, 30);
  // console.log("roomId",roomId);
  const socket = io('http://localhost:4000', {
    transports: ['websocket', 'polling']
  });

  // Update with your server URL
  useEffect(() => {
    // Listen for private messages
    socket.on('connect', () => {
      // console.log("userId connected!");
    });
    socket.emit('joinRoom', roomId); 
    socket.on("chat", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data);
    })
    // Clean up the socket connection on component unmount
    return () => {
      socket.off('message');
    
    };
  }, [socket,roomId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      socket.emit('sendMessage', { roomId: roomId, message: inputMessage });
      setInputMessage("");
    }
  }



  return (
    <>
      <div className="chatBox">
        <div className="friendProfile">
          <div className="">name</div>
          <button className="cut_btn" onClick={() => {
            dispatch(chatActions.chatBox(isChatToFriend));
          }}><CiSquareRemove fontSize={40} fontWeight={900} />

          </button>
        </div>
        <div className="chatContainer">
          {messages.map((msg, index) => (
            <div key={index} className={`messageContainer ${msg.senderSocketId === socket.id ? 'chatRight' : 'chatLeft'}`}>
              {msg.message}
            </div>
          ))}
        </div>
        <div className="messageBox">
          <input className="messageInput" onChange={(e) => {
            setInputMessage(e.target.value)
          }} value={inputMessage} placeholder="Write Your Message ....." />
          <button className="btnSendMessage" onClick={(e) => { handleSendMessage(e) }} ><IoMdSend size="30px" /></button>
        </div>
      </div>
    </>
  )
}