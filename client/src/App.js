import React, { useEffect, useState } from 'react';


function App() {
  const [apiMessage, setApiMessage] = useState('');

  useEffect(() => {
    fetch("http://localhost:5000")
    .then((res) => res.text())
    .then((data) => setApiMessage(data));
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col justify-center items-center p-4">
    <h1 className="text-3xl font-bold mb-4">The Abel Experience™</h1>
    <div className="bg-green-900 text-black p-4 rounded-xl shadow-xl">
      <p className="text-lg">API Response:</p>
      <pre className="text-green-200">{apiMessage}</pre>
    </div>
  </div>
  );
}


export default App;
