import TextareaAutosize from 'react-textarea-autosize';
import { useState } from 'react';
import { ArrowRight } from "lucide-react";
import { useAtom } from 'jotai';
import { wsAtom } from '../../store';

export default function ChatBox() {
  const [msg, setMsg] = useState('');
  const [ws]=useAtom(wsAtom);

  const sendMsg=()=>{
    if(!ws||ws.readyState!=WebSocket.OPEN||!msg.trim())return;
    const payload={
      type:"message",
      text: msg.trim()
    }
    ws.send(JSON.stringify(payload));
    setMsg(``);
  
  }

  return (
  <div className="bg-[#f41414]  rounded-2xl relative">
  <div className="pr-12"> 
    <TextareaAutosize
      minRows={2}
      maxRows={4}
      value={msg}
      onChange={e => setMsg(e.target.value)}
      placeholder="type message …"
      className="w-full resize-none overflow-auto p-[10px] outline-none focus:outline-none"
    />
  </div>

  <button onClick={sendMsg}
    className="absolute right-2 bottom-2 h-9 w-9 flex items-center justify-center
               bg-[#858b8d] rounded-full hover:scale-105 transition"
  >
    <ArrowRight size={16} className="text-white" />
  </button>
</div>


  );
}
