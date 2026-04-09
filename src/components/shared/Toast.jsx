import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiAlertCircle, FiX, FiInfo } from "react-icons/fi";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <FiCheckCircle className="text-green-500" size={18} />,
    error: <FiAlertCircle className="text-red-500" size={18} />,
    info: <FiInfo className="text-blue-500" size={18} />,
  };

  const colors = {
    success: "border-green-100 bg-white",
    error: "border-red-100 bg-white",
    info: "border-blue-100 bg-white",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      className={`flex items-center gap-4 p-4 min-w-[300px] rounded-2xl border shadow-xl ${colors[type]} pointer-events-auto`}
    >
      <div className="shrink-0">{icons[type]}</div>
      <div className="flex-1">
        <p className="text-sm font-bold text-slate-800">{message}</p>
      </div>
      <button onClick={onClose} className="text-slate-300 hover:text-slate-500 transition-colors">
        <FiX size={16} />
      </button>
    </motion.div>
  );
};

export default Toast;