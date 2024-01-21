import { useDispatch, useSelector } from "react-redux"
import { IoMdSend } from "react-icons/io";
import { CiSquareRemove } from "react-icons/ci";
import { chatActions } from "../redux/reducers/chatReducer";
import io from 'socket.io-client';
import { useEffect, useState } from "react";


export const Chat = () => {
  const dispatch = useDispatch();
  const isChatToFriend = useSelector(state => state.chatReducer.isChatToFriend);
  const userData=useSelector(state=> state.authReducer.userData);
  // console.log(userData);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = io('http://localhost:8080',{
    transports: ['websocket', 'polling']
  }); // Update with your server URL

  useEffect(() => {
    // Listen for private messages
    socket.on('privateMessage', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Clean up the socket connection on component unmount
      return () => {
        socket.disconnect();
      };
  }, [socket]);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      // const recipientSocketId = userData._id; // Replace with the recipient's socket ID
      // console.log(recipientSocketId);
      socket.emit('privateMessage', { message: inputMessage });
      setInputMessage('');
    }
  }



  return (
    <>
      <div className="chatBox">
        <div className="friendProfile">
          <div className>name</div>
          <button className="cut_btn" onClick={() => {
            dispatch(chatActions.chatFriend(isChatToFriend));
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
          <button className="btnSendMessage" onClick={handleSendMessage}><IoMdSend size="30px" /></button>
        </div>
      </div>
    </>
  )
}