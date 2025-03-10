import { useState} from 'react'
import './App.css'
import { NibiruTxClient, NibiruQuerier, Testnet } from '@nibiruchain/nibijs'

// ESLint disable for specific rules we need to bypass
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

declare global {
  interface Window {
    leap?: {
      enable: (chainId: string) => Promise<void>;
      getOfflineSigner: (chainId: string) => any;
    }
  }
}

function App() {
  const [address, setAddress] = useState('')
  const [message, setMessage] = useState('')
  const [unlockTime, setUnlockTime] = useState('')
  const [storedMessage, setStoredMessage] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [unlockDate, setUnlockDate] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS

  // Connect wallet function
  const connectWallet = async () => {
    try {
      if (!window.leap) {
        alert('Please install Leap wallet extension')
        return
      }

      // Get the testnet configuration
      const testnet = Testnet(2)
      
      // Request connection to Leap wallet
      await window.leap?.enable(testnet.chainId)
      
      // Get the offline signer for the chain
      const offlineSigner = window.leap?.getOfflineSigner(testnet.chainId)
      
      // Ensure offlineSigner exists
      if (!offlineSigner) {
        throw new Error('Failed to get offline signer')
      }
      
      // Get user accounts
      const accounts = await offlineSigner.getAccounts()
      
      // Set the first account's address
      setAddress(accounts[0].address)
      
      console.log('Connected to wallet:', accounts[0].address)
    } catch (error) {
      console.error('Error connecting to wallet:', error)
      alert('Failed to connect wallet: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  // Convert date to UNIX timestamp
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = event.target.value
    const timestamp = Math.floor(new Date(dateValue).getTime() / 1000)
    setUnlockTime(timestamp.toString())
  }


  const storeMessage = async () => {
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }
    if (!message) {
      alert('Please enter a message');
      return;
    }
    if (!unlockTime) {
      alert('Please set an unlock time');
      return;
    }
  
    try {
      setIsLoading(true);
  
      const executeMsg = {
        store_message: {
          message: message,
          unlock_time: parseInt(unlockTime),
        },
      };
  
      const testnet = Testnet(2);
      if (!window.leap) {
        throw new Error('Leap wallet not available');
      }
  
      await window.leap.enable(testnet.chainId);
      const signer = window.leap.getOfflineSigner(testnet.chainId);

      const signingClient = await NibiruTxClient.connectWithSigner(
        testnet.endptTm,
        signer
      );

      const tx = await signingClient.wasmClient.execute(
        address,
        contractAddress,
        executeMsg,
        "auto",
        "Store time capsule message",
        []
      );

      alert("Message stored successfully!");
      setMessage("");
      setUnlockTime("");
    } catch (error) {
      console.error("Error storing message:", error);
      alert("Failed to store message: " + 
        (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsLoading(false);
    }
  };

  // Get stored message
  const getMessage = async () => {
    if (!address) {
      alert('Please connect your wallet first')
      return
    }

    try {
      setIsLoading(true)
      
      // Format query message
      const queryMsg = {
        get_message: {
          owner: address
        }
      }
      
      // Get the testnet configuration
      const testnet = Testnet(2)
      
      // Create querier client
      const querier = await NibiruQuerier.connect(testnet.endptTm)
      
      // Query the contract
      const result = await querier.nibiruExtensions.wasm.queryContractSmart(
        contractAddress,
        queryMsg
      )

      console.log('Query result:', result)
      
      if (!result) {
        throw new Error('Failed to get response from contract')
      }
      
      // Set the retrieved message data
      setStoredMessage(result.message)
      setIsUnlocked(result.is_unlocked)
      
      // Convert UNIX timestamp to readable date
      const date = new Date(result.unlock_time * 1000)
      setUnlockDate(date.toLocaleString())
    } catch (error) {
      console.error('Error retrieving message:', error)
      alert('Failed to retrieve message: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Time Capsule</h1>
        
        {/* Wallet Connection */}
        <div className="mb-6">
          {address ? (
            <div className="flex flex-col">
              <span className="text-sm text-gray-600 mb-2">Connected Address:</span>
              <span className="text-xs bg-gray-100 p-2 rounded break-all">{address}</span>
            </div>
          ) : (
            <button 
              onClick={connectWallet}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Connect Leap Wallet
            </button>
          )}
        </div>

        {/* Store Message Form */}
        <div className="mb-6 border-t pt-4">
          <h2 className="text-xl font-semibold mb-3">Store a Message</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Message:
            </label>
            <textarea 
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" 
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message here..."
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Unlock Date:
            </label>
            <input 
              type="datetime-local" 
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleDateChange}
            />
            {unlockTime && (
              <p className="text-xs text-gray-600 mt-1">
                Timestamp: {unlockTime}
              </p>
            )}
          </div>
          
          <button 
            onClick={storeMessage}
            disabled={isLoading || !address}
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:bg-gray-400"
          >
            {isLoading ? 'Storing...' : 'Store Message'}
          </button>
        </div>

        {/* Retrieve Message */}
        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold mb-3">Retrieve Your Message</h2>
          
          <button 
            onClick={getMessage}
            disabled={isLoading || !address}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 disabled:bg-gray-400 mb-4"
          >
            {isLoading ? 'Retrieving...' : 'Get My Message'}
          </button>
          
          {storedMessage && (
            <div className="mt-4 p-3 bg-gray-50 rounded">
              <p className="font-bold text-sm mb-2">
                Status: {isUnlocked ? 'Unlocked ✅' : 'Still Locked 🔒'}
              </p>
              <p className="text-sm mb-2">Unlock date: {unlockDate}</p>
              <div className="mt-2">
                <p className="font-bold text-sm">Message:</p>
                <p className="p-2 bg-white border rounded mt-1">{storedMessage}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App