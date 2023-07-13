import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { applyStyles, selectStyles } from "./store/styles";
import { useDispatch } from "react-redux";

const WidgetSettings = ({ setIsSetting }) => {
  const [headerBack, setHeaderBack] = useState("");
  const [messageBack, setMessageBack] = useState("");
  const [responseBack, setResponseBack] = useState("");
  const [headerFont, setHeaderFont] = useState("");
  const [chatFont, setChatFont] = useState("");
  // const [launcherBack, setLauncherBack] = useState("");
  const styles = useSelector(selectStyles);
  const dispatch = useDispatch();

  useEffect(() => {
    setHeaderBack(styles.headerBackground);
    setMessageBack(styles.primaryColor);
    setResponseBack(styles.secondaryColor);
    setHeaderFont(styles.titleFont);
    setChatFont(styles.chatFont);
    // setLauncherBack(styles.launcherColor);
  }, [styles]);

  const onHeaderColorChange = (e) => {
    setHeaderBack(e.target.value);
  };
  const onMessageColorChange = (e) => {
    setMessageBack(e.target.value);
  };
  const onResponseColorChange = (e) => {
    setResponseBack(e.target.value);
  };
  const onTitleFontChange = (e) => {
    setHeaderFont(e.target.value + "px");
  };
  const onChatFontChange = (e) => {
    setChatFont(e.target.value + "px");
  };
  // const onLauncherColorChange = (e) => {
  //   setLauncherBack(e.target.value);
  // };
  const onClose = () => {
    setIsSetting(false);
  };
  const onApplyStyle = () => {
    dispatch(
      applyStyles({
        headerBackground: headerBack,
        titleFont: headerFont,
        primaryColor: messageBack,
        secondaryColor: responseBack,
        chatFont: chatFont,
        launcherColor: headerBack,
      })
    );
  };
  return (
    <div className="setting-position" style={{ position: "fixed", bottom: "10px", zIndex: '100' }}>
      <div
        style={{
          border: "2px",
          borderStyle: "solid",
          width: "380px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: "20px",
          borderRadius: "10px",
          borderColor: "#004A4E",
          boxShadow: "4px 6px 6px #888888",
          position: "relative",
        }}
      >
        <h1 className="title-text">Widget Settings</h1>
        <div
          style={{
            border: "1px",
            borderBottomStyle: "solid",
            borderColor: "#004A4E",
            width: "100%",
          }}
        ></div>
        <div style={{ marginTop: "50px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "200px",
            }}
          >
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>Header: </div>
            <input
              type="color"
              name="favcolor"
              value={headerBack}
              onChange={onHeaderColorChange}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "200px",
              marginTop: "20px",
            }}
          >
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>Message:</div>
            <input
              type="color"
              name="favcolor"
              value={messageBack}
              onChange={onMessageColorChange}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "200px",
              marginTop: "20px",
            }}
          >
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>
              Response:
            </div>
            <input
              type="color"
              name="favcolor"
              value={responseBack}
              onChange={onResponseColorChange}
            />
          </div>
          {/* <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "200px",
              marginTop: "20px",
            }}
          >
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>
              Launcher:
            </div>
            <input
              type="color"
              name="favcolor"
              value={launcherBack}
              onChange={onLauncherColorChange}
            />
          </div> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "270px",
              marginTop: "20px",
            }}
          >
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>
              Title font:
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="range"
                min="8"
                max="30"
                value={headerFont.replace("px", "")}
                onChange={onTitleFontChange}
              />
              <div
                style={{
                  marginLeft: "3px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {headerFont}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "270px",
              marginTop: "20px",
            }}
          >
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>
              Chat font:
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="range"
                min="5"
                max="30"
                value={chatFont.replace("px", "")}
                onChange={onChatFontChange}
              />
              <div
                style={{
                  marginLeft: "3px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {chatFont}
              </div>
            </div>
          </div>
        </div>
        <button
          style={{
            width: "100px",
            borderRadius: "7px",
            borderColor: "#004A4E",
            marginTop: "30px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#004A4E",
          }}
          onClick={onApplyStyle}
        >
          Apply
        </button>
        <div
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          <img src="close.png" style={{ width: "30px", height: "30px" }} />
        </div>
      </div>
    </div>
  );
};

export default WidgetSettings;
