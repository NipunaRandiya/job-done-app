import React from "react";

export default function ChatPopup({
  worker,
  chatMessages,
  chatInput,
  setChatInput,
  sendMessage,
  setChatVisible,
}) {
  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white shadow-xl rounded-xl border border-gray-300 flex flex-col z-50">

      <div className="p-3 bg-indigo-600 text-white font-semibold flex justify-between items-center rounded-t-xl">
        <span>Chat with {worker?.name}</span>
        <button onClick={() => setChatVisible(false)}>✖</button>
      </div>

      <div className="p-4 h-80 overflow-y-auto space-y-3 bg-gray-50">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-[75%] ${
              msg.sender === "me"
                ? "bg-indigo-600 text-white ml-auto"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      
      <div className="p-3 flex border-t">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Type message..."
          className="flex-grow border rounded-lg px-3 py-2 mr-2"
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
