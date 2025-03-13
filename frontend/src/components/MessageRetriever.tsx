import { useState, useEffect } from 'react';
import { NibiruQuerier, Testnet } from '@nibiruchain/nibijs';
import { Clock, Lock, Unlock, MessageSquare, Hourglass, Calendar, Timer } from 'lucide-react';
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Spinner } from "./ui/spinner";
import { toast } from 'sonner';

interface MessageRetrieverProps {
  address: string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  contractAddress: string;
}

const MessageRetriever = ({ 
  address, 
  isLoading, 
  setIsLoading,
  contractAddress 
}: MessageRetrieverProps) => {
  const [storedMessage, setStoredMessage] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlockDate, setUnlockDate] = useState('');
  const [unlockTimestamp, setUnlockTimestamp] = useState<number>(0);
  const [hasMessage, setHasMessage] = useState(false);
  const [isRetrieving, setIsRetrieving] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null);

  // Get stored message
  const getMessage = async () => {
    if (!address) {
      toast.error('Wallet not connected', {
        description: 'Please connect your wallet first'
      });
      return;
    }

    setIsRetrieving(true);
    
    try {
      setIsLoading(true);
      
      // Format query message
      const queryMsg = {
        get_message: {
          owner: address
        }
      };
      
      // Get the testnet configuration
      const testnet = Testnet(2);
      
      // Create querier client
      const querier = await NibiruQuerier.connect(testnet.endptTm);
      
      // Query the contract
      const result = await querier.nibiruExtensions.wasm.queryContractSmart(
        contractAddress,
        queryMsg
      );

      console.log('Query result:', result);
      
      if (!result) {
        throw new Error('Failed to get response from contract');
      }
      
      // Set the retrieved message data
      setStoredMessage(result.message);
      setIsUnlocked(result.is_unlocked);
      setUnlockTimestamp(result.unlock_time);
      setHasMessage(true);
      
      // Convert UNIX timestamp to readable date
      const date = new Date(result.unlock_time * 1000);
      setUnlockDate(date.toLocaleString());
      
      toast.success('Message retrieved', {
        description: result.is_unlocked ? 
          'Your time capsule has been unlocked!' : 
          'Your time capsule is still locked'
      });
    } catch (error) {
      console.error('Error retrieving message:', error);
      toast.error('Failed to retrieve message', {
        description: error instanceof Error ? error.message : 'Unknown error'
      });
      setHasMessage(false);
    } finally {
      setIsLoading(false);
      setIsRetrieving(false);
    }
  };

  const calculateTimeRemaining = () => {
    if (!unlockTimestamp) return null;
    
    const now = Math.floor(Date.now() / 1000);
    const remaining = unlockTimestamp - now;
    
    if (remaining <= 0) return "Unlocked now";
    
    const days = Math.floor(remaining / 86400);
    const hours = Math.floor((remaining % 86400) / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);
    const seconds = Math.floor(remaining % 60);
    
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  useEffect(() => {
    if (!unlockTimestamp || isUnlocked) return;
    
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [unlockTimestamp, isUnlocked]);

  useEffect(() => {
    if (unlockTimestamp) {
      setTimeRemaining(calculateTimeRemaining());
    }
  }, [unlockTimestamp]);

  return (
    <div className="w-full">
      <button 
        onClick={getMessage}
        disabled={isLoading || !address || isRetrieving}
        className="w-full bg-gradient-to-r from-[#F72585] to-[#7209B7] text-white py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-[#F72585]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#252A44] disabled:from-[#252A44] disabled:to-[#252A44] focus:outline-none focus:ring-2 focus:ring-[#F72585]/50"
      >
        {isRetrieving ? (
          <div className="flex items-center justify-center gap-2">
            <Spinner className="h-4 w-4 text-white" />
            <span>Retrieving Capsule...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Retrieve My Capsule</span>
          </div>
        )}
      </button>
      
      {hasMessage && (
        <div className={cn(
          "mt-5 rounded-lg border backdrop-blur-sm p-4 transition-all duration-500 animate-fade-in",
          isUnlocked 
            ? "border-[#4CC9F0]/30 bg-gradient-to-br from-[#4CC9F0]/10 to-transparent" 
            : "border-[#F72585]/30 bg-gradient-to-br from-[#F72585]/10 to-transparent"
        )}>
          {/* Status Badge & Time Display Row */}
          <div className="flex items-center justify-between mb-4">
            <div className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium shadow-sm",
              isUnlocked 
                ? "bg-[#4CC9F0]/20 text-[#4CC9F0] shadow-[#4CC9F0]/10" 
                : "bg-[#F72585]/20 text-[#F72585] shadow-[#F72585]/10"
            )}>
              {isUnlocked ? (
                <>
                  <Unlock className="h-3 w-3" />
                  <span className="animate-pulse-slow">Unlocked</span>
                </>
              ) : (
                <>
                  <Lock className="h-3 w-3" />
                  <span>Locked</span>
                </>
              )}
            </div>
            
            {/* Time display */}
            <div className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs",
              isUnlocked 
                ? "text-[#4CC9F0]/70"
                : "text-[#F72585]/70"
            )}>
              <Clock className="h-3 w-3" />
              {isUnlocked ? 'Unlocked on:' : 'Unlocks on:'}
            </div>
          </div>
          
          {/* Unlock date info */}
          <div className="mb-5 bg-[#0D0F21]/70 p-3 rounded-lg border border-[#252A44]/50">
            <div className="flex items-start">
              <div className="p-2 mr-3 bg-[#181B2E] rounded-md">
                <Calendar className={cn(
                  "h-5 w-5",
                  isUnlocked ? "text-[#4CC9F0]" : "text-[#F72585]"
                )} />
              </div>
              
              <div className="flex-1">
                <div className="text-sm text-white font-medium">
                  {unlockTimestamp && format(new Date(unlockTimestamp * 1000), "PPP 'at' p")}
                </div>
                
                {!isUnlocked && timeRemaining && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className={cn(
                      "flex items-center gap-1 text-xs font-medium rounded-full px-2 py-0.5",
                      "bg-[#181B2E] text-[#4CC9F0]"
                    )}>
                      <Timer className="h-3 w-3" />
                      <span className="tabular-nums">{timeRemaining}</span>
                    </div>
                    <div className="h-1.5 w-1.5 bg-[#F72585] rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Message content with styling based on lock status */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm text-white/90">
                <MessageSquare className="h-3.5 w-3.5" />
                <h3 className="font-medium">Your Message</h3>
              </div>
              
              {!isUnlocked && (
                <div className="flex items-center gap-1 text-xs text-[#F72585]/70">
                  <Lock className="h-3 w-3" />
                  <span>Time-locked</span>
                </div>
              )}
            </div>
            
            <div className={cn(
              "rounded-lg border p-4 text-sm transition-all duration-500",
              isUnlocked
                ? "border-[#4CC9F0]/20 bg-[#181B2E] text-white"
                : "border-[#F72585]/20 bg-[#181B2E]/70 text-white/50"
            )}>
              {isUnlocked ? (
                <div className="relative">
                  <div className="absolute -top-1 -right-1 h-6 w-6 bg-[#4CC9F0]/20 rounded-full animate-ping-slow opacity-75"></div>
                  <p className="whitespace-pre-wrap break-words">{storedMessage}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 px-4">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-[#F72585]/20 rounded-full animate-ping opacity-75"></div>
                    <Lock className="h-7 w-7 text-[#F72585] relative z-10" />
                  </div>
                  <p className="text-center opacity-70">This message is locked until the specified time.</p>
                  <div className="mt-4 text-center">
                    <Hourglass className="h-4 w-4 text-[#F72585]/50 mx-auto animate-flip-slow" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageRetriever;