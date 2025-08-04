import TextareaAutosize from 'react-textarea-autosize';
import { useState } from 'react';
import { ArrowRight } from "lucide-react";


export default function ChatBox() {
  const [msg, setMsg] = useState('');
  return (
  <div className="bg-[#f41414] w-[1000px] rounded-2xl relative">
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

  <button
    className="absolute right-2 bottom-2 h-9 w-9 flex items-center justify-center
               bg-[#25D366] rounded-full hover:scale-105 transition"
  >
    <ArrowRight size={16} className="text-white" />
  </button>
</div>


  );
}
