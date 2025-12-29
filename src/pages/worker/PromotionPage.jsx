import React, { useState } from 'react';

const CheckCircleIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="m9 11 3 3L22 4" />
  </svg>
);

const Card = ({ title, description, children, className = "" }) => (
  <div className={`bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 mb-8 ${className}`}>
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
    <div className="mt-5">{children}</div>
  </div>
);

const ProfileBoostItem = ({ name, description, price }) => (
  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg transition hover:bg-indigo-50">
    <div>
      <h3 className="text-base font-medium text-gray-700">{name}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <div className="flex items-center space-x-4">
      <span className="text-lg font-bold text-gray-900">
        Rs. {price.toLocaleString('en-IN')}
      </span>
      <button className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-full shadow-md hover:bg-indigo-700 transition duration-150">
        Buy
      </button>
    </div>
  </div>
);

const ActiveOfferItem = ({ name, validUntil }) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0">
    <div className='flex flex-col'>
      <h3 className="text-base font-medium text-gray-700">{name}</h3>
      <p className="text-xs text-gray-500 mt-1">
        Valid until {validUntil}
      </p>
    </div>
    <span className="px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded-full">
      Active
    </span>
  </div>
);

const MarketingTip = ({ text, isCompleted }) => (
  <div className="flex items-start py-2">
    <CheckCircleIcon
      className={`w-5 h-5 mt-0.5 mr-3 ${isCompleted ? 'text-green-500' : 'text-gray-300'}`}
    />
    <span className={`text-base ${isCompleted ? 'text-gray-700' : 'text-gray-500'}`}>
      {text}
    </span>
  </div>
);


export default function PromotionPage() {
  const profileBoostData = {
    name: '7-Day Profile Boost',
    description: 'Get up to 3x more visibility',
    price: 2500,
  };

  const activeOffersData = [
    { name: '20% Off Kitchen Repairs', validUntil: 'Oct 31, 2025' },
  ];

  const marketingTips = [
    { text: 'Keep your profile updated with recent work photos', isCompleted: true },
    { text: 'Respond to messages within 1 hour for better rankings', isCompleted: true },
    { text: 'Maintain a 4.5+ star rating for premium badge', isCompleted: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Grow Your Business</h1>
          <p className="mt-1 text-base text-gray-500">
            Tools to promote your services and attract more customers
          </p>
        </header>

        <Card
          title="Profile Boost"
          description="Increase your visibility in search results"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Boost your profile to appear at the top of search results for 7 days
            </p>
            <ProfileBoostItem
              name={profileBoostData.name}
              description={profileBoostData.description}
              price={profileBoostData.price}
            />
          </div>
        </Card>

        <Card
          title="Special Offers"
          description="Create promotional offers for your services"
        >
          <p className="text-sm text-gray-500 mb-6">
            Attract new customers with limited-time discounts
          </p>

          <button className="flex items-center px-6 py-3 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition duration-150">
            Create New Offer
          </button>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Active Offers
            </h3>
            <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
              {activeOffersData.length > 0 ? (
                activeOffersData.map((offer, index) => (
                  <ActiveOfferItem
                    key={index}
                    name={offer.name}
                    validUntil={offer.validUntil}
                  />
                ))
              ) : (
                <p className="p-4 text-sm text-gray-500">No active offers currently.</p>
              )}
            </div>
          </div>
        </Card>

        <Card title="Marketing Tips">
          <div className="space-y-2">
            {marketingTips.map((tip, index) => (
              <MarketingTip
                key={index}
                text={tip.text}
                isCompleted={tip.isCompleted}
              />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};