import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, MapPin, Calendar, Briefcase, ChevronRight, User, Award, Zap, Code } from 'lucide-react';

/**
 * COMPONENTES DE LOGOS SVG (Tech Stack)
 * Dibujados vectorialmente para no depender de imágenes externas
 */
const TechLogo = ({ name, className }: { name: string, className?: string }) => {
  const n = name.toLowerCase();

  // .NET / C#
  if (n.includes('.net') || n.includes('c#')) return (
    <svg viewBox="0 0 128 128" className={className}>
      <circle cx="64" cy="64" r="64" fill="#512BD4"/>
      <path d="M98 52h-8v-8h-7v8h-8v7h8v8h7v-8h8v-7zm-55 5h-7l-15 25h8l3-6h13l3 6h8l-13-25zM45 71l3-7 4 7h-7zm27-14h7v25h-7V57zm-11 0h7v25h-7V57z" fill="white"/>
    </svg>
  );

  // React
  if (n.includes('react')) return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className}>
      <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
      <g stroke="#61dafb" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
  );

  // Vue
  if (n.includes('vue')) return (
    <svg viewBox="0 0 261.76 226.69" className={className}>
      <path d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.692L261.755.001z" fill="#42b883"/>
      <path d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.411.001z" fill="#35495e"/>
    </svg>
  );

  // SQL / Database
  if (n.includes('sql') || n.includes('data') || n.includes('postgre') || n.includes('redis')) return (
    <svg viewBox="0 0 64 64" className={className}>
      <path d="M32 2C15.43 2 2 6.48 2 12c0 5.52 13.43 10 30 10s30-4.48 30-10c0-5.52-13.43-10-30-10zm0 14c-11.85 0-22.3-2.6-26.6-6.65C9.4 13.06 19.85 15 32 15s22.6-1.94 26.6-5.65C54.3 13.4 43.85 16 32 16z" fill="#336791"/>
      <path d="M62 12v12c0 5.52-13.43 10-30 10S2 29.52 2 24V12c0 5.52 13.43 10 30 10s30-4.48 30-10z" fill="#336791" opacity="0.8"/>
      <path d="M62 26v12c0 5.52-13.43 10-30 10S2 43.52 2 38V26c0 5.52 13.43 10 30 10s30-4.48 30-10z" fill="#336791" opacity="0.6"/>
      <path d="M62 40v12c0 5.52-13.43 10-30 10S2 57.52 2 52V40c0 5.52 13.43 10 30 10s30-4.48 30-10z" fill="#336791" opacity="0.4"/>
    </svg>
  );

  // Python
  if (n.includes('python')) return (
    <svg viewBox="0 0 110 110" className={className}>
      <path d="M55.5 12c-15 0-14.5 6.5-14.5 6.5l.03 6.7h14.7v2.1h-20c-20 0-20 9-20 20.6v5.8h11.2c0-14 8-16 16.5-16h8.7v-13c0-12-10-12.7-16.6-12.7zm-6.7 4.3a3.5 3.5 0 110 7 3.5 3.5 0 010-7zM54.5 98c15 0 14.5-6.5 14.5-6.5l-.03-6.7H54.3v-2.1h20c20 0 20-9 20-20.6v-5.8H83.1c0 14-8 16-16.5 16h-8.7v13c0 12 10 12.7 16.6 12.7zM61.2 93.7a3.5 3.5 0 110-7 3.5 3.5 0 010 7z" fill="#FFE873"/>
      <path d="M55.5 12c-15 0-14.5 6.5-14.5 6.5l.03 6.7h14.7v2.1h-20c-20 0-20 9-20 20.6v5.8h11.2c0-14 8-16 16.5-16h8.7v-13c0-12-10-12.7-16.6-12.7zm-6.7 4.3a3.5 3.5 0 110 7 3.5 3.5 0 010-7z" fill="#4B8BBE"/>
    </svg>
  );

  // Node
  if (n.includes('node') || n.includes('js')) return (
    <svg viewBox="0 0 128 128" className={className}>
      <path d="M64 12l-52 30v60l52 30 52-30V42z" fill="#333"/>
      <path d="M64 24l-42 24v48l42 24 42-24V48z" fill="#68A063"/>
      <text x="64" y="80" fontSize="40" textAnchor="middle" fill="white" fontWeight="bold">JS</text>
    </svg>
  );
  
  // Azure / Cloud
  if (n.includes('azure') || n.includes('cloud') || n.includes('aws')) return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#0078D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
    </svg>
  );

  // Default Code Icon
  return <Code size={24} className={`${className} text-slate-400`} />;
};

