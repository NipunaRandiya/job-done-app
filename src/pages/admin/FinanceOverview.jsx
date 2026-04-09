import { useEffect, useState } from "react";
import { 
  FiDollarSign, FiArrowUpRight, FiArrowDownLeft, FiDownload, 
  FiCheckCircle, FiPieChart, FiTrendingUp, FiCreditCard 
} from "react-icons/fi";

export default function FinanceIntelligence() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTransactions([
      { id: "TX-9901", worker: "Roshan Wickrama", amount: 4500, type: "Online", status: "Pending Payout", bank: "BOC", acc: "88722100", branch: "Colombo 03" },
      { id: "TX-9902", worker: "Alex Perera", amount: 1200, type: "Cash", status: "Collection Due", bank: "Commercial", acc: "10029938", branch: "Kandy" },
      { id: "TX-9903", worker: "Nuwan Pradeep", amount: 8900, type: "Online", status: "Pending Payout", bank: "Sampath", acc: "00192837", branch: "Galle" },
      { id: "TX-9904", worker: "Saman Kumara", amount: 550, type: "Cash", status: "Collection Due", bank: "HNB", acc: "77665544", branch: "Negombo" },
    ]);
  }, []);

  const exportToCSV = () => {
    const headers = ["Worker Name,Amount(LKR),Bank Name,Account Number,Branch,Reference ID"];
    
    const rows = transactions
      .filter(t => t.type === "Online")
      .map(t => `${t.worker},${t.amount},${t.bank},${t.acc},${t.branch},${t.id}`);

    const csvContent = headers.concat(rows).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Worker_Payouts_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-10 bg-[#F8FAFC] min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Treasury</h1>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            Financial Settlement Engine
          </p>
        </div>
        
        <button 
          onClick={exportToCSV}
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl flex items-center gap-3 shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all active:scale-95 group"
        >
          <FiDownload size={18} className="group-hover:translate-y-0.5 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Export Bank CSV</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 rounded-2xl bg-blue-50 text-blue-600 text-xl"><FiCreditCard /></div>
            <span className="text-[10px] font-black px-3 py-1 bg-blue-50 text-blue-600 rounded-full">To Transfer</span>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Online Payouts Due</p>
          <h3 className="text-4xl font-black text-slate-900 tracking-tighter">LKR 13,400</h3>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 rounded-2xl bg-amber-50 text-amber-600 text-xl"><FiDollarSign /></div>
            <span className="text-[10px] font-black px-3 py-1 bg-amber-50 text-amber-600 rounded-full">Uncollected</span>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Cash Commissions</p>
          <h3 className="text-4xl font-black text-slate-900 tracking-tighter">LKR 1,750</h3>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50">
          <div className="flex justify-between items-start mb-6">
            <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600 text-xl"><FiPieChart /></div>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Platform Revenue</p>
          <h3 className="text-4xl font-black text-slate-900 tracking-tighter">LKR 4,200</h3>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-200/60 border border-slate-50">
        <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-10">Settlement Ledger</h4>

        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-4">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                <th className="px-6 pb-2 text-left">Worker Details</th>
                <th className="px-6 pb-2 text-left">Method</th>
                <th className="px-6 pb-2 text-left">Banking Info</th>
                <th className="px-6 pb-2 text-left">Amount</th>
                <th className="px-6 pb-2 text-right">Clearance</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="group">
                  <td className="bg-slate-50 group-hover:bg-blue-50/50 rounded-l-[1.5rem] px-6 py-6 transition-colors">
                    <p className="text-sm font-black text-slate-900">{tx.worker}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">{tx.id}</p>
                  </td>
                  <td className="bg-slate-50 group-hover:bg-blue-50/50 px-6 py-6 transition-colors">
                    <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest ${
                      tx.type === 'Online' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="bg-slate-50 group-hover:bg-blue-50/50 px-6 py-6 transition-colors">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                      <p className="text-slate-900">{tx.bank} — {tx.branch}</p>
                      <p>Acc: {tx.acc}</p>
                    </div>
                  </td>
                  <td className="bg-slate-50 group-hover:bg-blue-50/50 px-6 py-6 transition-colors">
                    <p className="text-sm font-black text-slate-900">LKR {tx.amount.toLocaleString()}</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{tx.status}</p>
                  </td>
                  <td className="bg-slate-50 group-hover:bg-blue-50/50 rounded-r-[1.5rem] px-6 py-6 text-right transition-colors">
                    <button className="p-3 bg-white text-slate-900 rounded-xl shadow-sm border border-slate-100 hover:bg-emerald-500 hover:text-white transition-all active:scale-90">
                      <FiCheckCircle size={18} strokeWidth={2.5} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}