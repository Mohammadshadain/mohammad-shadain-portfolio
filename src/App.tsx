import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Menu, X, ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Globe, FileDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const PROJECTS = [
  {
    id: "01",
    title: "EchoBazaar",
    type: "Vox-Marketplace",
    tools: "Next.js, React.js, Express.js, Node.js, MongoDB, Tailwind CSS, REST APIs, JWT, Framer Motion",
    description: "A comprehensive multi-vendor marketplace named Vox-Market (EchoBazaar) where users can discover products across categories like Electronics, Clothing, and Home & Garden. Features a robust 'Become a Seller' module and a polished, responsive e-commerce UI.",
    images: [
       "/vox1.4.png", "/vox2.png", "/vox3.png",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200", // Hero/Store vibes
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200", // Electronics/Categories
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200"  // Featured Products
    ],
    link: "https://vox-market1.vercel.app/",
  },
  {
    id: "02",
    title: "Barbera",
    type: "Salon & Barber Management",
    tools: "React.js, Next.js, Node.js, Express.js, MongoDB, Tailwind CSS, REST APIs, JWT, AI Chatbot Integration, Framer Motion",
    description: "A comprehensive platform for salon owners and clients. Features include real-time booking, service management, an AI-powered chatbot for instant customer support, and a sleek interface for modern grooming businesses.",
    images: [
        "/bar1.png", "/bar2.png", "/bar3.png",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=1200"
    ],
    link: "https://barbera-psi.vercel.app/",
  },
  {
    id: "03",
    title: "React Library Directory",
    type: "Developer Resource",
    tools: "Next.js, Node.js, Express.js, Axios, Mongoose, JWT",
    description: "A web application to help developers discover and explore React/JS libraries. Features secure data handling and responsive design for seamless browsing.",
    images: [
       "/react1.png", "/react2.png","/react3.1.png",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1200"
    ],
    link: "https://react-library-sable.vercel.app/",
  },
];

const EXPERIENCE = [
  {
    company: "Digipodium, Lucknow",
    role: "Web Development Trainee",
    period: "June 2024 - Aug 2024",
    location: "Lucknow, India",
    description: "Acquired expertise in MERN stack. Designed and implemented React Library Directory website including debugging and deployment.",
    link: "https://drive.google.com/file/d/1jdmocU2S0Ksaj7W1UFBeOEbHwj5CxYHQ/view?usp=sharing",
  }
];

const EDUCATION = [
  {
    school: "Integral University",
    degree: "B.Tech in Computer Science and Engineering",
    period: "Oct 2021 - June 2025",
    location: "Lucknow, India",
  },
  {
    school: "Exon Montessori School",
    degree: "Intermediate (XII) ISC",
    period: "2019 - 2020",
    location: "Lucknow, India",
  },
  {
    school: "Exon Montessori School",
    degree: "Secondary Education (X) ISC",
    period: "2017 - 2018",
    location: "Lucknow, India",
  }
];

const SKILLS = [
  { category: "Languages", items: ["C++", "Java", "JavaScript"] },
  { category: "Web", items: ["HTML5", "Tailwind CSS", "React.js", "Next.js", "Express.js", "Axios"] },
  { category: "Database", items: ["MongoDB", "SQL"] },
  { category: "Tools", items: ["Git", "GitHub", "JWT", "API Integration"] },
];

const LEADERSHIP = [
  {
    role: "Member of Literary Club – AMC",
    organization: "Integral University",
    period: "Feb 2023 - May 2025",
    description: "Participated in organizing events, collaborated with a dynamic team, and contributed to workshops aimed at enhancing member’s literary skills.",
    link: "https://drive.google.com/file/d/1EWbGwYuqoAo0qZ_bG_Y__A8r1yQkiuBO/view?usp=sharing"
  }
];

