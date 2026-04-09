import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../socket";
import { FiX, FiImage, FiSend, FiLoader } from "react-icons/fi";
import { getChatHistory } from "../../services/customerApi"; 

const ChatPopup = ({ isOpen, onClose, chatPartnerName, chatId, workOrderId, currentUserRole }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const socketRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !chatId) return;

    setMessages([]); 
    setPage(1);
    setHasMore(true);

    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect_error", (err) => {
      console.error("Socket Connection Error:", err.message);
    });

    socket.emit("join_chat", chatId);
    
    fetchMessages(1, true);

    socket.on("receive_message", (newMsg) => {
      if (newMsg.chatId === chatId) {
        setMessages((prev) => [...prev, newMsg]);
        setTimeout(scrollToBottom, 50);
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, [isOpen, chatId]);

  const fetchMessages = async (pageNum, isInitial = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await getChatHistory(chatId, pageNum, 10);
      const newMessages = response.data; 

      if (newMessages.length < 10) setHasMore(false);

      setMessages((prev) => (isInitial ? newMessages : [...newMessages, ...prev]));
      
      if (isInitial) setTimeout(scrollToBottom, 50);
    } catch (err) {
      console.error("Chat Load Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {

    if (!input.trim()) {
      console.warn("BLOCKED: Input is empty");
      return;
    }

    const messageData = {
      chatId: chatId,
      workOrderId: workOrderId,
      message: input,
      senderRole: currentUserRole,
      timestamp: new Date()
    };

    socket.emit("send_message", messageData);
    console.log("SENT TO SOCKET:", messageData);
    
    setInput("");
  };

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[600px] animate-in fade-in zoom-in duration-300">
        
        <div className="flex items-center justify-between p-6 border-b border-slate-50">
          <div>
            <h3 className="font-black text-slate-900 uppercase tracking-tight text-sm">Direct Message</h3>
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{chatPartnerName}</p>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-slate-900 transition-colors p-2 bg-slate-50 rounded-full">
            <FiX size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white custom-scrollbar" ref={chatContainerRef}>
          {hasMore && (
            <button 
              onClick={() => { setPage(p => p + 1); fetchMessages(page + 1); }}
              className="w-full text-[9px] font-black text-slate-400 hover:text-blue-500 transition-colors uppercase tracking-widest flex justify-center items-center gap-2"
            >
              {loading ? <FiLoader className="animate-spin" /> : "Load Earlier Messages"}
            </button>
          )}

          {messages.map((msg, idx) => {
            const isMe = msg.senderRole === currentUserRole;
            return (
              <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <div className={`px-5 py-3 rounded-[1.5rem] max-w-[85%] text-xs font-medium shadow-sm ${
                  isMe 
                  ? 'bg-blue-600 text-white rounded-tr-sm shadow-blue-100' 
                  : 'bg-slate-100 text-slate-700 rounded-tl-sm'
                }`}>
                  {msg.message}
                </div>
                <span className="text-[9px] font-black text-slate-300 mt-2 uppercase tracking-tighter">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            );
          })}
          <div ref={scrollRef} />
        </div>

        <div className="p-6 border-t border-slate-50 bg-white">
          <div className="flex items-center gap-3">
            <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-blue-600 transition-colors">
              <FiImage size={20} />
            </button>
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              type="text" 
              placeholder="TYPE A MESSAGE..." 
              className="flex-1 bg-slate-50 border-none text-slate-900 text-[10px] font-black tracking-widest rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button 
              onClick={handleSend}
              className="p-4 bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-slate-200"
            >
              <FiSend size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;