import React from 'react';
import { FiTrendingUp, FiTag, FiAward, FiArrowRight, FiCheck, FiZap } from 'react-icons/fi';

const Card = ({ title, description, children, icon: Icon, className = "" }) => (
  <div className={`bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50 mb-8 relative overflow-hidden group ${className}`}>
    <div className="flex items-center gap-4 mb-6">
      {Icon && (
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shadow-inner">
          <Icon />
        </div>
      )}
      <div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">{title}</h2>
        {description && <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{description}</p>}
      </div>
    </div>
    <div className="relative z-10">{children}</div>
    <div className="absolute -right-4 -bottom-4 text-slate-50 text-8xl font-black opacity-40 pointer-events-none group-hover:scale-110 transition-transform duration-500">
      {Icon && <Icon />}
    </div>
  </div>
);

const ProfileBoostItem = ({ name, description, price }) => (
  <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-slate-900 rounded-[2rem] text-white shadow-2xl shadow-blue-200 group hover:scale-[1.02] transition-all duration-300">
    <div className="mb-4 md:mb-0">
      <div className="flex items-center gap-2 mb-1">
        <FiZap className="text-blue-400 animate-pulse" />
        <h3 className="text-lg font-black tracking-tight uppercase">{name}</h3>
      </div>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{description}</p>
    </div>
    <div className="flex items-center gap-6">
      <div className="text-right">
        <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Investment</p>
        <span className="text-2xl font-black tracking-tighter">
          Rs. {price.toLocaleString('en-IN')}
        </span>
      </div>
      <button className="bg-blue-600 hover:bg-white hover:text-blue-600 px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20 active:scale-95">
        Boost Now
      </button>
    </div>
  </div>
);

const ActiveOfferItem = ({ name, validUntil }) => (
  <div className="flex items-center justify-between p-6 bg-[#F8FAFC] rounded-2xl border border-slate-100 group">
    <div className='flex items-center gap-4'>
      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-blue-600">
        <FiTag />
      </div>
      <div>
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">{name}</h3>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
          Expires {validUntil}
        </p>
      </div>
    </div>
    <span className="px-4 py-1.5 text-[10px] font-black text-emerald-600 bg-emerald-50 rounded-full uppercase tracking-widest border border-emerald-100">
      Live
    </span>
  </div>
);

const MarketingTip = ({ text, isCompleted }) => (
  <div className="flex items-start gap-4 p-4 rounded-2xl transition-colors hover:bg-slate-50">
    <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-300'}`}>
      <FiCheck size={14} strokeWidth={4} />
    </div>
    <span className={`text-sm font-bold leading-relaxed ${isCompleted ? 'text-slate-700' : 'text-slate-400'}`}>
      {text}
    </span>
  </div>
);

export default function PromotionPage() {
  const profileBoostData = {
    name: 'Elite Visibility',
    description: 'Priority placement in client search results',
    price: 2500,
  };

  const activeOffersData = [
    { name: '20% Off Kitchen Repairs', validUntil: '31 Oct 2025' },
  ];

  const marketingTips = [
    { text: 'Keep your profile updated with high-quality work photos', isCompleted: true },
    { text: 'Respond to messages within 1 hour for better rankings', isCompleted: true },
    { text: 'Maintain a 4.5+ star rating for the Elite Pro badge', isCompleted: false },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-12 font-sans selection:bg-blue-100">
      <div className="max-w-5xl mx-auto">
        
        <header className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">Growth Suite</p>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none uppercase">
            Expand Your <br />
            <span className="text-blue-600">Business Empire.</span>
          </h1>
          <p className="mt-4 text-slate-500 font-medium max-w-xl">
            Leverage our proprietary promotion tools to outpace the competition and dominate your local service market.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <Card
              title="Global Visibility"
              description="Algorithmic Search Advantage"
              icon={FiTrendingUp}
            >
              <div className="space-y-6">
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Active boosting grants you the <span className="text-slate-900 font-bold">"Priority Expert"</span> tag, moving your profile to the top 1% of search results for a duration of 7 days.
                </p>
                <ProfileBoostItem
                  name={profileBoostData.name}
                  description={profileBoostData.description}
                  price={profileBoostData.price}
                />
              </div>
            </Card>

            <Card
              title="Campaign Manager"
              description="Conversion Rate Optimization"
              icon={FiTag}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
                <p className="text-sm text-slate-500 font-medium">
                  Incentivize new clients with targeted discounts and time-sensitive service offers.
                </p>
                <button className="whitespace-nowrap flex items-center px-8 py-4 font-black text-white bg-slate-900 rounded-2xl shadow-xl hover:bg-blue-600 transition duration-300 uppercase text-[11px] tracking-widest gap-3 group">
                  New Campaign
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="space-y-3">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">
                  Active Campaigns
                </h3>
                {activeOffersData.map((offer, index) => (
                  <ActiveOfferItem
                    key={index}
                    name={offer.name}
                    validUntil={offer.validUntil}
                  />
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card 
              title="Market IQ" 
              description="Growth Strategy"
              icon={FiAward}
            >
              <div className="space-y-4">
                {marketingTips.map((tip, index) => (
                  <MarketingTip
                    key={index}
                    text={tip.text}
                    isCompleted={tip.isCompleted}
                  />
                ))}
              </div>
              
              <div className="mt-10 p-6 bg-blue-600 rounded-3xl text-white relative overflow-hidden group cursor-pointer">
                <h4 className="font-black text-sm uppercase tracking-tight mb-2">Need a strategy?</h4>
                <p className="text-[11px] font-bold text-blue-100 leading-relaxed mb-4">Book a 15-min consultation with our business growth team.</p>
                <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  Get Started <FiArrowRight />
                </span>
                <FiTrendingUp className="absolute -right-4 -bottom-4 text-7xl text-white/10 group-hover:scale-125 transition-transform duration-700" />
              </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}