import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShoppingCart, Users, DollarSign, TrendingUp } from 'lucide-react';

const data = [
  { name: 'Sat', sales: 4000 },
  { name: 'Sun', sales: 3000 },
  { name: 'Mon', sales: 5000 },
  { name: 'Tue', sales: 2780 },
  { name: 'Wed', sales: 1890 },
  { name: 'Thu', sales: 2390 },
  { name: 'Fri', sales: 3490 },
];

const Statistics = () => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* ১. স্ট্যাটাস কার্ড সেকশন */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-[#079d49]">
            <ShoppingCart size={28} />
          </div>
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Sold</p>
            <h4 className="text-2xl font-black text-slate-800">1,420</h4>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
            <Users size={28} />
          </div>
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Active Users</p>
            <h4 className="text-2xl font-black text-slate-800">850</h4>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500">
            <DollarSign size={28} />
          </div>
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Revenue</p>
            <h4 className="text-2xl font-black text-slate-800">$12,450</h4>
          </div>
        </div>
      </div>

      {/* ২. মেইন চার্ট সেকশন */}
      <div className="bg-white p-4 sm:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
            <div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Sales Overview</h3>
                <p className="text-sm text-gray-400 font-medium">Monthly ticket sales performance</p>
            </div>
            <div className="flex items-center gap-2 text-[#079d49] bg-green-50 px-3 py-1 rounded-full text-xs font-bold">
                <TrendingUp size={16} />
                <span>+12.5%</span>
            </div>
        </div>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#079d49" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#079d49" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94a3b8', fontSize: 12}} 
                dy={10} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94a3b8', fontSize: 12}} 
              />
              <Tooltip 
                contentStyle={{ 
                    borderRadius: '20px', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)' 
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#079d49" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorSales)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Statistics;