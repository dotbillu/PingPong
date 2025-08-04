import Bar from './chatbox/inputbar.tsx';

export default () => {
    return (
        <div className="w-full h-[90vh] flex flex-col justify-between bg-[#9b34b5] rounded-2xl ">
            <div>hi</div>

            <div className="px-[40px] pb-[10px]">
                <Bar />
            </div>
        </div>
    );
};
