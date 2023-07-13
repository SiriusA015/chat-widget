import React, { useEffect, useState } from "react";
import ChatWidget from "./ChatWidget";
import WidgetSettings from "./WidgetSettings";
import { useDispatch } from "react-redux";
import { applyStyles } from "./store/styles";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const [isSetting, setIsSetting] = useState(true);

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
        const styleData = await response.json();
        setIsLoaded(true);
        console.log("style from db: ", styleData);
        dispatch(applyStyles(styleData));
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (!isLoaded) {
      fetchWidgetStyles();
    }
  }, [isLoaded]);

  return (
    <div className="App">
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          setIsSetting(true);
        }}
      >
        <img src="setting.png" style={{ width: "50px", height: "50px" }} />
      </div>
      {isSetting && <WidgetSettings setIsSetting={setIsSetting} />}
      <ChatWidget />
    </div>
  );
}

export default App;
