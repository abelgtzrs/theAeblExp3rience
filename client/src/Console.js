import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import GreentextForm from './GreentextForm';

function Console({ onCommand }) {
  const [command, setCommand] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Handle command submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Command entered: ${command}`); // ✅ Check if command is correct
  
    // Check for valid command
    if (command.trim() === 'addGreenTxt') {
      console.log('✅ addGreenTxt detected!');
      setShowForm(true); // Show form window
      console.log('showForm:', showForm); // ✅ Check if showForm is true
    } else {
      alert('Unknown command! Try "addGreenTxt" to open form.');
    }
  
    setCommand(''); // Clear command input
  };
  

  // Keybind to open console with `~` or Ctrl + ~
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Backquote' || (e.ctrlKey && e.code === 'Backquote')) {
        onCommand((prev) => !prev); // Toggle console visibility
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onCommand]);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black text-green-400 p-4 border-t border-green-700">
      {/* Console Input */}
      <form onSubmit={handleSubmit} className="flex">
        <span className="text-green-600 mr-2">&gt;_</span>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="w-full bg-black text-green-300 outline-none"
          placeholder="Type a command..."
        />
      </form>

      {/* RND - Draggable Form Window */}
      {showForm && (
        <Rnd
          default={{
            x: 100,
            y: 100,
            width: 500,
            height: 400,
          }}
          dragHandleClassName="drag-handle"
          enableResizing={false}
          className="bg-green-900 shadow-xl rounded-lg border-2 border-red-500"
        >
          <div className="drag-handle bg-green-700 text-white px-4 py-2 cursor-move">
            Greentext Form
            <button
              className="float-right text-red-400"
              onClick={() => setShowForm(false)}
            >
              ✖
            </button>
          </div>
          <div className="p-4">
            <GreentextForm />
            <p className="text-yellow-500">✅ Window loaded successfully</p>
          </div>
        </Rnd>
      )}

      {/* Fallback window */}
      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-green-900 p-4 border-2 border-green-500 rounded-lg z-50">
          <GreentextForm />
          <p className="text-yellow-500">✅ Fallback window loaded successfully</p>
        </div>
      )}
    </div>
  );
}

export default Console;
