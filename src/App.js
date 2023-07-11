import React, { useEffect, useState } from 'react';
import ChatWidget from './ChatWidget';

const styleTemp = {
  hearderBackground: "#004588",
  hearderColor: "#fff",
  titleFont: "20px",
  subtitleFont: "14px",
  messageBackground: "#a3eaf7",
  messageColor: "#000",
  responseBackground: "#000",
  responseColor: "#fff",
  chatFont: "14px",
};

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
        const widgetStyle = await response.json();
        console.log('response: ', widgetStyle)
        setWidgetStyles(widgetStyle);
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