const CERTIFICATIONS = [
  { 
    title: "MERN Stack Development", 
    issuer: "Digipodium, Lucknow", 
    date: "Aug 2024", 
    link: "https://drive.google.com/file/d/1hcv_EWOPPP0o6--h8s-jZ_EkC0RXcs1Q/view?usp=sharing" 
  },
  { 
    title: "MySQL", 
    issuer: "Traversy Media", 
    date: "Nov 2024", 
    link: "https://drive.google.com/file/d/1hbDj1GAXdDO1pdcdU4PJVyzy2D6oGle5/view?usp=sharing" 
  },
];

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;
    
    if (!GOOGLE_SHEET_URL) {
      console.error("VITE_GOOGLE_SHEET_URL is not defined in environment variables.");
      setStatus('error');
      return;
    }

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <label className="font-label text-[10px] uppercase tracking-widest opacity-40">What's your name?</label>
          <input 
            required
            name="name"
            type="text" 
            placeholder="John Doe"
            className="w-full bg-transparent border-b border-white/20 py-4 font-headline text-xl focus:border-white outline-none transition-colors"
          />
        </div>
        <div className="space-y-4">
          <label className="font-label text-[10px] uppercase tracking-widest opacity-40">What's your email?</label>
          <input 
            required
            name="email"
            type="email" 
            placeholder="john@example.com"
            className="w-full bg-transparent border-b border-white/20 py-4 font-headline text-xl focus:border-white outline-none transition-colors"
          />
        </div>
      </div>
      <div className="space-y-4">
        <label className="font-label text-[10px] uppercase tracking-widest opacity-40">Subject</label>
        <input 
          required
          name="subject"
          type="text" 
          placeholder="Project Inquiry"
          className="w-full bg-transparent border-b border-white/20 py-4 font-headline text-xl focus:border-white outline-none transition-colors"
        />
      </div>
      <div className="space-y-4">
        <label className="font-label text-[10px] uppercase tracking-widest opacity-40">Your Message</label>
        <textarea 
          required
          name="message"
          rows={4}
          placeholder="Hello Mohammad, I'd like to talk about..."
          className="w-full bg-transparent border-b border-white/20 py-4 font-headline text-xl focus:border-white outline-none transition-colors resize-none"
        />
      </div>
      
      <div className="flex items-center gap-8">
        <button 
          disabled={status === 'loading'}
          type="submit"
          className="btn-water group px-12 py-6 rounded-full bg-white text-kinetic-ink font-headline font-bold uppercase tracking-tighter overflow-hidden transition-transform active:scale-95 disabled:opacity-50"
        >
          <span>
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </span>
        </button>
        
        {status === 'success' && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-label text-xs text-green-400 uppercase tracking-widest">
            Message sent successfully!
          </motion.p>
        )}
        {status === 'error' && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-label text-xs text-red-400 uppercase tracking-widest">
            Something went wrong. Please try again.
          </motion.p>
        )}
      </div>
    </form>
  );
}

// Magnetic Button Effect
const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

