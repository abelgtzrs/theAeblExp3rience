import React, { useState } from 'react';

function GreentextForm() {
  const [inputText, setInputText] = useState('');
  const [parsedData, setParsedData] = useState(null);

  // Function to parse greentext format
  const parseGreentext = (text) => {
    const lines = text.split('\n');
    let volume = '';
    let title = '';
    let body = [];
    let lifeStatement = '';
    let blessings = [];
  
    const blessingRegex = /"?(.+?)"?\s?\((.*?)\)/g; // Modified to accept blessings without quotes
    const lifeRegex = /life is (.+) but at least I have:/i;
  
    // Detect Title & Volume from the first line
    if (lines[0].startsWith('The Abel Experience™: Volume')) {
      const titleMatch = lines[0].match(/Volume (\d+) – (.+)/);
      if (titleMatch) {
        volume = `Volume ${titleMatch[1]}`; // Correct volume
        title = titleMatch[2].trim();
      }
    }
  
    // Parse the content section
    let parsingBlessings = false;
    lines.slice(1).forEach((line) => {
      if (lifeRegex.test(line)) {
        lifeStatement = line.match(lifeRegex)[1].trim();
        parsingBlessings = true;
      } else if (parsingBlessings) {
        // Parse blessings section
        let match;
        while ((match = blessingRegex.exec(line)) !== null) {
          blessings.push({
            name: match[1].trim(),
            comment: match[2].trim(),
          });
        }
      } else {
        // Add ">" to each line and format properly
        if (line.trim() !== '') {
          body.push(`> ${line.trim()}`);
        }
      }
    });
  
    // Join the body with line breaks
    const formattedBody = body.join('\n');
  
    // Generate formatted titles
    const generatedTitle = `The Abel Experience™ Volume ${volume.split(' ')[1]}: ${title}`;
    const finalLine = `The Abel Experience™: ${title} Edition`;
  
    return {
      volume,
      title,
      body: formattedBody,
      lifeStatement,
      blessings,
      generatedTitle,
      finalLine,
    };
  };
  
  

  // Handle input change and parse automatically
  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    const parsed = parseGreentext(text);
    setParsedData(parsed);
  };

  // Submit greentext (send to backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!parsedData) {
      alert('Please enter a valid greentext.');
      return;
    }

    const payload = {
        title: parsedData.title,
        content: `${parsedData.body}\n\n${parsedData.finalLine}`, // Append final line to body
        volume: parsedData.volume,
        blessings: parsedData.blessings.map((b) => ({
          name: b.name,
          comment: b.comment,
        })),
      };
      
      

    try {
      const res = await fetch('http://localhost:5000/api/greentexts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Greentext added successfully!');
        setInputText('');
        setParsedData(null);
      } else {
        alert('Failed to add greentext.');
      }
    } catch (err) {
      console.error('Error submitting greentext:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-black text-green-400">
      <h2 className="text-2xl font-bold mb-4">Add a New Greentext</h2>
      <form onSubmit={handleSubmit}>
        {/* Input Area */}
        <textarea
          className="w-full h-40 bg-green-900 text-green-300 p-3 rounded-lg"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Paste your greentext here..."
        ></textarea>

    {/* Preview Section */}
    {/* Preview Section */}
    {parsedData && (
    <div className="mt-6 bg-green-800 p-4 rounded-lg">
        <h3 className="text-xl text-green-300 mb-2">
        {parsedData.generatedTitle}
        </h3>
        <p className="text-green-400">Volume: {parsedData.volume}</p>

        {/* Body Section with Proper Line Breaks */}
        <pre className="whitespace-pre-wrap text-green-400">
        {parsedData.body}
        </pre>

        {/* Life is X, Y, Z but at least I have */}
        {parsedData.lifeStatement && (
        <p className="text-yellow-500 mt-4">
            Life is {parsedData.lifeStatement}, but at least I have:
        </p>
        )}

        {/* Blessings Section */}
        {parsedData.blessings.length > 0 && (
        <ul className="list-disc list-inside text-green-500 mt-2">
            {parsedData.blessings.map((bless, index) => (
            <li key={index}>
                <strong>{bless.name}</strong> – {bless.comment}
            </li>
            ))}
        </ul>
        )}

        {/* Final Line */}
        <p className="mt-6 text-green-300 italic">{parsedData.finalLine}</p>
    </div>
    )}



        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          Submit Greentext
        </button>
      </form>
    </div>
  );
}

export default GreentextForm;
