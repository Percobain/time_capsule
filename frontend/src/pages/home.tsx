/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { AuroraText } from "../components/magicui/aurora-text";
import { CoolMode } from "../components/magicui/cool-mode";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Wallet,
  Globe,
  Droplets,
  ChevronRight,
  Clock,
  Lock,
  Rocket,
  Star,
  Sparkles,
  ArrowRight,
  Github,
  Twitter,
  TwitterIcon
} from "lucide-react";

import NetworkVisualization from "../components/ui/network-visualization";
import OrbitalRings from "../components/ui/orbital-rings";
import ClockComponent from '../components/ui/clock';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: false });
  const featuresRef = useRef(null);
  const isInView = useInView(featuresRef, { once: false, margin: "-100px" });
  
  // Parallax scrolling effect
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  
  // For animation timing
  useEffect(() => {
    setMounted(true);
    
    // Show welcome toast when component mounts
    toast("Welcome to Time Capsule", {
      description: "Create digital memories that unlock in the future", 
      duration: 5000,
      icon: <img src="/favicon.svg" alt="Time Capsule Logo" className="h-5 w-5" />
    });
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#080816]">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/stars.png')] bg-repeat opacity-70" 
             style={{ animation: "drift 400s linear infinite" }}></div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#080816] via-[#0F0F2D] to-[#080816]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(67,97,238,0.15),transparent_50%)]"></div>

        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <OrbitalRings />
        </div>
      </div>
      
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(to_right,#232946_1px,transparent_1px),linear-gradient(to_bottom,#232946_1px,transparent_1px)]" 
          style={{ backgroundSize: '50px 50px' }}>
        </div>
      </div>

      <motion.div 
        className="fixed inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4CC9F0] to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      ></motion.div>
      <motion.div 
        className="fixed inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#F72585] to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.8, duration: 1.5 }}
      ></motion.div>
      
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/10 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-[#4CC9F0]" />
            <span className="text-xl font-bold text-white">Time Capsule</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#how-it-works" className="text-sm text-white/80 hover:text-[#4CC9F0] transition-colors">
              How It Works
            </a>
            <a href="https://nibiru.fi/" target="_blank" rel="noopener" className="text-sm text-white/80 hover:text-[#4CC9F0] transition-colors">
              Nibiru Chain
            </a>
          </nav>
          
          <div className="flex items-center gap-3">
            <Link to="/capsule" className="hidden sm:flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors">
              Open App
              <ChevronRight className="h-3 w-3" />
            </Link>
            <a 
              href="https://github.com/percobain/time_capsule" 
              target="_blank" 
              rel="noopener"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Github className="h-4 w-4 text-white" />
            </a>
            <a 
              href="https://x.com/ShreyansTatiya" 
              target="_blank" 
              rel="noopener"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <img src="/X.svg" alt="X Logo" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>
      
      {/* Hero Section with Parallax */}
      <motion.section
        ref={heroRef}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-20"
        style={{ y: smoothY, opacity, scale }}
      >
        {/* Floating elements */}
        <motion.div 
          className="absolute top-1/4 -left-12 size-48 rounded-full bg-[#F72585] opacity-20 blur-[100px]"
          animate={{ 
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 15,
            ease: "easeInOut" 
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-1/4 -right-12 size-48 rounded-full bg-[#4361EE] opacity-20 blur-[100px]"
          animate={{ 
            x: [0, -20, 0],
            y: [0, 15, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 18,
            ease: "easeInOut" 
          }}
        ></motion.div>
        
        {/* Hero Content */}
        <motion.div 
          className="relative z-10 max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Glowing pre-title badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="mb-6 border-[#4CC9F0]/50 bg-[#4CC9F0]/10 px-4 py-2 text-[#4CC9F0]">
              <Sparkles className="mr-2 h-3 w-3" />
              <span>Time-locked blockchain memories</span>
            </Badge>
          </motion.div>

            <h1 className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
            <AuroraText 
              colors={["#FFFFFF", "#E2E8F0", "#B8C0F0", "#A2B0FF"]} 
              speed={2.2}
            >
              Manifest Your Future
            </AuroraText>
            </h1>
          
          <motion.p 
            className="mb-8 mx-auto max-w-2xl text-lg text-[#E2E8F0] md:text-xl font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Create digital time capsules that unlock at the exact moment you designate.
            Record your intentions, dreams, and promises — preserved immutably on the blockchain.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link to="/capsule">
              <Button size="lg" className="h-14 bg-gradient-to-r from-[#4361EE] to-[#7209B7] hover:opacity-90 border-none text-white shadow-lg shadow-[#4361EE]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#7209B7]/30">
                <span>Create a Capsule</span>
                <Rocket className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            
            <HoverCard>
              <HoverCardTrigger asChild>
                <CoolMode>
                    <Button variant="outline" size="lg" className="h-14 border-[#4CC9F0]/50 bg-[#4CC9F0]/5 text-[#4CC9F0] hover:bg-[#4CC9F0]/10 hover:text-white">
                    <span>Click Me!</span>
                    <img src="/nibirulogo.svg" alt="Nibiru Logo" className="ml-2 h-4 w-4" />
                    </Button>
                </CoolMode>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 bg-[#0D0F21]/90 border border-[#252A44] text-white backdrop-blur-lg">
                <div className="flex flex-col space-y-2">
                  <h4 className="text-sm font-medium text-[#4CC9F0]">Create Time-Locked Messages</h4>
                  <p className="text-xs text-white/80">
                    Your messages are stored on Nibiru blockchain and can only be accessed 
                    after your specified time has passed.
                  </p>
                  <a href="#how-it-works" className="inline-flex items-center text-xs text-[#4CC9F0] hover:underline">
                    Learn more
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </HoverCardContent>
            </HoverCard>
          </motion.div>

          <motion.div 
            className="mt-16 flex flex-col items-center text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs">Scroll to explore</span>
            <div className="mt-2 h-10 w-5 rounded-full border border-white/20 p-1">
              <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-white"></div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
      
      {/* Features Tabs Section */}
      <section id="how-it-works" className="relative z-10 py-24 px-4 overflow-hidden">
        <div className="container mx-auto">
          <motion.div
            ref={featuresRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <Badge variant="outline" className="mb-4 border-[#F72585]/50 bg-[#F72585]/10 px-4 py-2 text-[#F72585]">
              <Star className="mr-2 h-3 w-3" />
              <span>Seamless Experience</span>
            </Badge>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">How Time Capsule Works</h2>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Create blockchain-secured messages that unlock at your chosen future date
            </p>
          </motion.div>
          
          {/* Tabs for better UX - replaces scrolling cards */}
          <Tabs defaultValue="wallet" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-[#0D0F21]/60 border border-[#252A44]/50 backdrop-blur-md">
                <TabsTrigger value="wallet" className="data-[state=active]:bg-[#4CC9F0]/20 data-[state=active]:text-[#4CC9F0]">
                  <Wallet className="mr-2 h-4 w-4" />
                  Leap Wallet
                </TabsTrigger>
                <TabsTrigger value="nibiru" className="data-[state=active]:bg-[#7209B7]/20 data-[state=active]:text-[#7209B7]">
                  <Globe className="mr-2 h-4 w-4" />
                  Nibiru Chain
                </TabsTrigger>
                <TabsTrigger value="faucet" className="data-[state=active]:bg-[#F72585]/20 data-[state=active]:text-[#F72585]">
                  <Droplets className="mr-2 h-4 w-4" />
                  Get Tokens
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="mb-12 overflow-visible rounded-xl border border-[#252A44]/80 bg-[#0D0F21]/60 backdrop-blur-md p-6 md:p-8 shadow-xl shadow-[#000]/20">
              <TabsContent value="wallet" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <div className="mb-2 inline-flex items-center rounded-full bg-[#4CC9F0]/20 px-3 py-1 text-xs font-medium text-[#4CC9F0]">
                      Step 1
                    </div>
                    <h3 className="mb-4 text-2xl font-bold text-white">Connect With Leap Wallet</h3>
                    <p className="mb-6 text-white/70">
                      Your intentions are stored using advanced blockchain technology. 
                      Install the Leap Wallet extension to interact with the Nibiru network.
                    </p>
                    <ul className="mb-6 space-y-3">
                      {["Secure key management", "Easy-to-use interface", "Cross-chain compatibility"].map((feature, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          className="flex items-center"
                        >
                          <div className="mr-2 size-5 rounded-full bg-[#4CC9F0]/20 flex items-center justify-center">
                            <div className="size-2 rounded-full bg-[#4CC9F0]"></div>
                          </div>
                          <span className="text-sm text-white/80">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <a 
                      href="https://www.leapwallet.io/" 
                      target="_blank" 
                      rel="noopener"
                      className="inline-flex items-center rounded-lg bg-[#4CC9F0]/10 px-4 py-2 text-sm font-medium text-[#4CC9F0] hover:bg-[#4CC9F0]/20 transition-colors"
                    >
                      Get Leap Wallet
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                  <div className="relative order-first md:order-last mb-6 md:mb-0">
                    <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-[#4CC9F0] to-[#4361EE] opacity-30 blur-md"></div>
                    <div className="relative overflow-hidden rounded-lg border border-[#252A44] bg-[#080816]/80 p-4 aspect-video">
                      <div className="h-full w-full rounded flex items-center justify-center">
                        <img 
                          src="/images/leap-wallet.png" 
                          alt="Leap Wallet Interface" 
                          onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/600x400/0D0F21/4CC9F0?text=Leap+Wallet";
                          }}
                          className="rounded max-w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="nibiru" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <div className="mb-2 inline-flex items-center rounded-full bg-[#7209B7]/20 px-3 py-1 text-xs font-medium text-[#7209B7]">
                      Step 2
                    </div>
                    <h3 className="mb-4 text-2xl font-bold text-white">Powered by Nibiru Chain</h3>
                    <p className="mb-6 text-white/70">
                      Connect your wallet to the Nibiru blockchain to create time-locked intentions 
                      that are secured by distributed consensus and open exactly when you specify.
                    </p>
                    <ul className="mb-6 space-y-3">
                      {["Immutable time-locked storage", "Cryptographic security", "Future-proof design"].map((feature, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          className="flex items-center"
                        >
                          <div className="mr-2 size-5 rounded-full bg-[#7209B7]/20 flex items-center justify-center">
                            <div className="size-2 rounded-full bg-[#7209B7]"></div>
                          </div>
                          <span className="text-sm text-white/80">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <a 
                      href="https://nibiru.fi/" 
                      target="_blank" 
                      rel="noopener"
                      className="inline-flex items-center rounded-lg bg-[#7209B7]/10 px-4 py-2 text-sm font-medium text-[#7209B7] hover:bg-[#7209B7]/20 transition-colors"
                    >
                      Learn about Nibiru
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                  <div className="relative order-first md:order-last mb-6 md:mb-0">
                    <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-[#7209B7] to-[#560BAD] opacity-30 blur-md"></div>
                    <div className="relative aspect-video overflow-hidden rounded-lg border border-[#252A44] bg-[#080816]/80">
                      <NetworkVisualization />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="faucet" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <div className="mb-2 inline-flex items-center rounded-full bg-[#F72585]/20 px-3 py-1 text-xs font-medium text-[#F72585]">
                      Step 3
                    </div>
                    <h3 className="mb-4 text-2xl font-bold text-white">Get Started with Testnet Tokens</h3>
                    <p className="mb-6 text-white/70">
                      To begin creating your time capsules on the Nibiru testnet, 
                      you'll need testnet tokens available for free from the Nibiru faucet.
                    </p>
                    <ul className="mb-6 space-y-3">
                      {["Free testnet tokens", "Instant delivery", "Test all features"].map((feature, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          className="flex items-center"
                        >
                          <div className="mr-2 size-5 rounded-full bg-[#F72585]/20 flex items-center justify-center">
                            <div className="size-2 rounded-full bg-[#F72585]"></div>
                          </div>
                          <span className="text-sm text-white/80">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <a 
                      href="https://app.nibiru.fi/faucet" 
                      target="_blank" 
                      rel="noopener"
                      className="inline-flex items-center rounded-lg bg-[#F72585]/10 px-4 py-2 text-sm font-medium text-[#F72585] hover:bg-[#F72585]/20 transition-colors"
                    >
                      Get testnet tokens
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                  <div className="relative order-first md:order-last mb-6 md:mb-0">
                    <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-[#F72585] to-[#B5179E] opacity-30 blur-md"></div>
                    <div className="relative aspect-video overflow-hidden rounded-lg border border-[#252A44] bg-[#080816]/80 p-4">
                      <div className="h-full w-full rounded flex items-center justify-center">
                        <img 
                          src="/images/nibiru-faucet.png" 
                          alt="Nibiru Faucet Interface"
                          onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/600x400/0D0F21/F72585?text=Nibiru+Faucet";
                          }}
                          className="rounded max-w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>
      
      {/* Interactive Use Cases Carousel */}
      <section className="relative z-10 py-16 px-4">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Explore Use Cases</h2>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Discover the many ways Time Capsules can preserve your digital legacy
            </p>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="mx-auto max-w-5xl"
          >
            <CarouselContent>
              {[
                {
                  title: "Personal Growth",
                  description: "Record your goals and aspirations to revisit after your chosen timeline",
                  icon: <Rocket className="h-5 w-5 text-[#4CC9F0]" />,
                  color: "#4CC9F0"
                },
                {
                  title: "Digital Legacy",
                  description: "Leave messages for loved ones to be revealed at significant future dates",
                  icon: <Star className="h-5 w-5 text-[#7209B7]" />,
                  color: "#7209B7"
                },
                {
                  title: "Time-Locked Predictions",
                  description: "Make predictions about the future that can be verified when they unlock",
                  icon: <Lock className="h-5 w-5 text-[#F72585]" />,
                  color: "#F72585"
                },
                {
                  title: "Future Messaging",
                  description: "Send messages to your future self with reminders and insights",
                  icon: <Clock className="h-5 w-5 text-[#4361EE]" />,
                  color: "#4361EE"
                }
              ].map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="group relative rounded-xl border border-white/10 bg-[#0D0F21]/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[color]/30 hover:shadow-lg"
                    style={{ '--color': item.color } as React.CSSProperties}
                  >
                    <div className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-[color]/10 group-hover:bg-[color]/20"
                      style={{ '--color': item.color } as React.CSSProperties}
                    >
                      {item.icon}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-white/70">{item.description}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="flex justify-center mt-6">
              <CarouselPrevious className="static mr-2 h-8 w-8 translate-y-0 bg-[#0D0F21]/80 border-white/10 text-white hover:bg-[#0D0F21] hover:text-[#4CC9F0]" />
              <CarouselNext className="static ml-2 h-8 w-8 translate-y-0 bg-[#0D0F21]/80 border-white/10 text-white hover:bg-[#0D0F21] hover:text-[#4CC9F0]" />
            </div>
          </Carousel>
          
          <div className="mt-16 text-center">
            <Link to="/capsule">
              <Button className="bg-gradient-to-r from-[#4361EE] to-[#7209B7] hover:opacity-90 border-none text-white shadow-lg shadow-[#4361EE]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#7209B7]/30">
                <span>Start Creating Your Capsules</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      
      {/* CTA Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#4361EE]/30 via-[#7209B7]/30 to-[#F72585]/30 backdrop-blur-md"></div>
            
            {/* Content */}
            <div className="relative p-8 md:p-16 text-center flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                  Begin Your Journey Through Time
                </h2>
                <p className="mb-8 mx-auto max-w-2xl text-lg text-white/80">
                  Create your first time capsule today and leave a message for your future self or loved ones
                </p>
                <Link to="/capsule">
                  <Button size="lg" className="h-14 bg-white text-[#0D0F21] hover:bg-white/90 border-none shadow-xl shadow-black/20">
                    <span className="font-medium">Create Your First Capsule</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="relative z-10 mt-auto border-t border-white/10 bg-[#080816]/80 backdrop-blur-md py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-6 w-6 text-[#4CC9F0]" />
                <span className="text-xl font-bold text-white">Time Capsule</span>
              </div>
              <p className="text-sm text-white/60 max-w-xs">
                Preserve your digital legacy with blockchain-secured time capsules that unlock at your chosen future moment.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://docs.nibiru.fi/" target="_blank" rel="noopener" className="text-sm text-white/60 hover:text-[#4CC9F0]">Documentation</a>
                </li>
                <li>
                  <a href="https://nibiru.fi/" target="_blank" rel="noopener" className="text-sm text-white/60 hover:text-[#4CC9F0]">Nibiru Chain</a>
                </li>
                <li>
                  <a href="https://github.com/percobain/time_capsule" target="_blank" rel="noopener" className="text-sm text-white/60 hover:text-[#4CC9F0]">GitHub</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Connect</h3>
              <div className="flex gap-4">
              <a 
                href="https://github.com/percobain/time_capsule" 
                target="_blank" 
                rel="noopener"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Github className="h-5 w-5 text-white" />
              </a>
              <a 
                href="https://x.com/ShreyansTatiya" 
                target="_blank" 
                rel="noopener"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <img src="/X.svg" alt="X Logo" className="h-5 w-5" />
              </a>
              </div>
            </div>
          </div>
          
          <div className="mt-12 border-t border-white/10 pt-6 text-center">
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} Time Capsule. Built on Nibiru Chain. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
