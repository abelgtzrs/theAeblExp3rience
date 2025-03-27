import React, { useState, useEffect } from 'react';
import GreentextList from './GreentextList';
import Console from './Console';

function App() {
  const [showConsole, setShowConsole] = useState(false);

  // ✅ Debug Key Detection Directly Here
  useEffect(() => {
    const handleKeyPress = (e) => {
      console.log(`Key pressed in App.js: ${e.code}`);
      if (e.code === 'Backquote' || (e.ctrlKey && e.code === 'Backquote')) {
        console.log('✅ Toggling console from App.js');
        setShowConsole((prev) => !prev); // Toggle console visibility
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 relative p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        The Abel Experience™
      </h1>

      {/* Main Greentext List */}
      <GreentextList />

      {/* Console - Opens with `~` or Ctrl + ~ */}
      {showConsole && <Console onCommand={setShowConsole} />}
    </div>
  );
}

export default App;
