import Chats from './components/ChatWindow.tsx';
function App() {
  return (
    <div className="w-full h-screen flex flex-col justify-between bg-[#000000]">
      <div className="w-full px-[40px] pt-[20px] pb-[5px]">
        < Chats />
      </div>
      

    </div>
  );
}
export default App;
