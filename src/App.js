import React, { useEffect, useState } from "react";
import ChatWidget from "./ChatWidget";

function App() {
  const [widgetStyles, setWidgetStyles] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchWidgetStyles = async () => {
      const url =
        "https://parchedrotatingcommand.alexli81.repl.co/get-widget-styles";
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentUrl: window.location.href,
          }),
        });
        const widgetStyle = await response.json();
        // const widgetStyle = {
        //   headerBackground: '#abcdef',
        //   primaryColor: '#123456'
        // }
        setIsLoaded(true);     
        setWidgetStyles(widgetStyle);   
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (!isLoaded) {
      fetchWidgetStyles();
    }
  }, [widgetStyles, isLoaded]);

  return (
    <div className="App">
      {/* Your other app components */}
      <ChatWidget widgetStyles={widgetStyles} />
    </div>
  );
}

export default App;
