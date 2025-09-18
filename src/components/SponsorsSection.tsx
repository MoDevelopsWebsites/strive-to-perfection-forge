const SponsorsSection = () => {
  const sponsors = [
    { 
      name: "Colosseum Gaming", 
      logo: "/lovable-uploads/874518e7-8c84-4f76-9bfb-529ce4635d31.png",
      className: "h-12 object-contain"
    },
    { 
      name: "KinxeGaming", 
      logo: "/lovable-uploads/14b1cdc0-4b6b-45c6-a014-47b08199cd63.png",
      className: "h-10 object-contain"
    },
    { 
      name: "Radiant Studios", 
      logo: "/lovable-uploads/5a5e6737-f9a7-483c-a442-b7009a75240a.png",
      className: "h-12 object-contain"
    },
    { 
      name: "MANATEE.GG", 
      logo: "/lovable-uploads/866683c9-6ba6-488d-93ed-5b444e83f6e6.png",
      className: "h-8 object-contain"
    },
    { 
      name: "Partner 5", 
      logo: "/lovable-uploads/725196aa-7e0b-4eb2-a512-0a5581d9cb0e.png",
      className: "h-10 object-contain"
    },
    { 
      name: "Partner 6", 
      logo: "/lovable-uploads/6ffcd167-a35a-4525-a433-71d35bbcbf75.png",
      className: "h-12 object-contain"
    },
    { 
      name: "Partner 7", 
      logo: "/lovable-uploads/0443d5b0-7a21-4503-a12a-dd28026a206c.png",
      className: "h-10 object-contain"
    },
    { 
      name: "Partner 8", 
      logo: "/lovable-uploads/05edfebb-4fc0-4cff-bf02-2ae6f17b7a13.png",
      className: "h-12 object-contain"
    }
  ];

  return (
    <section className="bg-white py-16 border-t">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
          {sponsors.map((sponsor, index) => (
            <div key={index} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <img 
                src={sponsor.logo} 
                alt={sponsor.name}
                className={sponsor.className}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;