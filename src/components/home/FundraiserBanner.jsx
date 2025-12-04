// components/home/StartFundraiserBanner.jsx
import Image from "next/image";
import { useCMS } from "@/app/CMSContext";

export default function StartFundraiserBanner({ darkMode }) {
  const cms = useCMS();
  const cmsBeforeFooter = cms.filter(item => item.type === "before-footer");
  const BASE_URL = `${process.env.NEXT_PUBLIC_UPLOAD_URL}`
  return (
    <section className={`py-14 ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl h-64 md:h-96 ">
        
          <img
            src={`${BASE_URL}${cmsBeforeFooter[0]?.image}`}
            alt="Start Your Fundraiser"
            className="w-full h-full object-cover object-[50%_75%]"
            loading="lazy"
          />

            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>

          {/* <img
          src="https://images.unsplash.com/photo-1547069545-e88faa5cac9d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fFJlYWNoJTIwbWlsbGlvbnMlMjBvZiUyMGRvbm9ycyUyMHdvcmxkd2lkZS4lMjBUdXJuJTIweW91ciUyMGNhdXNlJTIwaW50byUyMGltcGFjdCUyMHRvZGF5LnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600"
          alt="Start Your Fundraiser"
          className="h-64 md:h-96 w-full object-cover object-[50%_75%]"
          /> */}
          <div className="absolute inset-0 p-6 md:p-10 flex items-center">
            <div className="max-w-xl text-white">
              <h3 className="text-2xl md:text-3xl font-semibold mb-3">
                {cmsBeforeFooter[0]?.title}
              </h3>
              <p className="text-sm md:text-base text-white/90 mb-5">
                {cmsBeforeFooter[0]?.description}
              </p>
              <button className="px-6 py-3 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-lg transition-colors">
                Create Fundraiser Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}