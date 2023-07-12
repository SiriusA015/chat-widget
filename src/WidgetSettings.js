import { useState, useEffect } from "react";

const WidgetSettings = ({ widgetStyles, setWidgetStyles }) => {
  const [styles, setStyles] = useState({});
  useEffect(() => {
    setStyles(widgetStyles);
  }, [widgetStyles]);

  const handleColorChange = (event) => {
    setStyles((prevStyles) => ({ ...prevStyles, color: event.target.value }));
  };
  const handleFontSizeChange = (event) => {
    setStyles((prevStyles) => ({
      ...prevStyles,
      fontSize: event.target.value,
    }));
  };
  return (
    <div>
      <h1>Widget Settings</h1>
      <div>{styles.headerBackground}</div>
    </div>
  );
};

export default WidgetSettings;
