import React, { useEffect, useState } from 'react';

function GreentextList() {
  const [greentexts, setGreentexts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/greentexts")
      .then((res) => res.json())
      .then((data) => setGreentexts(data));
  }, []);

    //Function for formatting Greentexts

  const formatGreentext = (text) => {
    const { content, BlessingItems } = text;
  
    // Split content by line breaks
    const lines = content.split('\n');
  
    // Group lines into sections based on line breaks
    const sections = [];
    let currentSection = [];
  
    lines.forEach((line) => {
      if (line.trim() === '') {
        // Push the current section and reset
        if (currentSection.length > 0) {
          sections.push(currentSection);
          currentSection = [];
        }
      } else {
        currentSection.push(line);
      }
    });
  
    // Push any remaining section
    if (currentSection.length > 0) {
      sections.push(currentSection);
    }
  
    return (
      <div className="whitespace-pre-wrap text-green-200">
        {/* Title */}
        <h3 className="text-xl text-green-300 italic mb-2">
          The Abel Experience™: {text.volume} – <em>{text.title}</em>
        </h3>
  
        {/* Intro Line */}
        <p className="text-green-500">{sections[0]?.[0]}</p>
  
        {/* Main Situations/Events */}
        {sections.slice(1, -3).map((section, index) => (
          <div key={index} className="mt-4">
            {section.map((line, i) => (
              <p key={i} className="text-green-400">{line}</p>
            ))}
          </div>
        ))}
  
        {/* Temu / La Gatilla Comments */}
        {sections.length >= 3 && (
          <div className="mt-4">
            <p className="text-yellow-500">{sections[sections.length - 3][0]}</p>
            <p className="text-yellow-600">{sections[sections.length - 2][0]}</p>
          </div>
        )}
  
        {/* Blessings Section */}
        {BlessingItems && BlessingItems.length > 0 && (
          <div className="mt-4 pl-4 border-l-2 border-green-700">
            <p className="font-semibold text-green-300">Life is x, y and z but at least I have:</p>
            <ul className="list-disc list-inside">
              {BlessingItems.map((bless) => (
                <li key={bless.id} className="mt-2">
                  <strong>{bless.name}</strong>
                  {bless.BlessingComments && bless.BlessingComments.length > 0 && (
                    <ul className="ml-4 list-square">
                      {bless.BlessingComments.map((c) => (
                        <li key={c.id} className="text-sm text-green-500">
                          {c.comment}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  

  return (
    <div className="max-w-2xl mx-auto">
      {greentexts.length === 0 ? (
        <p className="text-center text-lg">No greentexts available yet.</p>
      ) : (
        greentexts.map((text) => (
          <div key={text.id} className="mb-10 p-4 bg-green-900 text-black rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-green-300">{text.title}</h2>
            <p className="text-sm text-green-400 mb-2">
              {text.volume} — {text.date}
            </p>
            {formatGreentext(text)}


            {/* Blessings Section */}
            {text.BlessingItems && text.BlessingItems.length > 0 && (
              <div className="mt-4">
                <p className="font-semibold text-green-300">At least I have:</p>
                <ul className="list-disc list-inside">
                  {text.BlessingItems.map((bless) => (
                    <li key={bless.id} className="mt-2">
                      <strong>{bless.name}</strong>
                      {bless.BlessingComments && bless.BlessingComments.length > 0 && (
                        <ul className="ml-4 list-square">
                          {bless.BlessingComments.map((c) => (
                            <li key={c.id} className="text-sm text-green-500">
                              {c.comment}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default GreentextList;
