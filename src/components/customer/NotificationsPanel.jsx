import React, { useState } from "react";
import { FiBell, FiCreditCard, FiStar, FiX, FiChevronRight, FiCheckCircle } from "react-icons/fi";
import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession, submitReview} from "../../services/customerApi";
import { useToast } from "../../context/ToastContext"; 

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Dialog = ({ open, onOpenChange, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-300">
        <div className="flex items-center justify-between p-8 border-b border-slate-50">
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{title}</h3>
          <button 
            onClick={() => onOpenChange(false)} 
            className="p-2 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-full transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
};

const NotificationsPanel = ({ notifications, onActionComplete }) => {
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);

  const showToast = useToast();

  const handlePayment = async () => {
    setLoading(true);
    try {
      const stripe = await stripePromise;
      
      localStorage.setItem("pending_payment_jobId", selectedNotification.jobId);

      const response = await createCheckoutSession(selectedNotification.jobId);

      const { url } = response.data;

      if (!url) {
        throw new Error("No checkout URL received from server.");
      }

      window.location.assign(url);
    } catch (err) {
      console.error("Payment Init Error:", err);
      showToast("Failed to start checkout. Please try again", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = (n) => {
    setSelectedNotification(n);
    if (n.type === "payment") {
      setShowPaymentModal(true);
    } else if (n.type === "review") {
      setShowReviewModal(true);
    }
  };

  const handleReviewSubmit = async () => {
    if (reviewRating === 0) return;
    
    setLoading(true);
    try {
      const reviewData = {
        rating: reviewRating,
        feedback: reviewText,
      };

      await submitReview(selectedNotification.jobId, reviewData);
      showToast("Thank you! Your review has been submitted.", "success");
      setShowReviewModal(false);
      
      if (onActionComplete) onActionComplete();
      
      setReviewRating(0);
      setReviewText("");
    } catch (err) {
      console.error("Review Submission Error:", err);
      showToast("Failed to submit review. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating, interactive = false) => (
    <div className="flex gap-2 justify-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <FiStar
          key={star}
          strokeWidth={interactive ? 2.5 : 2}
          className={`h-8 w-8 transition-all duration-300 ${
            star <= rating ? "fill-amber-400 text-amber-400 scale-110" : "text-slate-200"
          } ${interactive ? "cursor-pointer hover:scale-125" : ""}`}
          onClick={() => interactive && setReviewRating(star)}
        />
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-100 border border-slate-50 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <FiBell size={20} strokeWidth={2.5} />
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Activity</h3>
        </div>
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50 px-3 py-1 rounded-full">
          {notifications.length} Alerts
        </span>
      </div>

      <div className="space-y-4 overflow-y-auto pr-1 custom-scrollbar">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Everything is up to date</p>
          </div>
        ) : (
          notifications.map((n, i) => (
            <div
              key={i}
              onClick={() => handleNotificationClick(n)}
              className="group bg-slate-50 p-5 rounded-[2rem] flex gap-4 cursor-pointer hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all border border-transparent hover:border-slate-50"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                n.type === "payment" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
              }`}>
                {n.type === "payment" ? <FiCreditCard size={20} /> : <FiStar size={20} />}
              </div>
              <div className="flex-1 overflow-hidden">
                <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900 mb-1">{n.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed truncate">{n.message}</p>
                <span className="text-[9px] font-black text-slate-300 uppercase mt-2 block tracking-tighter">{n.time}</span>
              </div>
              <div className="flex items-center text-slate-200 group-hover:text-blue-500 transition-colors">
                <FiChevronRight size={20} strokeWidth={3} />
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal} title="Settle Invoice">
        <div className="space-y-8">
          <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reference ID</span>
              <span className="text-xs font-black text-slate-900 uppercase">#{selectedNotification?.jobId?.slice(-6) || "PAY-882"}</span>
            </div>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Total Outstanding</p>
            <p className="text-4xl font-black text-slate-900 tracking-tighter">
              LKR {selectedNotification?.amount?.toLocaleString() || "0"}
            </p>
          </div>

          <button 
            onClick={handlePayment}
            disabled={loading}
            className="w-full py-5 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all flex items-center justify-center gap-3"
          >
            {loading ? "Redirecting to Stripe..." : <><FiCreditCard size={18} /> Secure Checkout</>}
          </button>
        </div>
      </Dialog>

      <Dialog open={showReviewModal} onOpenChange={setShowReviewModal} title="Submit Review">
        <div className="space-y-8">
          <div className="text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Service Quality Rating</p>
            {renderStars(reviewRating, true)}
          </div>

          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Detailed Feedback</label>
            <textarea
              placeholder="SHARE YOUR EXPERIENCE..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              maxLength={250}
              className="w-full min-h-[120px] bg-slate-50 border-none rounded-2xl p-5 text-xs font-bold text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
            />
            <div className="text-right text-[9px] font-black text-slate-300 mt-2">{reviewText.length}/250</div>
          </div>

          <button 
            onClick={handleReviewSubmit} 
            disabled={reviewRating === 0 || loading} 
            className="w-full py-5 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 disabled:bg-slate-100 disabled:text-slate-300 transition-all shadow-xl shadow-slate-200"
          >
            {loading ? "Submitting..." : "Finalize Review"} 
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default NotificationsPanel;