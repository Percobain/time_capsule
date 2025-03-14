import { useState, useEffect, useRef } from 'react';
import { format } from "date-fns";
import WalletConnect from '../components/WalletConnect';
import MessageStore from '../components/MessageStore';
import MessageRetriever from '../components/MessageRetriever';
import { Toaster, toast } from 'sonner';
import { AuroraText } from '../components/magicui/aurora-text';
import { InteractiveGridPattern } from '../components/magicui/interactive-grid-pattern';
import { 
  Activity, ArrowUpRight, Target, CheckCircle2, CalendarIcon, Clock, 
  Shield, Lock, Zap, Sparkles, Timer, Fingerprint, Radio, Rocket, 
  Scan, Database, Orbit, CircleDashed
} from "lucide-react";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { cn } from "@/lib/utils";

export default function Capsule() {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("00:00");
  const [timestamp, setTimestamp] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string>('');
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    // Remove hard-coded values - track actual data or loading states
    const [networkStatus] = useState("connecting");
    const [chainStatus] = useState("");
    const [chainName] = useState("");

  // Function to handle successful wallet connection
  const handleConnect = (address: string) => {
    setAddress(address);
    toast.success('Wallet connected successfully', {
      description: `Connected to ${address.slice(0, 8)}...${address.slice(-4)}`,
    });
  };

  // Combine date and time into a single timestamp
  const getCombinedDateTime = () => {
    if (!date) return null;
    
    const [hours, minutes] = time.split(':').map(Number);
    const dateTime = new Date(date);
    dateTime.setHours(hours, minutes, 0, 0);
    
    return dateTime;
  };
  
  // Calculate Unix timestamp
  const getUnixTimestamp = () => {
    const dateTime = getCombinedDateTime();
    return dateTime ? Math.floor(dateTime.getTime() / 1000) : null;
  };

  // Update timestamp when date or time changes
  useEffect(() => {
    const newTimestamp = getUnixTimestamp();
    setTimestamp(newTimestamp ? newTimestamp.toString() : undefined);
  }, [date, time]);

  // Update current time every second for the live clock
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Update mouse position for interactive grid
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Helper function to check if a date is in the past
  const isPastDate = (date: Date) => {
    // Create today's date at midnight for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Create comparison date at midnight
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    
    // Return true if date is before today (allow today's date)
    return compareDate < today;
  };

  return (
    <div className="h-screen overflow-hidden bg-[#080816] text-white relative">
      {/* Interactive Grid Background - Updated to be more responsive */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle ${100}px at ${mousePosition.x}px ${mousePosition.y}px, rgba(76, 201, 240, 0.1), transparent)`,
          transition: 'background 0.1s'
        }}
      >
        <InteractiveGridPattern 
          width={40} 
          height={40} 
          squares={[48, 36]} 
          className="border-none opacity-20" 
          squaresClassName="stroke-[#4CC9F0]/10 hover:fill-[#4CC9F0]/5 hover:stroke-[#4CC9F0]/30"
        />
        
        {/* Enhanced decorative elements */}
        <div className="absolute top-40 left-[10%] w-32 h-32 bg-[#F72585]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-[15%] w-48 h-48 bg-[#4361EE]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-[30%] right-[20%] w-24 h-24 bg-[#4CC9F0]/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-[40%] left-[15%] w-36 h-36 bg-[#7209B7]/5 rounded-full blur-3xl"></div>
        
        {/* Orbital rings with particles */}
        <div className="absolute left-[5%] top-[30%] w-16 h-16 rounded-full border border-[#4CC9F0]/20 animate-[spin_20s_linear_infinite]">
          <div className="absolute -left-1 -top-1 w-2 h-2 bg-[#4CC9F0] rounded-full"></div>
        </div>
        <div className="absolute right-[10%] top-[20%] w-24 h-24 rounded-full border border-[#F72585]/20 animate-[spin_30s_linear_infinite_reverse]">
          <div className="absolute -right-1 -top-1 w-2 h-2 bg-[#F72585] rounded-full"></div>
        </div>
        <div className="absolute left-[25%] bottom-[15%] w-32 h-32 rounded-full border border-[#4361EE]/10 animate-[spin_40s_linear_infinite]">
          <div className="absolute left-1/2 -top-1 w-1.5 h-1.5 bg-[#4361EE] rounded-full"></div>
          <div className="absolute -left-1 top-1/2 w-1.5 h-1.5 bg-[#4361EE] rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <Toaster position="top-right" richColors />
      
      {/* Header Bar */}
      <header className="h-16 border-b border-[#1A1D35] px-6 flex items-center bg-[#0B0C1B]/80 backdrop-blur-sm shadow-md relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-[#0D0F21] shadow-inner shadow-[#000]/20 relative">
            <Activity className="w-4 h-4 text-[#4CC9F0]" />
            <div className="absolute inset-0 rounded-full border border-[#4CC9F0]/30 animate-ping opacity-20"></div>
          </div>
          <h1 className="text-lg font-bold text-white mb-0 tracking-tight">
            <AuroraText 
              colors={["#00FFFF", "#4CC9F0", "#9D4EDD", "#F72585"]} 
              speed={0.8}
            >
              Time Capsule
            </AuroraText>
          </h1>
        </div>
        <p className="ml-4 text-xs text-[#E2E8F0] hidden sm:block">
          Create and retrieve your time-locked intentions
        </p>
        <div className="ml-auto flex items-center gap-4">
          {/* Live cyberpunk-style clock */}
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#181B2E]/50 border border-[#252A44] text-xs font-mono">
            <Timer className="h-3 w-3 text-[#4CC9F0]" />
            <span className="text-[#4CC9F0]">{format(currentTime, "HH:mm:ss")}</span>
          </div>

          {address && (
            <button
              type="button"
              onClick={() => window.location.href = '/'}
              className="inline-flex items-center gap-1.5 text-xs font-medium
              text-white hover:text-[#4CC9F0]
              transition-colors duration-200 cursor:pointer"
            >
              Return to Home
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </header>
      
      {/* Main Content */}
      <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row relative z-10">
        {/* Left Side - Wallet Connect */}
        <div className="w-full md:w-1/3 p-4 border-r border-[#1A1D35]/50">
          <div className="h-full flex flex-col">
            <WalletConnect 
              address={address} 
              onConnect={handleConnect} 
              isLoading={isLoading} 
              setIsLoading={setIsLoading}
            />
            
            {!address && (
              <div className="mt-6 bg-[#0D0F21]/70 border border-[#252A44] rounded-xl p-4 backdrop-blur-sm">
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Shield className="h-3.5 w-3.5 text-[#4CC9F0]" />
                  Getting Started
                </h3>
                <ol className="text-xs text-white/70 space-y-3 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#4CC9F0]/40 bg-[#0D0F21]">
                      <span className="text-xs text-[#4CC9F0]">1</span>
                    </div>
                    <span>Connect your Leap wallet to access the blockchain</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#4CC9F0]/40 bg-[#0D0F21]">
                      <span className="text-xs text-[#4CC9F0]">2</span>
                    </div>
                    <span>Create a time capsule with your private message</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#4CC9F0]/40 bg-[#0D0F21]">
                      <span className="text-xs text-[#4CC9F0]">3</span>
                    </div>
                    <span>Set a future date when it can be unlocked</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#4CC9F0]/40 bg-[#0D0F21]">
                      <span className="text-xs text-[#4CC9F0]">4</span>
                    </div>
                    <span>Retrieve your message after the unlock date</span>
                  </li>
                </ol>
                
                {/* Decorative element */}
                <div className="mt-6 border-t border-dashed border-[#252A44] pt-4">
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <Fingerprint className="h-3.5 w-3.5 text-[#4CC9F0]/50" />
                    <span>Secured by Nibiru blockchain</span>
                  </div>
                </div>
              </div>
            )}
            
            
            {/* Enhanced technical stats and visualizations when connected */}
            {address && (
              <div className="mt-auto">
                
                {/* Data visualization - Time metrics with real current time only */}
                <div className="p-3 rounded-xl bg-[#0D0F21]/70 border border-[#252A44] backdrop-blur-sm">
                  <h4 className="text-xs font-medium mb-3 flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-[#F72585]" />
                    <span>Temporal Matrix</span>
                    <div className="h-px flex-1 bg-[#252A44]/50"></div>
                  </h4>
                  
                  {/* Futuristic timeline visualization */}
                  <div className="relative h-16 mb-2">
                    <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#4CC9F0]/50 to-transparent"></div>
                    
                    {/* Past marker */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#7209B7]"></div>
                      <span className="text-[10px] mt-1 text-[#7209B7]">PAST</span>
                    </div>
                    
                    {/* Now marker */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-[#F72585] animate-pulse"></div>
                      <span className="text-[10px] mt-1 text-[#F72585]">NOW</span>
                    </div>
                    
                    {/* Future marker */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4CC9F0]"></div>
                      <span className="text-[10px] mt-1 text-[#4CC9F0]">FUTURE</span>
                    </div>
                    
                    {/* Current time indicator - this is real data */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0">
                      <div className="text-[10px] font-mono text-white/70">
                        {format(currentTime, "yyyy.MM.dd HH:mm:ss")}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Futuristic Digital Clock design */}
                  <div className="flex flex-col space-y-2">
                    <div className="p-3 rounded-lg bg-[#0A0D1C]/90 border border-[#252A44]/70 shadow-inner shadow-[#000]/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <div className="w-2 h-2 rounded-full bg-[#4CC9F0] animate-pulse"></div>
                            <div className="absolute inset-0 rounded-full bg-[#4CC9F0]/30 animate-ping"></div>
                          </div>
                          <span className="text-xs font-medium text-[#4CC9F0]">CHRONOSYNC</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-[#090B19] border border-[#252A44]/50">
                          <span className="w-1 h-1 rounded-full bg-[#F72585] animate-pulse"></span>
                          <span className="text-[10px] font-mono text-[#F72585]">ACTIVE</span>
                        </div>
                      </div>
                      
                      {/* Upgraded futuristic clock display */}
                      <div className="relative flex justify-center py-2 bg-gradient-to-r from-[#090B19] via-[#0D0F21] to-[#090B19] rounded-lg border border-[#181B2E] mb-2">
                        {/* Glowing background effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#F72585]/5 via-[#4361EE]/5 to-[#4CC9F0]/5"></div>
                        
                        {/* Hours */}
                        <div className="flex flex-col items-center">
                          <span className="text-[8px] font-medium text-[#4CC9F0]/70 uppercase mb-0.5">Hour</span>
                          <div className="flex">
                            <div className="relative mx-0.5 w-8 h-10 overflow-hidden">
                              <div className="absolute inset-0 bg-[#040508] rounded backdrop-blur-sm border border-[#252A44]/80 shadow-inner shadow-black/40"></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-mono text-xl font-bold bg-gradient-to-b from-[#4CC9F0] to-[#4361EE] bg-clip-text text-transparent">{format(currentTime, "HH").charAt(0)}</span>
                              </div>
                              <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/40 to-transparent"></div>
                              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
                            </div>
                            <div className="relative mx-0.5 w-8 h-10 overflow-hidden">
                              <div className="absolute inset-0 bg-[#040508] rounded backdrop-blur-sm border border-[#252A44]/80 shadow-inner shadow-black/40"></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-mono text-xl font-bold bg-gradient-to-b from-[#4CC9F0] to-[#4361EE] bg-clip-text text-transparent">{format(currentTime, "HH").charAt(1)}</span>
                              </div>
                              <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/40 to-transparent"></div>
                              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Separator */}
                        <div className="flex flex-col justify-center px-1 mx-1">
                          <div className="flex flex-col h-10 justify-center">
                            <div className="w-1.5 h-1.5 bg-[#F72585] rounded-full mb-2 animate-pulse"></div>
                            <div className="w-1.5 h-1.5 bg-[#F72585] rounded-full animate-pulse"></div>
                          </div>
                        </div>
                        
                        {/* Minutes */}
                        <div className="flex flex-col items-center">
                          <span className="text-[8px] font-medium text-[#F72585]/70 uppercase mb-0.5">Min</span>
                          <div className="flex">
                            <div className="relative mx-0.5 w-8 h-10 overflow-hidden">
                              <div className="absolute inset-0 bg-[#040508] rounded backdrop-blur-sm border border-[#252A44]/80 shadow-inner shadow-black/40"></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-mono text-xl font-bold bg-gradient-to-b from-[#F72585] to-[#7209B7] bg-clip-text text-transparent">{format(currentTime, "mm").charAt(0)}</span>
                              </div>
                              <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/40 to-transparent"></div>
                              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
                            </div>
                            <div className="relative mx-0.5 w-8 h-10 overflow-hidden">
                              <div className="absolute inset-0 bg-[#040508] rounded backdrop-blur-sm border border-[#252A44]/80 shadow-inner shadow-black/40"></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-mono text-xl font-bold bg-gradient-to-b from-[#F72585] to-[#7209B7] bg-clip-text text-transparent">{format(currentTime, "mm").charAt(1)}</span>
                              </div>
                              <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/40 to-transparent"></div>
                              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Separator */}
                        <div className="flex flex-col justify-center px-1 mx-1">
                          <div className="flex flex-col h-10 justify-center">
                            <div className="w-1.5 h-1.5 bg-[#4361EE] rounded-full mb-2 animate-pulse"></div>
                            <div className="w-1.5 h-1.5 bg-[#4361EE] rounded-full animate-pulse"></div>
                          </div>
                        </div>
                        
                        {/* Seconds */}
                        <div className="flex flex-col items-center">
                          <span className="text-[8px] font-medium text-[#4361EE]/70 uppercase mb-0.5">Sec</span>
                          <div className="flex">
                            <div className="relative mx-0.5 w-8 h-10 overflow-hidden">
                              <div className="absolute inset-0 bg-[#040508] rounded backdrop-blur-sm border border-[#252A44]/80 shadow-inner shadow-black/40"></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-mono text-xl font-bold bg-gradient-to-b from-[#4361EE] to-[#3A0CA3] bg-clip-text text-transparent">{format(currentTime, "ss").charAt(0)}</span>
                              </div>
                              <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/40 to-transparent"></div>
                              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
                            </div>
                            <div className="relative mx-0.5 w-8 h-10 overflow-hidden">
                              <div className="absolute inset-0 bg-[#040508] rounded backdrop-blur-sm border border-[#252A44]/80 shadow-inner shadow-black/40"></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-mono text-xl font-bold bg-gradient-to-b from-[#4361EE] to-[#3A0CA3] bg-clip-text text-transparent">{format(currentTime, "ss").charAt(1)}</span>
                              </div>
                              <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/40 to-transparent"></div>
                              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Milliseconds */}
                        <div className="flex flex-col ml-2 justify-center">
                          <div className="relative w-12 h-6 overflow-hidden bg-[#040508] rounded-lg border border-[#252A44]/50">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="font-mono text-sm bg-gradient-to-r from-[#4CC9F0] via-[#7209B7] to-[#F72585] animate-gradient-x bg-clip-text text-transparent font-bold tracking-tight">
                                {format(currentTime, "SSS").substring(0, 3)}
                              </span>
                            </div>
                            <div className="absolute inset-0 bg-[#040508]/10 backdrop-blur-sm"></div>
                            <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/40 to-transparent"></div>
                            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/40 to-transparent"></div>
                          </div>
                        </div>
                        
                        {/* Energy scan lines */}
                        <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-[#4CC9F0]/50 to-transparent animate-scanning-line"></div>
                        <div className="absolute left-0 bottom-0 w-full h-px bg-gradient-to-r from-transparent via-[#F72585]/50 to-transparent animate-scanning-line-reverse"></div>
                      </div>
                      
                      {/* Enhanced bottom indicators */}
                      <div className="flex justify-between items-center mt-1 px-1">
                        <div className="flex items-center gap-1.5 bg-[#060810] py-0.5 px-1.5 rounded border border-[#252A44]/30">
                          <span className="text-[10px] font-mono text-[#4CC9F0]/70">UTC{format(currentTime, "xxx")}</span>
                        </div>
                        
                        {/* Day indicator with futuristic design */}
                        <div className="flex items-center gap-1.5 py-0.5 px-1.5 rounded bg-[#060810] border border-[#252A44]/30">
                          <span className="w-1 h-1 bg-[#F72585] rounded-full"></span>
                          <span className="text-[10px] font-mono text-[#F72585]/70">{format(currentTime, "dd")}.</span>
                          <span className="text-[10px] font-mono text-[#4361EE]/70">{format(currentTime, "MMM").toUpperCase()}</span>
                        </div>
                      </div>
                      
                      {/* Decorative progress bar */}
                      <div className="mt-1.5 h-0.5 w-full bg-[#060810] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#F72585] via-[#4361EE] to-[#4CC9F0]" 
                          style={{ 
                            width: `${(parseInt(format(currentTime, "s")) / 60 * 100) + (parseInt(format(currentTime, "SSS")) / 1000 * (100/60))}%`, 
                            transition: "width 0.1s linear" 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Middle - Create New Capsule */}
        {address && (
          <div className="w-full md:w-1/3 p-4 h-full overflow-auto border-r border-[#1A1D35]/50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="flex items-center gap-2 text-xs font-medium text-white">
                <Target className="w-3.5 h-3.5 text-[#4CC9F0]" />
                Create New Capsule
              </h4>
              
              {/* Interactive capsule stats badge */}
              <div className="px-2 py-0.5 bg-[#181B2E] rounded-full text-xs border border-[#252A44] flex items-center gap-1.5">
                <Zap className="h-3 w-3 text-[#F72585]" />
                <span className="text-[#4CC9F0]">Capsules</span>
              </div>
            </div>
            
            <div className="bg-[#0D0F21]/80 p-4 rounded-xl border border-[#4361EE]/20 backdrop-blur-sm">
              {/* Enhanced decorative capsule icon */}
              <div className="mb-4 flex justify-center">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4361EE]/20 to-[#7209B7]/20 flex items-center justify-center">
                    <Lock className="h-6 w-6 text-[#4CC9F0]" />
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-[#4CC9F0]/20 animate-ping opacity-20"></div>
                  <div className="absolute -right-1 -bottom-1 w-5 h-5 bg-[#181B2E] rounded-full flex items-center justify-center shadow-lg">
                    <Rocket className="h-3 w-3 text-[#F72585]" />
                  </div>
                </div>
              </div>
              
              {/* Message Input - Enhanced */}
              <div className="mb-4">
                <label className="text-sm font-medium text-white mb-1.5 flex items-center gap-2">
                  <span>Your Message</span>
                  <div className="h-px flex-1 bg-[#252A44]/50"></div>
                </label>
                <div className="relative">
                  <textarea 
                    className="w-full px-3 py-2 bg-[#181B2E] border border-[#252A44] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-[#4CC9F0] focus:border-[#4CC9F0]"
                    rows={4}
                    placeholder="Enter your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    ref={messageRef}
                  />
                  {/* Futuristic active indicator */}
                  <div className="absolute -right-1 -top-1">
                    <div className="w-2 h-2 rounded-full bg-[#4CC9F0] animate-pulse"></div>
                  </div>
                </div>
                
                {/* Character counter */}
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-white/50 font-mono">
                    {message.length} characters
                  </span>
                </div>
              </div>

              {/* Date Time Picker - Enhanced and improved */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-1.5 flex items-center gap-2">
                  <span>Unlock Date & Time</span>
                  <div className="h-px flex-1 bg-[#252A44]/50"></div>
                </label>
                <div className="flex gap-2">
                  {/* Date Picker using Calendar and Popover */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className={cn(
                          "flex-1 flex items-center justify-between rounded-md border border-[#252A44] bg-[#181B2E] px-3 py-2 text-sm text-white shadow-sm hover:bg-[#1F223A] focus:outline-none focus:ring-1 focus:ring-[#4CC9F0]",
                          !date && "text-[#E2E8F0]"
                        )}
                      >
                        {date ? format(date, "MMM dd, yyyy") : "Select date"}
                        <CalendarIcon className="ml-2 h-4 w-4 text-[#4CC9F0]" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-[#0D0F21] border border-[#252A44] shadow-lg shadow-black/20" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={isPastDate}
                        initialFocus
                        className="bg-[#0D0F21] text-white"
                      />
                    </PopoverContent>
                  </Popover>

                  {/* Time Picker */}
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-24 rounded-md border border-[#252A44] bg-[#181B2E] px-3 py-2 text-sm text-white shadow-sm focus:outline-none focus:ring-1 focus:ring-[#4CC9F0]"
                  />
                </div>
                
                {/* Show selected date and time with visual indication */}
                {date && (
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3 text-[#4CC9F0]" />
                      <p className="text-xs text-white/70">
                        Unlocks: {format(getCombinedDateTime() || new Date(), "PPP p")}
                      </p>
                    </div>
                    
                    {/* Timestamp display */}
                    <span className="text-[10px] text-white/40 font-mono">
                      {timestamp}
                    </span>
                  </div>
                )}
                
                {/* Visual time indicator */}
                {date && (
                  <div className="mt-3 relative h-1 w-full bg-[#181B2E] rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F72585]/50 via-[#7209B7]/50 to-[#4CC9F0]/50"></div>
                    <div className="absolute h-1.5 w-1.5 bg-white rounded-full transform -translate-y-1/4" style={{ 
                      left: "50%",
                      boxShadow: "0 0 5px #FFF, 0 0 10px #FFF"
                    }}></div>
                  </div>
                )}
              </div>

              {/* Store Message Button - Enhanced */}
              <div className="relative">
                <MessageStore 
                  address={address} 
                  isLoading={isLoading} 
                  setIsLoading={setIsLoading} 
                  contractAddress={contractAddress}
                  timestamp={timestamp}
                  hideTimePicker={true}
                  hideMessageInput={true}
                  onlyShowButton={true}
                  message={message}
                />
                
                {/* Futuristic button effects */}
                <div className="absolute inset-x-0 -bottom-4 h-px bg-gradient-to-r from-transparent via-[#4CC9F0]/30 to-transparent"></div>
              </div>
              
              {/* Security note */}
              <div className="mt-5 text-xs text-white/40 flex items-center gap-2 justify-center">
                <Shield className="h-3.5 w-3.5" />
                <span>Manifest your Energy</span>
              </div>
            </div>
            
          </div>
        )}
        
        {/* Right Side - Retrieve Capsules */}
        {address && (
          <div className="w-full md:w-1/3 p-4 h-full overflow-auto">
            <div className="flex items-center justify-between mb-3">
              <h4 className="flex items-center gap-2 text-xs font-medium text-white">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F72585]" />
                Retrieve Capsules
              </h4>
              
              {/* Small decorative elements */}
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F72585] animate-pulse"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#7209B7]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#4361EE]"></div>
              </div>
            </div>
            
            <div className="bg-[#0D0F21]/80 p-4 rounded-xl border border-[#F72585]/20 backdrop-blur-sm">
              <MessageRetriever 
                address={address} 
                isLoading={isLoading} 
                setIsLoading={setIsLoading} 
                contractAddress={contractAddress}
              />
            </div>
            
            {/* Additional futuristic visualization */}
            <div className="mb-4 p-3 rounded-xl bg-[#0D0F21]/70 border border-[#252A44] backdrop-blur-sm">
                  <h4 className="text-xs font-medium mb-3 flex items-center gap-2">
                    <Radio className="h-3.5 w-3.5 text-[#4CC9F0]" />
                    <span>System Status</span>
                    <div className="h-px flex-1 bg-[#252A44]/50"></div>
                    <span className="text-[10px] text-[#4CC9F0] px-1.5 py-0.5 rounded-full bg-[#181B2E] border border-[#252A44]/50">LIVE</span>
                  </h4>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {/* Network status - real connection status */}
                    <div className="p-2 rounded-lg bg-[#181B2E]/70 border border-[#252A44]/50 flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#0D0F21] mb-1">
                        <Scan className="h-3.5 w-3.5 text-[#4CC9F0]" />
                      </div>
                      <span className="text-[10px] text-white/70">Network</span>
                      <span className="text-xs font-medium text-[#4CC9F0] uppercase">Live</span>
                      <div className="mt-1 flex space-x-1">
                        <div className="w-1 h-2 bg-[#4CC9F0] animate-pulse"></div>
                        <div className="w-1 h-3 bg-[#4CC9F0] animate-pulse delay-100"></div>
                        <div className="w-1 h-1.5 bg-[#4CC9F0] animate-pulse delay-200"></div>
                        <div className="w-1 h-2.5 bg-[#4CC9F0] animate-pulse delay-300"></div>
                      </div>
                    </div>
                    
                    {/* Chain status - actual connection information */}
                    <div className="p-2 rounded-lg bg-[#181B2E]/70 border border-[#252A44]/50 flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#0D0F21] mb-1">
                        <Database className="h-3.5 w-3.5 text-[#F72585]" />
                      </div>
                      <span className="text-[10px] text-white/70">Chain</span>
                      <span className="text-xs font-medium text-[#F72585] uppercase">Nibiru</span>
                      <div className="mt-1 w-4 h-4 relative">
                        <div className="absolute inset-0 rounded-full border border-[#F72585]/30 animate-ping opacity-50"></div>
                        <div className="absolute inset-1 rounded-full bg-[#F72585]/20"></div>
                      </div>
                    </div>
                    
                    {/* Wallet status - actual wallet connection */}
                    <div className="p-2 rounded-lg bg-[#181B2E]/70 border border-[#252A44]/50 flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#0D0F21] mb-1">
                        <Orbit className="h-3.5 w-3.5 text-[#4361EE]" />
                      </div>
                      <span className="text-[10px] text-white/70">Wallet</span>
                      <span className="text-xs font-medium text-[#4361EE]">CONNECTED</span>
                      <div className="mt-1 relative">
                        <CircleDashed className="h-3.5 w-3.5 text-[#4361EE]/50 animate-spin" />
                      </div>
                    </div>
                  </div>
                </div>
            
            <div className="mt-4 relative h-40 rounded-xl bg-[#0D0F21]/40 border border-[#252A44]/50 backdrop-blur-sm overflow-hidden">
              {/* Animated orbital paths */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 rounded-full border border-[#4CC9F0]/10 animate-[spin_20s_linear_infinite]"></div>
                <div className="absolute inset-[10%] rounded-full border border-[#F72585]/10 animate-[spin_15s_linear_infinite_reverse]"></div>
                <div className="absolute inset-[25%] rounded-full border border-[#7209B7]/10 animate-[spin_25s_linear_infinite]"></div>
                <div className="absolute inset-[40%] rounded-full border border-[#4361EE]/10 animate-[spin_10s_linear_infinite_reverse]"></div>
              </div>
              
              {/* Central node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-3 h-3 bg-[#4CC9F0] rounded-full animate-pulse shadow-[0_0_8px_#4CC9F0]"></div>
                <div className="absolute inset-0 rounded-full bg-[#4CC9F0]/30 animate-ping"></div>
              </div>
              
              {/* Animated network nodes with improved effects */}
              <div className="absolute inset-0">
                {/* Node 1 with orbit animation */}
                <div className="absolute top-[20%] left-[30%] animate-[orbit_15s_linear_infinite]">
                  <div className="w-1.5 h-1.5 bg-[#F72585] rounded-full shadow-[0_0_5px_#F72585]"></div>
                  <div className="absolute inset-0 rounded-full bg-[#F72585]/30 animate-ping opacity-70"></div>
                </div>
                
                {/* Node 2 with reverse orbit */}
                <div className="absolute top-[70%] left-[65%] animate-[orbit_20s_linear_infinite_reverse]">
                  <div className="w-2 h-2 bg-[#7209B7] rounded-full shadow-[0_0_6px_#7209B7]"></div>
                  <div className="absolute inset-0 rounded-full bg-[#7209B7]/30 animate-ping opacity-70"></div>
                </div>
                
                {/* Node 3 with faster animation */}
                <div className="absolute top-[25%] left-[75%] animate-[orbit_10s_linear_infinite]">
                  <div className="w-1 h-1 bg-[#4361EE] rounded-full shadow-[0_0_4px_#4361EE]"></div>
                  <div className="absolute inset-0 rounded-full bg-[#4361EE]/30 animate-ping opacity-70"></div>
                </div>
                
                {/* Node 4 */}
                <div className="absolute top-[85%] left-[25%] animate-[orbit_12s_linear_infinite_reverse]">
                  <div className="w-1.5 h-1.5 bg-[#4CC9F0] rounded-full shadow-[0_0_5px_#4CC9F0]"></div>
                  <div className="absolute inset-0 rounded-full bg-[#4CC9F0]/30 animate-ping opacity-70"></div>
                </div>
                
                {/* Node 5 */}
                <div className="absolute top-[40%] left-[15%] animate-[orbit_18s_linear_infinite]">
                  <div className="w-1 h-1 bg-[#F72585] rounded-full shadow-[0_0_4px_#F72585]"></div>
                </div>
                
                {/* Node 6 */}
                <div className="absolute top-[60%] left-[85%] animate-[orbit_14s_linear_infinite]">
                  <div className="w-1 h-1 bg-[#4CC9F0] rounded-full shadow-[0_0_4px_#4CC9F0]"></div>
                </div>
                
                {/* Animated laser-like connection lines */}
                <div className="absolute top-[20%] left-[30%] w-[40px] h-[1px] bg-gradient-to-r from-[#F72585] to-transparent origin-left rotate-[30deg] animate-pulse"></div>
                <div className="absolute top-[70%] left-[65%] w-[50px] h-[1px] bg-gradient-to-r from-[#7209B7] to-transparent origin-left rotate-[-60deg] animate-pulse"></div>
                <div className="absolute top-[25%] left-[75%] w-[60px] h-[1px] bg-gradient-to-r from-[#4361EE] to-transparent origin-left rotate-[140deg] animate-pulse"></div>
                <div className="absolute top-[85%] left-[25%] w-[70px] h-[1px] bg-gradient-to-r from-[#4CC9F0] to-transparent origin-left rotate-[-20deg] animate-pulse"></div>
                
                {/* Dynamic data transmission effects */}
                <div className="absolute top-[20%] left-[30%] w-2 h-1 bg-white/80 rounded-full animate-[dataTransfer_3s_ease-in_infinite] opacity-70"></div>
                <div className="absolute top-[70%] left-[65%] w-2 h-1 bg-white/80 rounded-full animate-[dataTransfer_5s_ease-out_infinite] opacity-70 delay-700"></div>
                <div className="absolute top-[40%] left-[15%] w-2 h-1 bg-white/80 rounded-full animate-[dataTransfer_4s_ease-in-out_infinite] opacity-70 delay-1500"></div>
              </div>
              
              {/* Reactive glow based on time */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#F72585]/5 via-transparent to-[#4CC9F0]/5"></div>
              
              {/* Network status indicator */}
              <div className="absolute bottom-2 right-2 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#4CC9F0] animate-pulse"></div>
                <span className="text-[8px] text-[#4CC9F0] font-mono">NETWORK ACTIVE</span>
              </div>
              
              {/* Add time-based node that moves along path */}
              <div 
                className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]"
                style={{
                  left: `${20 + Math.sin(Date.now() / 1000) * 15}%`,
                  top: `${50 + Math.cos(Date.now() / 1000) * 15}%`,
                  transition: 'left 0.5s, top 0.5s'
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
