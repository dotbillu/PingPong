import Bar from './Bars/inputbar.tsx';
import { useEffect, useState } from 'react';
import { wsAtom ,currentRoomAtom} from '../store';
import { useSetAtom,useAtomValue } from 'jotai'
import RoomDropdown from './Bars/rooms.tsx'
type Message={
        type:"message";
        name:string;
        text:string;
    };

export default () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const setWs = useSetAtom(wsAtom);
const room = useAtomValue(currentRoomAtom)
useEffect(() => {
  setMessages([]) // 🧹 clear messages when room changes
}, [room])
    useEffect(() => {
        const ws = new WebSocket(import.meta.env.VITE_WS_URL);
        setWs(ws);

        ws.onmessage = (e) => {
            try{
                const msg=JSON.parse(e.data);
                setMessages((m) => [...m, msg])
            }catch(err){
                console.error("bad request",err);
            }
        };
        return () => ws.close();

    }, []);

    return (
        <div className="w-full h-[90vh] flex flex-col justify-between bg-[#9b34b5] rounded-2xl ">
            <div className="absolute top-2 right-4 z-10">
  <RoomDropdown />
</div>
            
            <div className="pl-[20px] pt-[10px]">
                {messages.map((message,i) => (
                    <div key={i}>{message.type==="message"&&(
                        <b>{message.name}</b>
                    )}
                    
                    {message.text}
                    </div>
                ))}
            </div>

            <div className="px-[40px] pb-[10px]">
                <Bar />
            </div>
        </div>
    );
};
