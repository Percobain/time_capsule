/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Capsule from './pages/capsule';
import { Toaster, toast } from 'sonner';

// Type definition for Leap wallet
declare global {
  interface Window {
    leap?: {
      enable: (chainId: string) => Promise<void>;
      getOfflineSigner: (chainId: string) => any;
    }
  }
}

function App() {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

  // Function to handle successful wallet connection
  const handleConnect = (address: string) => {
    setAddress(address);
    toast.success('Wallet connected successfully', {
      description: `Connected to ${address.slice(0, 8)}...${address.slice(-4)}`,
    });
  };

  return (
    <Router>
      <div className="relative min-h-screen w-full overflow-hidden">
        <Toaster position="top-right" richColors />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<Capsule />} />
          <Route path="/capsule" element={<Capsule />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;