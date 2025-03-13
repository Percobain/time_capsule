import { useState } from 'react';
import { NibiruQuerier, Testnet } from '@nibiruchain/nibijs';
import { Clock, Lock, Unlock, MessageSquare } from 'lucide-react';
import { cn } from "@/lib/utils";
import { format } from "date-fns";

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

  // Get stored message
  const getMessage = async () => {
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

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
    } catch (error) {
      console.error('Error retrieving message:', error);
      alert('Failed to retrieve message: ' + (error instanceof Error ? error.message : 'Unknown error'));
      setHasMessage(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate time remaining until unlock
  const getTimeRemaining = () => {
    if (!unlockTimestamp) return null;
    
    const now = Math.floor(Date.now() / 1000);
    const remaining = unlockTimestamp - now;
    
    if (remaining <= 0) return "Unlocked now";
    
    const days = Math.floor(remaining / 86400);
    const hours = Math.floor((remaining % 86400) / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);
    
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m remaining`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    } else {
      return `${minutes}m remaining`;
    }
  };

  return (
    <div className="w-full">
      <button 
        onClick={getMessage}
        disabled={isLoading || !address}
        className="w-full bg-gradient-to-r from-[#F72585] to-[#7209B7] text-white py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-[#F72585]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#252A44] disabled:from-[#252A44] disabled:to-[#252A44] focus:outline-none focus:ring-2 focus:ring-[#F72585]/50"
      >
        {isLoading ? 'Retrieving...' : 'Get My Message'}
      </button>
      
      {hasMessage && (
        <div className={cn(
          "mt-5 rounded-lg border p-4 transition-all duration-300",
          isUnlocked 
            ? "border-[#4CC9F0]/30 bg-[#4CC9F0]/5" 
            : "border-[#F72585]/30 bg-[#F72585]/5"
        )}>
          {/* Status Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
              isUnlocked 
                ? "bg-[#4CC9F0]/20 text-[#4CC9F0]" 
                : "bg-[#F72585]/20 text-[#F72585]"
            )}>
              {isUnlocked ? (
                <>
                  <Unlock className="h-3 w-3" />
                  Unlocked
                </>
              ) : (
                <>
                  <Lock className="h-3 w-3" />
                  Locked
                </>
              )}
            </div>
            
            {/* Time display */}
            <div className="flex items-center gap-1 text-xs text-white/70">
              <Clock className="h-3 w-3" />
              {isUnlocked ? 'Unlocked on:' : 'Unlocks on:'}
            </div>
          </div>
          
          {/* Unlock date info */}
          <div className="mb-4">
            <div className="text-sm text-white font-medium mb-1">
              {unlockTimestamp && format(new Date(unlockTimestamp * 1000), "PPP 'at' p")}
            </div>
            
            {!isUnlocked && (
              <div className="text-xs text-[#4CC9F0]">
                {getTimeRemaining()}
              </div>
            )}
          </div>
          
          {/* Message content with styling based on lock status */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-white/90">
              <MessageSquare className="h-3.5 w-3.5" />
              <h3 className="font-medium">Your Message</h3>
            </div>
            
            <div className={cn(
              "rounded-lg border p-3 text-sm",
              isUnlocked
                ? "border-[#4CC9F0]/20 bg-[#181B2E] text-white"
                : "border-[#F72585]/20 bg-[#181B2E]/50 text-white/50"
            )}>
              {isUnlocked ? (
                <p>{storedMessage}</p>
              ) : (
                <div className="flex flex-col items-center justify-center py-4">
                  <Lock className="h-5 w-5 text-[#F72585] mb-2" />
                  <p className="text-center">{storedMessage}</p>
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