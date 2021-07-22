import React from "react";
import './App.css';


import { useState, useEffect } from "react";
import io from "socket.io-client";


// no dotenv
const socket = io.connect("http://localhost:5000");


function App() {
  const [message, setMessage] = useState("");
  const [userName,setUserName] =useState("");
  const [chat, setChat] = useState([]);
  
  
  

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userName,received:true });
    setChat([...chat,{message,userName,received:false}])
    setMessage("");
    
  };

  

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  },[chat]);

  return (
    <div className="App">
      <div className="messageDiv">
        
          {chat.map((payload, index) => {
            if(payload.received === true){
              return <p className="received" key={index}>{payload.userName}: {payload.message}</p>

            
            }else {
              return <p className="sent" key={index}>{payload.userName}: {payload.message}</p>
            }
          
            })}
        
        
        
        
        </div>
      
        
        
        <form onSubmit={sendChat}>
        <input
            type="text"
            placeholder="username"
            value={userName}
            onChange={(e)=>{
              setUserName(e.target.value)
            }}
           />
          <input
            type="text"
            name="chat"
            placeholder="send text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button type="submit">Send</button>
        </form>
      
    </div>
  );
}

export default App;