// Project Reel Component for "video-like" experience
const ProjectMedia = ({ images, title, isHovered }: { images: string[], title: string, isHovered: boolean }) => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Using lg breakpoint as mobile/tablet for auto-scroll
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered || isMobile) {
      interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length);
      }, 1700); // 2s per image
    } else if (!isMobile) {
      setIndex(0); // Reset to first image when not hovered on desktop
    }
    return () => clearInterval(interval);
  }, [isHovered, isMobile, images.length]);

  return (
    <div className="w-full h-full relative bg-kinetic-ink">
      <AnimatePresence initial={false}>
        <motion.img
          key={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }} // Keep the old image opaque while the new one fades in on top
          transition={{ duration: 0.5, ease: "linear" }}
          src={images[index]}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover grayscale transition-[filter] duration-700 ${isMobile ? 'grayscale-0' : 'group-hover:grayscale-0'}`}
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>
      
      {/* Visual indicators for "reels" */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 rounded-full transition-all duration-500 ${i === index ? "w-8 bg-white" : "w-2 bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectCard = (props: { project: any, index: number, key?: any }) => {
  const { project, index } = props;
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0.3, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: index * 0.05 }}
      className="group grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="lg:col-span-7 overflow-hidden rounded-2xl bg-kinetic-ink aspect-[16/10] relative group shadow-2xl">
        <div className="w-full h-full overflow-hidden">
          <ProjectMedia 
            images={project.images} 
            title={project.title} 
            isHovered={isHovered} 
          />
        </div>
      </div>
      <div className="lg:col-span-5">
        <div className="font-label text-[10px] sm:text-xs uppercase tracking-widest text-kinetic-ink/90 mb-4">{project.type}</div>
        <h3 className="font-headline text-3xl sm:text-5xl md:text-6xl font-bold tracking-tighter uppercase mb-6">{project.title}</h3>
        <p className="font-body text-base sm:text-lg text-kinetic-ink/70 mb-8 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tools.split(", ").map(tool => (
            <span key={tool} className="px-3 py-1 rounded-full border border-kinetic-ink/20 font-label text-[10px] uppercase tracking-widest text-kinetic-ink/60">
              {tool}
            </span>
          ))}
        </div>
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-water inline-flex items-center gap-4 px-8 py-3 rounded-full border border-kinetic-ink font-headline text-sm font-bold uppercase tracking-tighter transition-all hover:border-transparent">
           <span>View Source <ArrowUpRight className="w-4 h-4 relative z-10" /></span>
        </a>
      </div>
    </motion.div>
  );
};

const Curve = () => {
  const [dimensions, setDimensions] = useState({ height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setDimensions({ height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const initialPath = `M100 0 L100 ${dimensions.height} Q-100 ${dimensions.height / 2} 100 0`;
  const targetPath = `M100 0 L100 ${dimensions.height} Q100 ${dimensions.height / 2} 100 0`;

  return (
    <svg className="absolute top-0 -left-[99px] w-[100px] h-full fill-[#1c1d20] stroke-none pointer-events-none">
      <motion.path
        initial={{ d: initialPath }}
        animate={{ d: targetPath }}
        exit={{ d: initialPath }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      />
    </svg>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const containerRef = useRef(null);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle floating button visibility on scroll
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowFloatingButton(true);
      } else {
        setShowFloatingButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -100]);

  return (
    <div ref={containerRef} className="relative bg-kinetic-bg selection:bg-kinetic-accent selection:text-white">
      {/* Navigation */}
      <motion.header 
        style={{ y: headerY }}
        className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 md:py-8 flex justify-between items-center text-white"
      >
        <div className="font-headline text-sm md:text-lg font-bold tracking-tighter uppercase whitespace-nowrap">
          © CODE BY SHADAIN
        </div>
        <div className="hidden md:flex items-center gap-8 font-label text-xs uppercase tracking-widest">
          <a href="#work" className="hover:opacity-40 transition-opacity">WORK</a>
          <a href="#about" className="hover:opacity-40 transition-opacity">ABOUT</a>
          <a href="#contact" className="hover:opacity-40 transition-opacity">CONTACT</a>
        </div>
        {/* Mobile menu hint or simple icon if hidden links */}
        <div className="md:hidden">
           <button onClick={() => setIsMenuOpen(true)} className="p-2 opacity-60 hover:opacity-100">
              <Menu className="w-6 h-6" />
           </button>
        </div>
      </motion.header>

      {/* Floating Menu Button */}
      <AnimatePresence>
        {showFloatingButton && (
          <div className="fixed top-8 right-8 z-[60]">
            <Magnetic>
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={() => setIsMenuOpen(true)}
                className="w-16 h-16 rounded-full bg-kinetic-ink text-white flex flex-col items-center justify-center gap-1.5 shadow-2xl transition-transform active:scale-95"
              >
                <div className="w-6 h-0.5 bg-white rounded-full transition-all group-hover:w-8" />
                <div className="w-6 h-0.5 bg-white rounded-full" />
              </motion.button>
            </Magnetic>
          </div>
        )}
      </AnimatePresence>

      {/* Side Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "calc(100% + 100px)" }}
              animate={{ x: 0 }}
              exit={{ x: "calc(100% + 100px)" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="fixed top-0 right-0 h-[100dvh] w-full sm:w-[350px] md:w-[400px] z-[110] bg-[#1c1d20] text-white flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
            >
              <Curve />
              
              {/* Header Label */}
              <div className="px-8 sm:px-12 pt-12 sm:pt-16 mb-8">
                <div className="font-label text-[10px] uppercase tracking-widest opacity-40 mb-4">Navigation</div>
                <div className="w-full h-px bg-white/10" />
                
                {/* Close Button - positioned to stay accessible */}
                <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-[120]">
                  <Magnetic>
                    <button 
                      onClick={() => setIsMenuOpen(false)} 
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#455ce9] text-white flex items-center justify-center shadow-xl"
                    >
                      <X className="w-6 h-6 sm:w-8 sm:h-8" />
                    </button>
                  </Magnetic>
                </div>
              </div>

              {/* Scrollable Navigation section */}
              <div className="flex-1 overflow-y-auto scrollbar-hide px-8 sm:px-12">
                <nav className="flex flex-col gap-6 sm:gap-8 pb-12 pt-4">
                  {["Home", "Work", "About", "Contact"].map((item, i) => (
                    <motion.a
                      key={item}
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + i * 0.1, ease: [0.33, 1, 0.68, 1] }}
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="group relative flex items-center font-headline text-5xl sm:text-6xl font-light tracking-tighter hover:pl-10 transition-all duration-500"
                    >
                      <div className="absolute left-0 w-2 h-2 rounded-full bg-white scale-0 group-hover:scale-100 transition-transform duration-300" />
                      {item}
                    </motion.a>
                  ))}
                </nav>
              </div>

              {/* Fixed Bottom Socials section */}
              <div className="px-8 sm:px-12 pt-6 pb-12 sm:pb-16 bg-[#1c1d20]">
                <div className="font-label text-[10px] uppercase tracking-widest opacity-60 mb-6 font-medium">Socials</div>
                <div className="w-full h-px bg-white/10 mb-8" />
                <div className="flex flex-wrap gap-x-8 gap-y-4 font-label text-xs uppercase tracking-widest">
                  <a href="https://www.linkedin.com/in/mohammadshadain" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 hover:text-white transition-all font-medium border-b border-transparent hover:border-white/20 pb-1">LinkedIn</a>
                  <a href="https://github.com/Mohammadshadain" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 hover:text-white transition-all font-medium border-b border-transparent hover:border-white/20 pb-1">GitHub</a>
                  <a href="https://www.instagram.com/msd_shadain?igsh=MW5sYTN3Mmt4aXNjaw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 hover:text-white transition-all font-medium border-b border-transparent hover:border-white/20 pb-1">Instagram</a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-24 pt-32 sm:pt-48 pb-12 overflow-hidden relative bg-kinetic-bg">
          {/* Top part: Badge and Nav */}
          <div className="flex flex-col sm:flex-row justify-between items-start w-full relative z-30 gap-8 sm:gap-0">
             <motion.div 
               initial={{ x: -100, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ duration: 1, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
               className="bg-kinetic-ink text-white p-4 rounded-r-full flex items-center gap-4 sm:gap-6 -ml-6 md:-ml-12 lg:-ml-24 pr-8 sm:pr-12 shadow-2xl"
             >
                <div className="font-label text-[10px] sm:text-xs uppercase tracking-widest leading-tight">
                  Located<br/>in Lucknow , India
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                   <Globe className="w-5 h-5 sm:w-6 sm:h-6 animate-spin-slow" />
                </div>
             </motion.div>
             
             <motion.div 
               initial={{ x: 100, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ duration: 1, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
               className="text-left sm:text-right text-white w-full sm:w-auto"
             >
                <ArrowDownRight className="w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 ml-0 sm:ml-auto opacity-20" />
                <div className="font-headline text-2xl sm:text-3xl md:text-4xl font-medium uppercase tracking-tighter leading-none">
                  Full Stack<br/>Developer
                </div>
             </motion.div>
          </div>

          {/* Huge Name Marquee (Automatic & In Front of Photo) */}
          <div className="absolute bottom-6 left-0 w-full z-20 overflow-hidden pointer-events-none">
             <div className="animate-marquee-infinite whitespace-nowrap flex gap-8 sm:gap-12 w-fit">
               <span className="font-body text-[14vw] sm:text-[17vw] font-medium leading-none tracking-tighter text-white drop-shadow-2xl">
                 Mohammad Shadain — Mohammad Shadain — Mohammad Shadain — 
               </span>
               <span className="font-body text-[14vw] sm:text-[17vw] font-medium leading-none tracking-tighter text-white drop-shadow-2xl">
                 Mohammad Shadain — Mohammad Shadain — Mohammad Shadain — 
               </span>
             </div>
          </div>

          {/* Center part: The Photo (Still) */}
          <div className="absolute inset-0 flex items-end justify-center z-10">
             <div className="w-full h-full flex items-end justify-center">
                <img 
                  src="/me.png"
                  alt="Mohammad Shadain"
                  className="h-[60vh] sm:h-[75vh] md:h-[95vh] w-auto max-w-[95vw] md:max-w-none object-contain object-bottom md:grayscale hover:grayscale-0 brightness-110 contrast-110 drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500"
                />
             </div>
          </div>

          {/* Bottom part: Spacer to maintain layout */}
          <div className="relative z-20 w-full mt-auto mb-12 h-[17vw] pointer-events-none">
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-12 right-12 z-40 hidden md:block"
          >
             <div className="flex items-center gap-4 font-label text-[10px] uppercase tracking-widest opacity-40">
                <span>Scroll to explore</span>
                <ArrowDownRight className="w-4 h-4 animate-bounce" />
             </div>
          </motion.div>
        </section>

        {/* Intro Section */}
        <section className="py-24 md:py-48 px-6 md:px-12 lg:px-24 bg-kinetic-bg relative z-30">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-8">
              <motion.p 
                style={{ y: useTransform(scrollYProgress, [0.1, 0.3], [50, -50]) }}
                className="font-body text-3xl sm:text-4xl md:text-6xl leading-[1.1] text-kinetic-ink font-medium tracking-tighter"
              >
                 Building modern web applications that are fast, scalable, and designed for real users.
              </motion.p>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-end">
              <motion.p 
                style={{ y: useTransform(scrollYProgress, [0.1, 0.3], [30, -30]) }}
                className="font-body text-lg sm:text-xl text-kinetic-ink/60 max-w-xs leading-relaxed"
              >
                Full Stack Developer with hands-on expertise in React.js, Next.js, Node.js, and MongoDB, driven by a passion for developing innovative and user-centric web applications.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="py-24 md:py-32 px-6 md:px-12 bg-white relative z-30 rounded-t-[2.5rem] md:rounded-t-[3rem] -mt-10 md:-mt-12 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
          <div className="max-w-screen-2xl mx-auto">
            <div className="flex justify-between items-end mb-16 md:mb-24 border-b border-kinetic-ink/10 pb-6 md:pb-8">
              <h2 className="font-headline text-[10px] sm:text-xs uppercase tracking-widest opacity-40">Recent Work</h2>
              <div className="font-label text-[10px] sm:text-xs uppercase tracking-widest opacity-40">01 — Projects</div>
            </div>

            <div className="space-y-24 md:space-y-32">
              {PROJECTS.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* About & Experience Section */}
        <section id="about" className="py-24 md:py-32 px-6 md:px-12 bg-kinetic-ink text-white rounded-t-[2.5rem] md:rounded-t-[3rem] -mt-10 md:-mt-12 relative z-40 shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-6 lg:pr-12">
                <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-7xl font-black tracking-tighter uppercase leading-[0.85] mb-8 md:mb-12">
                Code that powers real-world applications
                </h2>
                <p className="font-body text-lg sm:text-xl opacity-60 leading-relaxed mb-12 md:mb-16">
                  I specialize in building scalable, high-performance web applications using modern full-stack technologies. My approach combines technical precision with a deep focus on user experience.
                </p>

                <div className="space-y-12">
                  <div>
                    <div className="font-label text-xs uppercase tracking-widest opacity-40 border-b border-white/10 pb-4 mb-8">Philosophy</div>
                    <p className="font-body text-xl sm:text-2xl lg:text-3xl font-light leading-snug tracking-tight">
                      "Clean code is not just a standard—it's a <span className="opacity-40 italic">commitment</span> to clarity and future-proof design."
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 pt-8">
                    <div>
                      <div className="font-headline text-4xl sm:text-5xl font-bold tracking-tighter italic">10+</div>
                      <div className="font-label text-[10px] uppercase tracking-widest opacity-40 mt-2">Projects</div>
                    </div>
                    <div>
                      <div className="font-headline text-4xl sm:text-5xl font-bold tracking-tighter italic">02+</div>
                      <div className="font-label text-[10px] uppercase tracking-widest opacity-40 mt-2">Internships</div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <div className="font-headline text-4xl sm:text-5xl font-bold tracking-tighter italic">95%</div>
                      <div className="font-label text-[10px] uppercase tracking-widest opacity-40 mt-2">Clean Code</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-24">
                {/* Experience */}
                <div>
                  <div className="font-label text-xs uppercase tracking-widest opacity-40 mb-8 border-b border-white/10 pb-4">Experience</div>
                  {EXPERIENCE.map((exp, i) => (
                    <div key={i} className="group border-b border-white/5 hover:bg-white/5 transition-colors -mx-4">
                      {exp.link ? (
                        <a 
                          href={exp.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="block py-8 px-4"
                        >
                          <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2 sm:gap-0">
                            <h4 className="font-headline text-2xl sm:text-3xl font-bold uppercase">{exp.role}</h4>
                            <span className="font-label text-[10px] sm:text-xs opacity-40">{exp.period}</span>
                          </div>
                          <div className="flex justify-between items-end">
                            <p className="font-body text-base sm:text-lg opacity-60">{exp.company} • {exp.location}</p>
                            <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </a>
                      ) : (
                        <div className="py-8 px-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2 sm:gap-0">
                            <h4 className="font-headline text-2xl sm:text-3xl font-bold uppercase">{exp.role}</h4>
                            <span className="font-label text-[10px] sm:text-xs opacity-40">{exp.period}</span>
                          </div>
                          <div className="flex justify-between items-end">
                            <p className="font-body text-base sm:text-lg opacity-60">{exp.company} • {exp.location}</p>
                            <ArrowUpRight className="w-6 h-6 opacity-40" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Education */}
                <div>
                  <div className="font-label text-xs uppercase tracking-widest opacity-40 mb-8 border-b border-white/10 pb-4">Education</div>
                  {EDUCATION.map((edu, i) => (
                      <div key={i} className="py-6 border-b border-white/5 last:border-none">
                        <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2 sm:gap-0">
                          <h4 className="font-headline text-lg sm:text-xl font-bold uppercase">{edu.degree}</h4>
                          <span className="font-label text-[10px] sm:text-xs opacity-40">{edu.period}</span>
                        </div>
                        <p className="font-body text-sm sm:text-base opacity-60">{edu.school} • {edu.location}</p>
                      </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Info Grid - Closing the gap */}
            <div className="mt-32 pt-32 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-24">
                {/* Skills */}
                <div className="lg:col-span-6 lg:pr-12">
                  <div className="font-label text-xs uppercase tracking-widest opacity-40 mb-8 border-b border-white/10 pb-4">Skills</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                    {SKILLS.map((skill, i) => (
                      <div key={i}>
                        <h5 className="font-headline font-bold uppercase mb-6 opacity-40 text-lg">{skill.category}</h5>
                        <div className="flex flex-wrap gap-3">
                          {skill.items.map(item => (
                            <span key={item} className="px-4 py-2 rounded-full bg-white/5 font-label text-xs uppercase tracking-widest">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-24">
                   {/* Leadership */}
                  <div>
                    <div className="font-label text-xs uppercase tracking-widest opacity-40 mb-8 border-b border-white/10 pb-4">Leadership</div>
                    {LEADERSHIP.map((lead, i) => (
                      <div key={i} className="group border-b border-white/5 last:border-none hover:bg-white/5 transition-colors -mx-4">
                        {lead.link ? (
                          <a 
                            href={lead.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="block py-6 px-4"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-headline text-xl font-bold uppercase">{lead.role}</h4>
                              <div className="flex items-center gap-4">
                                <span className="font-label text-xs opacity-40">{lead.period}</span>
                                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </div>
                            <p className="font-body opacity-60 mb-2">{lead.organization}</p>
                            <p className="font-body text-sm opacity-40 leading-relaxed">{lead.description}</p>
                          </a>
                        ) : (
                          <div className="py-6 px-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-headline text-xl font-bold uppercase">{lead.role}</h4>
                              <span className="font-label text-xs opacity-40">{lead.period}</span>
                            </div>
                            <p className="font-body opacity-60 mb-2">{lead.organization}</p>
                            <p className="font-body text-sm opacity-40 leading-relaxed">{lead.description}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Certifications */}
                  <div>
                    <div className="font-label text-xs uppercase tracking-widest opacity-40 mb-8 border-b border-white/10 pb-4">Certifications</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {CERTIFICATIONS.map((cert, i) => (
                        <a 
                          key={i} 
                          href={cert.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="group p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-headline font-bold uppercase text-sm">{cert.title}</h4>
                              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <p className="font-label text-[10px] opacity-40 uppercase tracking-widest">{cert.issuer} • {cert.date}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6 md:px-12 bg-kinetic-ink text-white">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
              <div className="lg:col-span-6 lg:pr-12">
                <h2 className="font-headline text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-black tracking-tighter uppercase leading-[0.85] mb-12">
                  Let's work<br />together
                </h2>
                <div className="space-y-8">
                  <div>
                    <div className="font-label text-[10px] uppercase tracking-widest opacity-40 mb-2">Email</div>
                    <a href="mailto:shadain044714@gmail.com" className="font-headline text-2xl font-bold uppercase hover:text-kinetic-accent transition-colors">shadain044714@gmail.com</a>
                  </div>
                  <div>
                    <div className="font-label text-[10px] uppercase tracking-widest opacity-40 mb-2">Phone</div>
                    <a href="tel:+919129801663" className="font-headline text-2xl font-bold uppercase hover:text-kinetic-accent transition-colors">+91 9129801663</a>
                  </div>
                  <div className="pt-8">
                    <div className="font-label text-xs uppercase tracking-widest opacity-40 mb-4">Socials</div>
                    <div className="flex flex-wrap gap-x-8 gap-y-4 font-headline text-lg sm:text-xl font-bold uppercase">
                      <a href="https://www.linkedin.com/in/mohammadshadain" target="_blank" rel="noopener noreferrer" className="hover:opacity-40 transition-opacity whitespace-nowrap">LinkedIn</a>
                      <a href="https://github.com/Mohammadshadain" target="_blank" rel="noopener noreferrer" className="hover:opacity-40 transition-opacity whitespace-nowrap">GitHub</a>
                      <a href="https://www.instagram.com/msd_shadain?igsh=MW5sYTN3Mmt4aXNjaw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:opacity-40 transition-opacity whitespace-nowrap">Instagram</a>
                    </div>
                    <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center gap-6 md:gap-10 group">
                      {/* Animated Pointing Mascot (Custom SVG) */}
                      <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        animate={{ 
                          y: [0, -6, 0], // Idle bounce
                          rotate: [0, 2, 0] // Personality tilt
                        }}
                        transition={{ 
                          initial: { duration: 0.8 },
                          animate: { 
                            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                            rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                          }
                        }}
                        className="relative z-0 group-hover:scale-110 transition-transform duration-500"
                      >
                        {/* Pointing Nudge Animation Container */}
                        <motion.div
                          animate={{ x: [0, 10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <svg 
                            width="100" 
                            height="120" 
                            viewBox="0 0 120 140" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                            className="scale-x-[-1] drop-shadow-[0_10px_20px_rgba(255,255,255,0.05)]" // Fliped to point RIGHT
                          >
                            {/* Head */}
                            <circle cx="60" cy="40" r="28" fill="#E5E5E5" stroke="#111" strokeWidth="3"/>
                            {/* Eyes */}
                            <circle cx="50" cy="38" r="3" fill="#111"/>
                            <circle cx="70" cy="38" r="3" fill="#111"/>
                            {/* Body */}
                            <rect x="35" y="65" width="50" height="45" rx="12" fill="#9CA3AF" stroke="#111" strokeWidth="3"/>
                            {/* Left Arm (Pointing) */}
                            <line x1="35" y1="75" x2="15" y2="60" stroke="#111" strokeWidth="4" strokeLinecap="round"/>
                            {/* Pointing Hand */}
                            <circle cx="12" cy="58" r="5" fill="#111"/>
                            {/* Right Arm */}
                            <line x1="85" y1="75" x2="100" y2="90" stroke="#111" strokeWidth="4" strokeLinecap="round"/>
                            {/* Legs */}
                            <line x1="50" y1="110" x2="50" y2="130" stroke="#111" strokeWidth="4" strokeLinecap="round"/>
                            <line x1="70" y1="110" x2="70" y2="130" stroke="#111" strokeWidth="4" strokeLinecap="round"/>
                          </svg>
                        </motion.div>
                        
                        {/* Subtle text label for UX guidance */}
                        <motion.div 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 0.4 }}
                          className="absolute -top-6 left-1/2 -translate-x-1/2 font-label text-[8px] uppercase tracking-[0.3em] whitespace-nowrap text-white"
                        >
                           Grab it here
                        </motion.div>
                      </motion.div>

                      <a 
                        href="https://drive.google.com/file/d/1UH_5ETwfpO7X2W2ntyi5dHi5XA2RBeVq/view?usp=drivesdk" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-water relative z-10 inline-flex items-center gap-4 px-6 md:px-10 py-5 rounded-full border border-white/20 font-headline text-sm font-bold uppercase tracking-tighter transition-all hover:border-transparent min-w-[240px] md:min-w-[280px] group-hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]"
                      >
                        <span>Download Full Resume <FileDown className="w-5 h-5 relative z-10" /></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-kinetic-ink text-white/40 py-8 md:py-12 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 md:gap-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 font-label text-[9px] sm:text-[10px] uppercase tracking-widest">
            <span>© 2025 Mohammad Shadain</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Available for freelance
            </div>
          </div>
          <div className="font-label text-[9px] sm:text-[10px] uppercase tracking-widest opacity-60">
            Designed & Developed with Passion
          </div>
        </div>
      </footer>
    </div>
  );
}
