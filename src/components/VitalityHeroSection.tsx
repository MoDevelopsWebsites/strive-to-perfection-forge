import { Button } from '@/components/ui/button';

const VitalityHeroSection = () => {
  return (
    <section className="relative bg-white pt-20">
      {/* Three panel layout with overlapping text */}
      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 h-[70vh] lg:h-[80vh]">
          
          {/* Left Panel - Person with jacket */}
          <div className="relative bg-gray-100 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src="/lovable-uploads/ab937607-6d1b-46b4-88b5-0eb8849ed32f.png" 
                alt="S2P Team Member" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Center Panel - Person with jersey */}
          <div className="relative bg-gray-50 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src="/lovable-uploads/1e954a14-b815-4254-94ed-9762e2ad8379.png" 
                alt="S2P Team Member" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Panel - Jersey with gradient background */}
          <div className="relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500"></div>
            <div className="relative z-10 flex items-center justify-center h-full">
              <img 
                src="/lovable-uploads/6c6abcc5-cdb4-419a-9113-483835517d96.png" 
                alt="S2P Jersey" 
                className="max-w-md h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
        
        {/* Overlapping text spanning first two panels */}
        <div className="absolute inset-0 z-20 flex items-end justify-start pl-8 pb-16 lg:pb-20">
          <div className="text-left max-w-2xl">
            <h2 className="text-white text-3xl lg:text-4xl font-bold mb-8 drop-shadow-2xl tracking-wide uppercase">
              NEW ALTERNATE 2025 COLLECTION
            </h2>
            <button 
              className="group relative bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white hover:text-black px-8 py-3 text-sm font-medium uppercase tracking-wider transition-all duration-500 ease-out transform hover:scale-105 hover:shadow-2xl"
              onClick={() => window.location.href = '/shop'}
            >
              <span className="relative z-10">Discover</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VitalityHeroSection;