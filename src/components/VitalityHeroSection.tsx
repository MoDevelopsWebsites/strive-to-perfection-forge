import { Button } from '@/components/ui/button';

const VitalityHeroSection = () => {
  return (
    <section className="relative bg-white pt-20">
      {/* Three panel layout */}
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
          <div className="relative z-10 text-center p-8">
            <h2 className="text-white text-4xl lg:text-5xl font-bold mb-6 drop-shadow-lg">
              NEW ALTERNATE 2025 COLLECTION
            </h2>
            <Button 
              className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-base font-normal border-2 border-transparent hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => window.location.href = '/shop'}
            >
              Discover
            </Button>
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
    </section>
  );
};

export default VitalityHeroSection;