import React from 'react';
import { useNavigate } from 'react-router-dom';

function Bookings() {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Booking History</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">A complete record of all your travel reservations.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-900/40 border-b border-gray-100 dark:border-gray-700">
                <th className="px-8 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Route</th>
                <th className="px-8 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
              <BookingRow 
                origin="Lahore" 
                destination="Islamabad" 
                date="Oct 25, 2026" 
                status="Confirmed" 
              />
              {/* Additional rows would be mapped here in a real scenario */}
            </tbody>
          </table>
        </div>
        
        <div className="p-8 bg-gray-50/30 dark:bg-gray-900/20 text-center border-t border-gray-50 dark:border-gray-700">
           <p className="text-gray-400 text-sm italic font-medium">Showing latest booking records. Use filters to narrow down results.</p>
        </div>
      </div>
      
      <div className="mt-10 flex justify-center">
         <button 
           onClick={() => navigate('/my-bookings')}
           className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-8 py-3 rounded-2xl font-bold transition-all flex items-center gap-2"
         >
           View Managed Bookings <span>→</span>
         </button>
      </div>
    </div>
  );
}

const BookingRow = ({ origin, destination, date, status }) => (
  <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
    <td className="px-8 py-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xs italic">RT</div>
        <p className="text-gray-900 dark:text-white font-extrabold text-sm">{origin} <span className="text-gray-400 mx-1">→</span> {destination}</p>
      </div>
    </td>
    <td className="px-8 py-6">
      <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest">{date}</p>
    </td>
    <td className="px-8 py-6">
      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
        status === 'Confirmed' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
      }`}>
        {status}
      </span>
    </td>
    <td className="px-8 py-6 text-right">
      <button className="text-red-500 hover:text-red-700 text-xs font-black uppercase tracking-widest transition-colors">Cancel</button>
    </td>
  </tr>
);

export default Bookings;

