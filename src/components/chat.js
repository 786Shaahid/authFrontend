import { useDispatch, useSelector } from "react-redux"
import { IoMdSend } from "react-icons/io";
import { CiSquareRemove } from "react-icons/ci";
import { chatActions } from "../redux/reducers/chatReducer";
export const Chat=()=>{
    const dispatch=useDispatch();
    const isChatToFriend=useSelector(state=>state.chatReducer.isChatToFriend)
    // console.log(isChatToFriend);
    // const friend=useSelector(state=>state.authReducer.friend);
    // console.log(friend);
    return(
        <>
         <div className="chatBox">
          <div className="friendProfile">
          <div className>name</div>   
          <button className="cut_btn" onClick={()=>{
              dispatch(chatActions.chatFriend(isChatToFriend));
          }}><CiSquareRemove fontSize={40} fontWeight={900}/>

</button>   
          </div>
          <div className="chatContainer">
           <div className="chatLeft messageContainer">left</div>
           <div className="chatLeft messageContainer">left</div>
           <div className="chatRight messageContainer">  right</div>
           <div className="chatRight messageContainer">  right</div>
           <div className="chatRight messageContainer">  right</div>
           <div className="chatRight messageContainer">  right</div>
           <div className="chatLeft messageContainer">left</div>
           <div className="chatRight messageContainer">  right</div>
           <div className="chatRight messageContainer">  right</div>
           <div className="chatLeft messageContainer">left hkfahsdkfhdjfhdsfhsfsdjkfshfksadfhskadhfjslhfsfhsaklfjfsdfhlksjfhlskdfhsafjsadfhdskjlfh</div>
           <div className="chatLeft messageContainer">left hkfahsdkfhdjfhdsfhsfsdjkfshfksadfhskadhfjslhfsfhsaklfjfsdfhlksjfhlskdfhsafjsadfhdskjlfh</div>
           <div className="chatRight messageContainer">  right</div>
          </div>
          <div className="messageBox">
            <input  className="messageInput"/>
            <button className="btnSendMessage"><IoMdSend  size="30px" /></button>
          </div>
         </div>
        </>
    )
}