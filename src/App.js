import React, { useEffect, useState } from 'react';
import ChatWidget from './ChatWidget';

function App() {
  const [widgetStyles, setWidgetStyles] = useState(null);

  useEffect(() => {
    const fetchWidgetStyles = async () => {
      const url = 'https://parchedrotatingcommand.alexli81.repl.co/get-widget-styles';
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currentUrl: window.location.href,
          }),
        });
        const widgetStyles = await response.json();
        setWidgetStyles(widgetStyles);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchWidgetStyles();
  }, []);

  return (
    <div className="App">
      {/* Your other app components */}
      <ChatWidget widgetStyles={widgetStyles} />
    </div>
  );
}

export default App;