const CareerTechTree = () => {
  // Datos reales del usuario
  const rawData = [
    {
      "id": "exp-1",
      "company": "Hexaware",
      "brandColor": "#532a84", // Hexaware purple
      "initials": "HX",
      "position": "Senior Full-Stack Engineer",
      "startDate": "2025-04-01",
      "duration": "Apr 2025 – Present",
      "type": "Full-time",
      "description": "Driving modernization efforts for enterprise-scale applications, focusing on migrating legacy systems to cloud-native microservices architectures.",
      "achievements": [
        "Reduced API latency by 40% through query optimization and Redis caching",
        "Implemented TDD practices, increasing code coverage to 85%",
        "Mentored 3 junior developers to mid-level proficiency"
      ],
      "technologies": ["C#", ".NET Core", "ASP.NET", "React", "Vue", "SQL", "Redis", "Microservices"]
    },
    {
      "id": "exp-2",
      "company": "ITPS",
      "brandColor": "#0078d4", // ITPS Blueish
      "initials": "IT",
      "position": "Full-Stack Dev (Contpaqi)",
      "startDate": "2025-01-01",
      "duration": "Jan 2025 – Aug 2025",
      "type": "Freelance",
      "description": "RBAC and Banorte Webhook project using clean architecture with .NET 8, Azure Functions, and CQRS.",
      "achievements": [
        "Design and implementation of RBAC authorization services",
        "Development of Banorte webhook with OAuth2 in Azure Functions",
        "Use of Command, Factory, Template Method patterns"
      ],
      "technologies": [".NET 8", "Azure Functions", "CQRS", "PostgreSQL", "OAuth2"]
    },
    {
      "id": "exp-3",
      "company": "Pemex",
      "brandColor": "#006847", // Pemex Green
      "initials": "PX",
      "position": "Full-Stack Developer",
      "startDate": "2024-07-01",
      "duration": "Jul 2024 – Jan 2025",
      "type": "Freelance",
      "description": "Development of the Transactional Human Capital Portal (PTCH) using Vue.js SPA and .NET Core backend.",
      "achievements": [
        "Development of personal document update module",
        "Implementation of online vacation request flow",
        "Integration with .NET backend and Vue component optimization"
      ],
      "technologies": ["Vue.js", ".NET Core", "SQL Server", "SPA"]
    },
    {
      "id": "exp-4",
      "company": "Apex Systems",
      "brandColor": "#E35205", // Apex Orange
      "initials": "AP",
      "position": "Full-Stack Programmer",
      "startDate": "2024-01-01",
      "duration": "Jan 2024 – Apr 2025",
      "type": "Full-time",
      "description": "Refactor of Node services to reduce technical debt. Automation with n8n and participation in code reviews.",
      "achievements": [
        "Refactor of Node services to reduce technical debt",
        "Automation with n8n (notifications, data synchronization)",
        "Participation in code reviews"
      ],
      "technologies": ["React", "Vue", "Node.js", ".NET Core", "PostgreSQL", "n8n"]
    },
    {
      "id": "exp-5",
      "company": "DaCodes",
      "brandColor": "#111827", // DaCodes Dark
      "initials": "DC",
      "position": "Software Developer",
      "startDate": "2022-01-01",
      "duration": "2022 – 2024",
      "type": "Full-time",
      "description": "Development of responsive web applications and REST APIs using Vue/React, Node.js/.NET, Tailwind, and PostgreSQL.",
      "achievements": [
        "Development of responsive web applications and REST APIs",
        "Integrations with third parties (external APIs)",
        "Mentoring of junior profiles"
      ],
      "technologies": ["Vue", "React", "Node.js", ".NET", "Tailwind", "PostgreSQL"]
    },
    {
      "id": "exp-6",
      "company": "Triger",
      "brandColor": "#7c3aed", // Purple
      "initials": "TG",
      "position": "Freelance Engineer",
      "startDate": "2020-09-01",
      "duration": "2020 – 2022",
      "type": "Freelance",
      "description": "End-to-end projects. Process automation with Python/n8n and lightweight technical documentation.",
      "achievements": [
        "Process automation with Python/n8n",
        "Lightweight technical documentation and tracking boards"
      ],
      "technologies": ["React", "Vue", "Python", "n8n", "Node.js"]
    },
    {
      "id": "exp-7",
      "company": "Grupo Cosmic",
      "brandColor": "#ea1d2c", // Red
      "initials": "GC",
      "position": "Full-Stack Developer",
      "startDate": "2017-07-01",
      "duration": "2017 – 2020",
      "type": "Full-time",
      "description": "Mobile assistance apps, geolocation, dashboards. Innovation Recognition in 2019.",
      "achievements": [
        "Innovation Recognition 2019",
        "Centralization and automation of internal systems",
        "Design of initial architecture for scalability"
      ],
      "technologies": [".NET", "Node.js", "SQL Server", "Vue", "Microservices"]
    },
    {
      "id": "exp-8",
      "company": "Early Career",
      "brandColor": "#475569", // Slate
      "initials": "EC",
      "position": "Consultant / Engineer",
      "startDate": "2013-01-01",
      "duration": "2013 – 2017",
      "type": "Contract",
      "description": "Delivered software solutions for HR, finance, and ERP integrations (Siemens, OrionEarth).",
      "achievements": [
        "Quality Software Consultant",
        "Siemens Integration"
      ],
      "technologies": ["Java", ".NET", "SQL", "ERP"]
    }
  ];

  // Ordenar para la visualización (del más antiguo al más reciente en modo historia)
  // Pero visualmente queremos Presente arriba. Para la animación, invertimos la lógica.
  const visualData = [...rawData]; 

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Auto-Play Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveIndex((prev) => {
          const next = prev + 1;
          if (next >= visualData.length) {
            setIsPlaying(false); // Stop at end
            return prev;
          }
          return next;
        });
      }, 20000); // 20 segundos por slide
    }
    return () => clearInterval(interval);
  }, [isPlaying, visualData.length]);

  // Auto-Scroll Logic
  useEffect(() => {
    if (itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    }
  }, [activeIndex]);

  const togglePlay = () => {
    if (activeIndex === visualData.length - 1 && !isPlaying) {
      setActiveIndex(0); // Reset si está al final
    }
    setIsPlaying(!isPlaying);
  };

  const currentJob = visualData[activeIndex];

  return (
    <div className="flex flex-col h-screen bg-[#050505] text-slate-100 font-sans overflow-hidden">
      
      {/* Navbar */}
      <nav className="flex-none h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 z-20 shadow-lg">        
        <div className="flex items-center gap-4">
          
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left: The Interactive Map (Timeline) */}
        <div className="w-full md:w-5/12 bg-[#050505] relative border-r border-slate-800 flex flex-col">
            
            {/* Timeline Overlay Info */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">              
                 <div className="bg-slate-900/80 backdrop-blur px-3 py-1 rounded border border-slate-700 text-xs text-slate-400">
                    Interactive Map • Click nodes to navigate
                 </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar relative p-4" ref={scrollContainerRef}>
                <div className="relative min-h-[1200px] flex flex-col items-center py-10">
                    
                    {/* The Connecting Line */}
                    <div className="absolute top-0 bottom-0 left-1/2 w-[2px] -ml-[1px] bg-gray-800 z-0"></div>
                    <div 
                        className="absolute top-0 left-1/2 w-[2px] -ml-[1px] bg-gradient-to-b from-amber-400 to-teal-400 z-0 transition-all duration-700 ease-in-out"
                        style={{ height: `${((activeIndex + 0.5) / visualData.length) * 100}%` }}
                    ></div>

                    {visualData.map((job, index) => {
                        const isActive = index === activeIndex;
                        const isPast = index < activeIndex;

                        return (
                            <div 
                                key={job.id}
                                ref={el => { itemRefs.current[index] = el }}
                                onClick={() => { 
                                    setActiveIndex(index);
                                    setIsPlaying(index === 0);
                                }}
                                className={`relative z-10 mb-20 w-full flex items-center cursor-pointer group transition-all duration-500 ${isActive ? 'scale-105' : 'scale-100 opacity-60 hover:opacity-100'}`}
                            >
                                {/* Left Side Label (Date) */}
                                <div className="flex-1 text-right pr-8 hidden md:block">
                                    <span className={`font-mono text-sm ${isActive ? 'text-blue-300 font-bold' : 'text-slate-500'}`}>
                                        {job.duration.split('–')[0]}
                                    </span>
                                </div>

                                {/* The "Real" Logo Node */}
                                <div className="flex-none relative flex justify-center w-20">
                                    <div 
                                        className={`w-16 h-16 rounded-xl flex items-center justify-center border-4 shadow-2xl transition-all duration-500 ${isActive ? 'border-amber-500 scale-110 bg-gradient-to-br from-amber-400 to-orange-600 shadow-[0_0_25px_rgba(245,158,11,0.5)]' : isPast ? 'border-teal-500/50 grayscale bg-slate-800' : 'border-slate-700 grayscale bg-slate-900'}`}
                                        style={{ 
                                            backgroundColor: isActive ? undefined : job.brandColor
                                        }}
                                    >
                                        <span className={`${isActive ? 'text-black' : 'text-white'} font-black text-xl tracking-tighter drop-shadow-md font-sans`}>
                                            {job.initials}
                                        </span>
                                    </div>
                                    
                                    {/* Connection Dot */}
                                    {isActive && (
                                        <div className="absolute -right-4 top-1/2 -mt-1.5 w-3 h-3 bg-amber-400 rounded-full animate-ping"></div>
                                    )}
                                </div>

                                {/* Right Side Label (Company) */}
                                <div className="flex-1 pl-8">
                                    <h3 className={`font-bold text-lg transition-colors ${isActive ? 'text-white' : 'text-slate-500'}`}>
                                        {job.company}
                                    </h3>
                                    <p className={`text-xs ${isActive ? 'text-blue-300' : 'text-slate-600'}`}>
                                        {job.type}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

        {/* Right: The Data Dashboard (Details) */}
        <div className="w-full md:w-7/12 bg-[#050505] overflow-y-auto custom-scrollbar flex flex-col relative">
            


            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex-1 p-8 md:p-12 z-10 flex flex-col justify-center">
                 
                 {/* Content Transition Wrapper */}
                 <div key={currentJob.id} className="animate-slide-up">
                    
                    {/* Header Details */}
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs font-mono text-blue-300 flex items-center gap-2">
                                    <Calendar size={12} /> {currentJob.duration}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${currentJob.type === 'Freelance' ? 'bg-purple-900/30 text-purple-300 border border-purple-500/30' : 'bg-emerald-900/30 text-emerald-300 border border-emerald-500/30'}`}>
                                    {currentJob.type}
                                </span>
                            </div>
                            <h2 className="text-4xl font-sans font-extrabold text-white mb-2 leading-tight">
                                {currentJob.position}
                            </h2>
                            <h3 className="text-2xl text-amber-400 font-medium flex items-center gap-2">
                                at <span>{currentJob.company}</span>
                            </h3>
                        </div>
                        
                        {/* Big Brand Logo Watermark */}
                        <div className="hidden lg:flex w-24 h-24 rounded-2xl items-center justify-center opacity-20 rotate-12" style={{ backgroundColor: currentJob.brandColor }}>
                             <span className="text-5xl font-black text-white">{currentJob.initials}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-10 pl-6 border-l-2 border-amber-500/30">
                        <p className="text-lg text-gray-300 leading-relaxed italic">
                            "{currentJob.description}"
                        </p>
                    </div>

                    {/* Tech Stack Grid - The "Real" Graphics */}
                    <div className="mb-10">
                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Zap size={16} className="text-yellow-500"/> Tech Arsenal
                        </h4>
                        <div className="flex flex-wrap gap-4">
                            {currentJob.technologies.map((tech, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-2 group">
                                    <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center p-2.5 shadow-lg border border-white/10 group-hover:border-teal-400/50 group-hover:bg-white/10 transition-all cursor-help">
                                        <TechLogo name={tech} className="w-full h-full text-gray-400 group-hover:text-teal-400 transition-colors" />
                                    </div>
                                    <span className="text-xs font-medium text-gray-500 group-hover:text-teal-400 transition-colors">{tech}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Achievements */}
                    {currentJob.achievements && (
                        <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-800">
                             <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Award size={16} className="text-teal-400"/> Key Milestones
                            </h4>
                            <ul className="grid gap-3">
                                {currentJob.achievements.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-teal-500"></span>
                                        <span className="text-slate-300 font-light">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                 </div>
            </div>
            
            {/* Progress Bar for AutoPlay */}
            {isPlaying && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-800">
                    <div className="h-full bg-blue-500 animate-progress-bar"></div>
                </div>
            )}
        </div>

      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #020617; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155; 
          border-radius: 3px;
        }
        @keyframes slide-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
            animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes progress {
            from { width: 0%; }
            to { width: 100%; }
        }
        .animate-progress-bar {
            animation: progress 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CareerTechTree;
