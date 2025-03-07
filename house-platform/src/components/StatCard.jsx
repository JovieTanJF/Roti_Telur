import React from 'react';

const StatCard = ({ title, value, subtitle, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow p-5 flex items-start">
      {icon && (
        <div className="mr-4 rounded-full p-3 bg-blue-50 text-blue-600">
          {icon}
        </div>
      )}
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
};

export default StatCard;