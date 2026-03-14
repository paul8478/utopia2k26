import React from "react";

// --- MOCK DATA (Replace with your actual 120 members) ---
const generateMembers = (count: number, rolePrefix: string, startImgId: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    name: `Member ${i + 1}`,
    role: `${rolePrefix} ${i + 1}`,
    image: `https://i.pravatar.cc/400?img=${(startImgId + i) % 70}`, 
  }));
};

const TEAM_CATEGORIES = [
  {
    title: "Professor in Charge",
    members: [
      { name: "Dr. Alan Turing", role: "Head of Faculty", image: "https://i.pravatar.cc/400?img=11" },
      { name: "Dr. Ada Lovelace", role: "Co-Coordinator", image: "https://i.pravatar.cc/400?img=5" }
    ]
  },
  {
    title: "Core Organizers",
    members: generateMembers(8, "Core Lead", 20)
  },
  {
    title: "Website Team",
    members: generateMembers(12, "Developer", 30)
  },
  {
    title: "Media Team",
    members: generateMembers(18, "Content Creator", 45)
  },
  {
    title: "Event Management",
    members: generateMembers(80, "Coordinator", 60)
  }
];

export default function Teams() {
  return (
    // Removed the solid bg-[#fafafa] and added relative positioning
    <div className="relative min-h-screen text-[#0a0a0a] pt-32 pb-20 font-sans selection:bg-[#ff6b35] selection:text-white">
      
      {/* --- BACKGROUND IMAGE & OVERLAY --- */}
      {/* bg-fixed creates a nice parallax effect as you scroll down the list of 120 people */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('/tmbg2.jpg')` }}
      />
      {/* Light frosted overlay: Keeps the light theme intact and text readable */}
      <div className="absolute inset-0 z-0 bg-white/55 backdrop-blur-[2px]" />


      {/* --- MAIN CONTENT (z-10 ensures it stays above the background) --- */}
      <div className="relative z-10">
        
        {/* PAGE HEADER */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 text-center md:text-left">
          <p className="text-[#ff6b35] text-xs font-bold uppercase tracking-[0.4em] mb-4">
            Behind The Scenes
          </p>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tighter uppercase">
            The Architects <br></br>of UTOPIA 2K26
          </h1>
        </div>

        {/* TEAM CATEGORIES */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          {TEAM_CATEGORIES.map((category, categoryIndex) => (
            <section key={categoryIndex} className="w-full">
              
              {/* Category Heading */}
              <div className="border-b border-black/10 pb-4 mb-8">
                <h2 className="text-2xl md:text-5xl font-bold tracking-tight text-[#0a0a0a]">
                  {category.title}
                  <span className="ml-3 text-sm font-normal text-[#ff6b35] bg-[#ff6b35]/10 px-3 py-1 rounded-full">
                    {category.members.length}
                  </span>
                </h2>
              </div>

              {/* RESPONSIVE GRID */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-4">
                
                {category.members.map((member, memberIndex) => (
                  <div 
                    key={memberIndex}
                    className="team-card group relative aspect-[3/4] bg-white ring-1 ring-black/5 rounded-lg cursor-pointer transition-all duration-300 hover:z-50 will-change-transform"
                  >
                    
                    {/* 1. THE IMAGE LAYER */}
                    <div className="absolute inset-0 w-full h-full rounded-lg overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] origin-bottom group-hover:scale-[1.4] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-all duration-500 group-hover:saturate-[1.25] group-hover:contrast-[1.1]"
                        loading="lazy" 
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/70 to-transparent opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0" />
                    </div>

                    {/* 2. THE TEXT DETAILS LAYER */}
                    <div className="absolute bottom-0 left-0 w-full p-4 md:p-5 opacity-0 translate-y-4 transition-all duration-500 ease-out pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 z-10">
                      <h3 className="text-sm md:text-base font-bold text-[#0a0a0a] leading-tight mb-1 line-clamp-2">
                        {member.name}
                      </h3>
                      <p className="text-[10px] md:text-xs text-[#ff6b35] font-semibold uppercase tracking-wider line-clamp-1">
                        {member.role}
                      </p>
                    </div>

                  </div>
                ))}
                
              </div>
            </section>
          ))}
        </div>

      </div>
    </div>
  );
}