import React from 'react';
import GreentextList from './GreentextList'; // Import the new component

function App() {
  return (
    <div className="min-h-screen bg-black text-green-400 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">The Abel Experience™</h1>
      <GreentextList /> {/* Render the list of greentexts */}
    </div>
  );
}

export default App;
