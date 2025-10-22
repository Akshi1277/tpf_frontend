// components/home/CommunitiesSection.jsx
import { communities } from '@/lib/constants';

export default function CommunitiesSection({ darkMode }) {
  const COLORS = {
    neutralHeading: darkMode ? "text-white" : "text-zinc-900",
    neutralBody: darkMode ? "text-zinc-400" : "text-zinc-600",
  };

  return (
      <section id="communities" className={`py-12 border-b border-gray-300 ${darkMode ? 'bg-zinc-800' : 'bg-zinc-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
         <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${COLORS.neutralHeading}`}>
        Communities
      </h2>
            <p className={`text-sm ${COLORS.neutralBody}`}>
             Communities you would like to join
            </p>
          </div>
          
          <div className="grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5 flex items-center justify-center">
            {communities.map((partner, index) => (
            <div 
  key={index}
  className={`group relative flex flex-col items-center justify-center p-6 rounded-xl overflow-hidden transition-all duration-300 ${
    darkMode ? 'bg-zinc-900' : 'bg-white'
  } border ${darkMode ? 'border-zinc-700 hover:border-emerald-600' : 'border-zinc-200 hover:border-emerald-600'} shadow-[0_2px_6px_rgba(110,231,183,0.25)] hover:shadow-[0_4px_12px_rgba(16,185,129,0.4)]`}
>
 
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
               <div className="relative w-20 h-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden">
  <img 
    src={partner.image}
    alt={partner.name}
    className="w-full h-full object-cover"
    loading='lazy'
  />
</div>
                <span className={`relative mt-3 text-xs font-medium ${COLORS.neutralBody} text-center group-hover:text-emerald-600 transition-colors duration-300`}>{partner.name}</span>
                <button className='cursor-pointer text-sm mt-2 flex items-center justify-center gap-2 px-2 py-1 bg-emerald-600 text-white rounded-2xl group-hover:bg-red-500'>
                  Join Now
                </button>
              </div>
              
            ))}
            
          </div>
        </div>
      </section>
  );
}