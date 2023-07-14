import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { applyStyles, selectStyles } from "./store/styles";
import { useDispatch } from "react-redux";
import FontPicker from "font-picker-react";

const iconList = [
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzRweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzQgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ1LjEgKDQzNTA0KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5pY19idXR0b248L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iRGVza3RvcC1IRCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyOTkuMDAwMDAwLCAtNzQ4LjAwMDAwMCkiIGZpbGwtcnVsZT0ibm9uemVybyIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cC0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjg5LjAwMDAwMCwgNzM1LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9ImljX2J1dHRvbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAuMjA2OTMzLCAxMy42MDc4MjUpIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjUuNzg2NTM5OCw3LjM3MDUxODYzIEMyNS43ODY1Mzk4LDguNDA4MDMxMTggMjUuMDQzMjAyNiw5LjAzOTAxMDkgMjQuNTAwNDE2MSw5LjUwMjA1NjQyIEMyNC4yOTQ4NTE3LDkuNjc3NDQzODggMjMuOTEyMjI3MSw5Ljk5NzQ2MjMgMjMuOTEzMjQ4NCwxMC4xMTY5OTc1IEMyMy45MTY5NjIzLDEwLjU4NTg5MjQgMjMuNTQ1OTQzNiwxMC45NjAzNDc5IDIzLjA4NDM5ODYsMTAuOTYwMzQ3OSBDMjMuMDgyMDc3NSwxMC45NjAzNDc5IDIzLjA3OTc1NjMsMTAuOTYwMzQ3OSAyMy4wNzc0MzUxLDEwLjk2MDM0NzkgQzIyLjYxOTEzOTgsMTAuOTYwMzQ3OSAyMi4yNDU3MDcxLDEwLjU5NzQwMjUgMjIuMjQxOTkzMiwxMC4xMzA4NjYyIEMyMi4yMzQ2NTgyLDkuMjExMjg0OTcgMjIuODk1MDgyNiw4LjY2MDU5Mjg5IDIzLjQyNTc5ODksOC4yMDc4MzA5OCBDMjMuODQyMjIsNy44NTI1Mjc1MSAyNC4xMTUyODQ2LDcuNjAyNTEzMTEgMjQuMTE1Mjg0Niw3LjM3MzcyNjM2IEMyNC4xMTUyODQ2LDYuOTEwNTg2NDkgMjMuNzQ0NDUxNiw2LjUzMzc3MjM1IDIzLjI4ODY2MzIsNi41MzM3NzIzNSBDMjIuODMyNjg5LDYuNTMzNzcyMzUgMjIuNDYxNzYzMiw2LjkxMDU4NjQ5IDIyLjQ2MTc2MzIsNy4zNzM3MjYzNiBDMjIuNDYxNzYzMiw3Ljg0MjcxNTYyIDIyLjA4NzY4MDYsOC4yMjI4MzE4NCAyMS42MjYxMzU2LDguMjIyODMxODQgQzIxLjE2NDU5MDYsOC4yMjI4MzE4NCAyMC43OTA1MDgsNy44NDI3MTU2MiAyMC43OTA1MDgsNy4zNzM3MjYzNiBDMjAuNzkwNTA4LDUuOTc0MjExODMgMjEuOTExMDg0Niw0LjgzNTU2MTM4IDIzLjI4ODQ3NzUsNC44MzU1NjEzOCBDMjQuNjY1OTYzMiw0LjgzNTQ2NzAzIDI1Ljc4NjUzOTgsNS45NzA5MDk3NiAyNS43ODY1Mzk4LDcuMzcwNTE4NjMgWiBNMjMuMTAwNTU0MSwxMS43NDQxNjY2IEMyMi42MzkwMDkxLDExLjc0NDE2NjYgMjIuMjgzNDAzMSwxMi4xMjQyODI4IDIyLjI4MzQwMzEsMTIuNTkzMjcyMSBMMjIuMjgzNDAzMSwxMi41OTk3ODE5IEMyMi4yODM0MDMxLDEzLjA2ODc3MTIgMjIuNjM5MTAyLDEzLjQ0NTY3OTcgMjMuMTAwNTU0MSwxMy40NDU2Nzk3IEMyMy41NjIwMDYzLDEzLjQ0NTY3OTcgMjMuOTM2MTgxNywxMy4wNjIyNjE0IDIzLjkzNjE4MTcsMTIuNTkzMjcyMSBDMjMuOTM2MTgxNywxMi4xMjQyODI4IDIzLjU2MjA5OTEsMTEuNzQ0MTY2NiAyMy4xMDA1NTQxLDExLjc0NDE2NjYgWiBNNi4yNTcxNzk2LDE3LjY1ODk0MTEgQzUuNzk1NjM0NjIsMTcuNjU4OTQxMSA1LjQyMTU1MTk5LDE4LjAzOTA1NzMgNS40MjE1NTE5OSwxOC41MDgwNDY2IEM1LjQyMTU1MTk5LDE4Ljk3NzAzNTggNS43OTU2MzQ2MiwxOS4zNTcxNTIgNi4yNTcxNzk2LDE5LjM1NzE1MiBMNi4zMjY4MTUyNCwxOS4zNTcxNTIgQzYuNzg4MzYwMjMsMTkuMzU3MTUyIDcuMTYyNDQyODYsMTguOTc3MDM1OCA3LjE2MjQ0Mjg2LDE4LjUwODA0NjYgQzcuMTYyNDQyODYsMTguMDM5MDU3MyA2Ljc4ODM2MDIzLDE3LjY1ODk0MTEgNi4zMjY4MTUyNCwxNy42NTg5NDExIEw2LjI1NzE3OTYsMTcuNjU4OTQxMSBaIE05LjE2MTM1Njk3LDE3LjY1ODk0MTEgQzguNjk5ODExOTgsMTcuNjU4OTQxMSA4LjMyNTcyOTM1LDE4LjAzOTA1NzMgOC4zMjU3MjkzNSwxOC41MDgwNDY2IEM4LjMyNTcyOTM1LDE4Ljk3NzAzNTggOC42OTk4MTE5OCwxOS4zNTcxNTIgOS4xNjEzNTY5NywxOS4zNTcxNTIgTDkuMjMwODk5NzUsMTkuMzU3MTUyIEM5LjY5MjQ0NDc0LDE5LjM1NzE1MiAxMC4wNjY1Mjc0LDE4Ljk3NzAzNTggMTAuMDY2NTI3NCwxOC41MDgwNDY2IEMxMC4wNjY1Mjc0LDE4LjAzOTA1NzMgOS42OTI0NDQ3NCwxNy42NTg5NDExIDkuMjMwODk5NzUsMTcuNjU4OTQxMSBMOS4xNjEzNTY5NywxNy42NTg5NDExIFogTTMzLjcwMzY0NzMsNC4wOTY5MzM5NSBMMzMuNzAzNjQ3MywxMy42NTQxODIyIEMzMy43MDM2NDczLDE1LjkxNzA0ODMgMzEuOTE4MDAzOSwxNy43NTMyODYxIDI5LjY5MTA1NjMsMTcuNzUzMjg2MSBMMTguODU0MTczMSwxNy43NTMyODYxIEMxOC42NDIyOTUxLDE3Ljc1MzI4NjEgMTguNDY3ODM0NiwxNy43NTIwNTk2IDE4LjMyMTg3ODMsMTcuNzQ4OTQ2MyBDMTguMTY4OTU4NSwxNy43NDU3Mzg1IDE3Ljk5NjgxOTIsMTcuNzQ0NTEyIDE3LjkyOTY5MDQsMTcuNzUyMDU5NiBDMTcuODU5Nzc2MiwxNy43OTkyMzIyIDE3LjY4ODM3OTcsMTcuOTU4NzY5NyAxNy41MjMyMDQsMTguMTEzNDAxMiBDMTcuNDU3NzQ2NSwxOC4xNzQ2MzExIDE3LjM4MzY1NDIsMTguMjQxOTkzNSAxNy4zMDM3MTI1LDE4LjMxNjE0ODcgTDE0LjIzNzcwMTksMjEuMTU1NzQ2MSBDMTMuOTkzMTQxNSwyMS4zODI0NTczIDEzLjYzMTMxNDgsMjEuNDQxMTM5OSAxMy4zMjg0NDYyLDIxLjMwNTQ3MTcgQzEzLjAyNTU3NzYsMjEuMTY5NzA5MiAxMi44MTI5NTY4LDIwLjg2NDk3NDcgMTIuODEyOTU2OCwyMC41Mjg2MzQ2IEwxMi44MTI5NTY4LDExLjUyNjUxMjYgTDQuMDU5MjkzMjcsMTEuNTI2NTEyNiBDMi43NTM2NzE1NCwxMS41MjY1MTI2IDEuNjcxMjU1MjQsMTIuNjEzNjUwNiAxLjY3MTI1NTI0LDEzLjk0MDE0MjEgTDEuNjcxMjU1MjQsMjMuNDk3MzkwNCBDMS42NzEyNTUyNCwyNC44MjM5NzYyIDIuNzUzNzY0MzksMjUuODY2OTYwNyA0LjA1OTI5MzI3LDI1Ljg2Njk2MDcgTDE2LjE2NDE5NDksMjUuODY2OTYwNyBDMTYuMzcyNjM3NiwyNS44NjY5NjA3IDE2LjU2NzYxNzQsMjUuOTY0MjMwNSAxNi43MjE1NTg2LDI2LjEwNzA2ODkgTDE5LjIxOTQzNTIsMjguNDQ3MjAzNiBMMTkuMjE5NDM1MiwyMC4zNzcwMjIxIEMxOS4yMTk0MzUyLDE5LjkwODAzMjggMTkuNTkzNTE3OCwxOS41Mjc5MTY2IDIwLjA1NTA2MjgsMTkuNTI3OTE2NiBDMjAuNTE2NjA3OCwxOS41Mjc5MTY2IDIwLjg5MDY5MDUsMTkuOTA4MDMyOCAyMC44OTA2OTA1LDIwLjM3NzAyMjEgTDIwLjg5MDY5MDUsMzAuMzcxNzQ4NCBDMjAuODkwNjkwNSwzMC43MDgwODg1IDIwLjcwMTI4MTUsMzEuMDA4Mjk0NCAyMC4zOTgzMjAxLDMxLjE0NDA1NyBDMjAuMjg5OTY3LDMxLjE5MjY0NDcgMjAuMTgxMTQ5OCwzMS4yMTE3OTY3IDIwLjA2NzIyNTksMzEuMjExNzk2NyBDMTkuODYyNTg5OSwzMS4yMTE3OTY3IDE5LjY2MDczOTQsMzEuMTI2NDE0NCAxOS41MDM3MzQzLDMwLjk4MDc0NTcgTDE1Ljg0MDI1LDI3LjU2NTA3NzQgTDQuMDU5MjkzMjcsMjcuNTY1MDc3NCBDMS44MzIyNTI4MiwyNy41NjUwNzc0IDAsMjUuNzYwMjU2NSAwLDIzLjQ5NzI5NiBMMCwxMy45NDAxNDIxIEMwLDExLjY3NzI3NiAxLjgzMjI1MjgyLDkuODI4MzAxNjIgNC4wNTkyOTMyNyw5LjgyODMwMTYyIEwxMi44MTI5NTY4LDkuODI4MzAxNjIgTDEyLjgxMjk1NjgsNC4wOTY5MzM5NSBDMTIuODEyOTU2OCwxLjgzMzk3MzUgMTQuNjU5MjI5NiwwLjAxNjQxNjAzOTMgMTYuODg2MjcwMSwwLjAxNjQxNjAzOTMgTDI5LjY5MTE0OTEsMC4wMTY0MTYwMzkzIEMzMS45MTgwMDM5LDAuMDE2NDE2MDM5MyAzMy43MDM2NDczLDEuODMzOTczNSAzMy43MDM2NDczLDQuMDk2OTMzOTUgWiBNMzIuMDMyMzkyLDQuMDk2OTMzOTUgQzMyLjAzMjM5MiwyLjc3MDM0ODE2IDMwLjk5NjQ5MjMsMS43MTQ2MjcgMjkuNjkxMDU2MywxLjcxNDYyNyBMMTYuODg2MjcwMSwxLjcxNDYyNyBDMTUuNTgwNzQxMiwxLjcxNDYyNyAxNC40ODQyMTIsMi43NzAzNDgxNiAxNC40ODQyMTIsNC4wOTY5MzM5NSBMMTQuNDg0MjEyLDEwLjY4NTMzMjEgTDE0LjQ4NDIxMiwxOC42MDQwODk4IEwxNi4xNjQyODc4LDE3LjA2MTI2NTIgQzE2LjI0MjA5NCwxNi45ODkwOTEyIDE2LjMyOTI3NzgsMTYuOTIzMDQ5NyAxNi4zOTI4Nzg0LDE2Ljg2MzQyMzYgQzE3LjE2MDA3NzQsMTYuMTQ1MDgwMyAxNy4zNTYzNTcsMTYuMDMwMjYyNCAxOC4zNTcwNjc1LDE2LjA1MTIwNyBDMTguNDkzNTUzNCwxNi4wNTQxMzE3IDE4LjY1NjEyOTQsMTYuMDU1MTY5NSAxOC44NTQxNzMxLDE2LjA1NTE2OTUgTDI5LjY5MTA1NjMsMTYuMDU1MTY5NSBDMzAuOTk2NDkyMywxNi4wNTUxNjk1IDMyLjAzMjM5MiwxNC45ODA3NjggMzIuMDMyMzkyLDEzLjY1NDI3NjYgTDMyLjAzMjM5Miw0LjA5NjkzMzk1IFoiIGlkPSJTaGFwZSI+PC9wYXRoPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=",
  "chat-1.png",
  "chat-2.png",
  "chat-3.png",
];
const WidgetSettings = ({ setIsSetting, setLauncherIcon }) => {
  const [headerBack, setHeaderBack] = useState("");
  const [messageBack, setMessageBack] = useState("");
  const [responseBack, setResponseBack] = useState("");
  const [headerFont, setHeaderFont] = useState("");
  const [chatFont, setChatFont] = useState("");
  const [activeFontFamily, setFontFamily] = useState();
  const [launcherID, setLauncherID] = useState(0);
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
    setLauncherIcon(iconList[launcherID]);
  };

  return (
    <div
      className="setting-position"
      style={{ position: "fixed", bottom: "10px", zIndex: "100" }}
    >
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
              width: "280px",
              gap: "10px",
            }}
          >
            <div
              style={{ fontSize: "16px", fontWeight: "bold", width: "130px" }}
            >
              Font Family:
            </div>
            <FontPicker
              apiKey="AIzaSyDPHet-7HlLEQLPby3eJIghwS_SFHPzcDs"
              activeFontFamily={activeFontFamily}
              onChange={(nextFont) => {
                setFontFamily(nextFont.family);
              }}
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
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>Header:</div>
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "300px",
              marginTop: "20px",
            }}
          >
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>
              Launcher Icon:
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <div
                style={{
                  backgroundColor: headerBack,
                  borderRadius: "100%",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  border: "1px",
                  border: "solid",
                  borderColor: launcherID === 0 ? "#000" : "#fff",
                }}
                onClick={() => {
                  setLauncherID(0);
                }}
              >
                <img
                  src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzRweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzQgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ1LjEgKDQzNTA0KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5pY19idXR0b248L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iRGVza3RvcC1IRCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyOTkuMDAwMDAwLCAtNzQ4LjAwMDAwMCkiIGZpbGwtcnVsZT0ibm9uemVybyIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cC0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjg5LjAwMDAwMCwgNzM1LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9ImljX2J1dHRvbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAuMjA2OTMzLCAxMy42MDc4MjUpIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjUuNzg2NTM5OCw3LjM3MDUxODYzIEMyNS43ODY1Mzk4LDguNDA4MDMxMTggMjUuMDQzMjAyNiw5LjAzOTAxMDkgMjQuNTAwNDE2MSw5LjUwMjA1NjQyIEMyNC4yOTQ4NTE3LDkuNjc3NDQzODggMjMuOTEyMjI3MSw5Ljk5NzQ2MjMgMjMuOTEzMjQ4NCwxMC4xMTY5OTc1IEMyMy45MTY5NjIzLDEwLjU4NTg5MjQgMjMuNTQ1OTQzNiwxMC45NjAzNDc5IDIzLjA4NDM5ODYsMTAuOTYwMzQ3OSBDMjMuMDgyMDc3NSwxMC45NjAzNDc5IDIzLjA3OTc1NjMsMTAuOTYwMzQ3OSAyMy4wNzc0MzUxLDEwLjk2MDM0NzkgQzIyLjYxOTEzOTgsMTAuOTYwMzQ3OSAyMi4yNDU3MDcxLDEwLjU5NzQwMjUgMjIuMjQxOTkzMiwxMC4xMzA4NjYyIEMyMi4yMzQ2NTgyLDkuMjExMjg0OTcgMjIuODk1MDgyNiw4LjY2MDU5Mjg5IDIzLjQyNTc5ODksOC4yMDc4MzA5OCBDMjMuODQyMjIsNy44NTI1Mjc1MSAyNC4xMTUyODQ2LDcuNjAyNTEzMTEgMjQuMTE1Mjg0Niw3LjM3MzcyNjM2IEMyNC4xMTUyODQ2LDYuOTEwNTg2NDkgMjMuNzQ0NDUxNiw2LjUzMzc3MjM1IDIzLjI4ODY2MzIsNi41MzM3NzIzNSBDMjIuODMyNjg5LDYuNTMzNzcyMzUgMjIuNDYxNzYzMiw2LjkxMDU4NjQ5IDIyLjQ2MTc2MzIsNy4zNzM3MjYzNiBDMjIuNDYxNzYzMiw3Ljg0MjcxNTYyIDIyLjA4NzY4MDYsOC4yMjI4MzE4NCAyMS42MjYxMzU2LDguMjIyODMxODQgQzIxLjE2NDU5MDYsOC4yMjI4MzE4NCAyMC43OTA1MDgsNy44NDI3MTU2MiAyMC43OTA1MDgsNy4zNzM3MjYzNiBDMjAuNzkwNTA4LDUuOTc0MjExODMgMjEuOTExMDg0Niw0LjgzNTU2MTM4IDIzLjI4ODQ3NzUsNC44MzU1NjEzOCBDMjQuNjY1OTYzMiw0LjgzNTQ2NzAzIDI1Ljc4NjUzOTgsNS45NzA5MDk3NiAyNS43ODY1Mzk4LDcuMzcwNTE4NjMgWiBNMjMuMTAwNTU0MSwxMS43NDQxNjY2IEMyMi42MzkwMDkxLDExLjc0NDE2NjYgMjIuMjgzNDAzMSwxMi4xMjQyODI4IDIyLjI4MzQwMzEsMTIuNTkzMjcyMSBMMjIuMjgzNDAzMSwxMi41OTk3ODE5IEMyMi4yODM0MDMxLDEzLjA2ODc3MTIgMjIuNjM5MTAyLDEzLjQ0NTY3OTcgMjMuMTAwNTU0MSwxMy40NDU2Nzk3IEMyMy41NjIwMDYzLDEzLjQ0NTY3OTcgMjMuOTM2MTgxNywxMy4wNjIyNjE0IDIzLjkzNjE4MTcsMTIuNTkzMjcyMSBDMjMuOTM2MTgxNywxMi4xMjQyODI4IDIzLjU2MjA5OTEsMTEuNzQ0MTY2NiAyMy4xMDA1NTQxLDExLjc0NDE2NjYgWiBNNi4yNTcxNzk2LDE3LjY1ODk0MTEgQzUuNzk1NjM0NjIsMTcuNjU4OTQxMSA1LjQyMTU1MTk5LDE4LjAzOTA1NzMgNS40MjE1NTE5OSwxOC41MDgwNDY2IEM1LjQyMTU1MTk5LDE4Ljk3NzAzNTggNS43OTU2MzQ2MiwxOS4zNTcxNTIgNi4yNTcxNzk2LDE5LjM1NzE1MiBMNi4zMjY4MTUyNCwxOS4zNTcxNTIgQzYuNzg4MzYwMjMsMTkuMzU3MTUyIDcuMTYyNDQyODYsMTguOTc3MDM1OCA3LjE2MjQ0Mjg2LDE4LjUwODA0NjYgQzcuMTYyNDQyODYsMTguMDM5MDU3MyA2Ljc4ODM2MDIzLDE3LjY1ODk0MTEgNi4zMjY4MTUyNCwxNy42NTg5NDExIEw2LjI1NzE3OTYsMTcuNjU4OTQxMSBaIE05LjE2MTM1Njk3LDE3LjY1ODk0MTEgQzguNjk5ODExOTgsMTcuNjU4OTQxMSA4LjMyNTcyOTM1LDE4LjAzOTA1NzMgOC4zMjU3MjkzNSwxOC41MDgwNDY2IEM4LjMyNTcyOTM1LDE4Ljk3NzAzNTggOC42OTk4MTE5OCwxOS4zNTcxNTIgOS4xNjEzNTY5NywxOS4zNTcxNTIgTDkuMjMwODk5NzUsMTkuMzU3MTUyIEM5LjY5MjQ0NDc0LDE5LjM1NzE1MiAxMC4wNjY1Mjc0LDE4Ljk3NzAzNTggMTAuMDY2NTI3NCwxOC41MDgwNDY2IEMxMC4wNjY1Mjc0LDE4LjAzOTA1NzMgOS42OTI0NDQ3NCwxNy42NTg5NDExIDkuMjMwODk5NzUsMTcuNjU4OTQxMSBMOS4xNjEzNTY5NywxNy42NTg5NDExIFogTTMzLjcwMzY0NzMsNC4wOTY5MzM5NSBMMzMuNzAzNjQ3MywxMy42NTQxODIyIEMzMy43MDM2NDczLDE1LjkxNzA0ODMgMzEuOTE4MDAzOSwxNy43NTMyODYxIDI5LjY5MTA1NjMsMTcuNzUzMjg2MSBMMTguODU0MTczMSwxNy43NTMyODYxIEMxOC42NDIyOTUxLDE3Ljc1MzI4NjEgMTguNDY3ODM0NiwxNy43NTIwNTk2IDE4LjMyMTg3ODMsMTcuNzQ4OTQ2MyBDMTguMTY4OTU4NSwxNy43NDU3Mzg1IDE3Ljk5NjgxOTIsMTcuNzQ0NTEyIDE3LjkyOTY5MDQsMTcuNzUyMDU5NiBDMTcuODU5Nzc2MiwxNy43OTkyMzIyIDE3LjY4ODM3OTcsMTcuOTU4NzY5NyAxNy41MjMyMDQsMTguMTEzNDAxMiBDMTcuNDU3NzQ2NSwxOC4xNzQ2MzExIDE3LjM4MzY1NDIsMTguMjQxOTkzNSAxNy4zMDM3MTI1LDE4LjMxNjE0ODcgTDE0LjIzNzcwMTksMjEuMTU1NzQ2MSBDMTMuOTkzMTQxNSwyMS4zODI0NTczIDEzLjYzMTMxNDgsMjEuNDQxMTM5OSAxMy4zMjg0NDYyLDIxLjMwNTQ3MTcgQzEzLjAyNTU3NzYsMjEuMTY5NzA5MiAxMi44MTI5NTY4LDIwLjg2NDk3NDcgMTIuODEyOTU2OCwyMC41Mjg2MzQ2IEwxMi44MTI5NTY4LDExLjUyNjUxMjYgTDQuMDU5MjkzMjcsMTEuNTI2NTEyNiBDMi43NTM2NzE1NCwxMS41MjY1MTI2IDEuNjcxMjU1MjQsMTIuNjEzNjUwNiAxLjY3MTI1NTI0LDEzLjk0MDE0MjEgTDEuNjcxMjU1MjQsMjMuNDk3MzkwNCBDMS42NzEyNTUyNCwyNC44MjM5NzYyIDIuNzUzNzY0MzksMjUuODY2OTYwNyA0LjA1OTI5MzI3LDI1Ljg2Njk2MDcgTDE2LjE2NDE5NDksMjUuODY2OTYwNyBDMTYuMzcyNjM3NiwyNS44NjY5NjA3IDE2LjU2NzYxNzQsMjUuOTY0MjMwNSAxNi43MjE1NTg2LDI2LjEwNzA2ODkgTDE5LjIxOTQzNTIsMjguNDQ3MjAzNiBMMTkuMjE5NDM1MiwyMC4zNzcwMjIxIEMxOS4yMTk0MzUyLDE5LjkwODAzMjggMTkuNTkzNTE3OCwxOS41Mjc5MTY2IDIwLjA1NTA2MjgsMTkuNTI3OTE2NiBDMjAuNTE2NjA3OCwxOS41Mjc5MTY2IDIwLjg5MDY5MDUsMTkuOTA4MDMyOCAyMC44OTA2OTA1LDIwLjM3NzAyMjEgTDIwLjg5MDY5MDUsMzAuMzcxNzQ4NCBDMjAuODkwNjkwNSwzMC43MDgwODg1IDIwLjcwMTI4MTUsMzEuMDA4Mjk0NCAyMC4zOTgzMjAxLDMxLjE0NDA1NyBDMjAuMjg5OTY3LDMxLjE5MjY0NDcgMjAuMTgxMTQ5OCwzMS4yMTE3OTY3IDIwLjA2NzIyNTksMzEuMjExNzk2NyBDMTkuODYyNTg5OSwzMS4yMTE3OTY3IDE5LjY2MDczOTQsMzEuMTI2NDE0NCAxOS41MDM3MzQzLDMwLjk4MDc0NTcgTDE1Ljg0MDI1LDI3LjU2NTA3NzQgTDQuMDU5MjkzMjcsMjcuNTY1MDc3NCBDMS44MzIyNTI4MiwyNy41NjUwNzc0IDAsMjUuNzYwMjU2NSAwLDIzLjQ5NzI5NiBMMCwxMy45NDAxNDIxIEMwLDExLjY3NzI3NiAxLjgzMjI1MjgyLDkuODI4MzAxNjIgNC4wNTkyOTMyNyw5LjgyODMwMTYyIEwxMi44MTI5NTY4LDkuODI4MzAxNjIgTDEyLjgxMjk1NjgsNC4wOTY5MzM5NSBDMTIuODEyOTU2OCwxLjgzMzk3MzUgMTQuNjU5MjI5NiwwLjAxNjQxNjAzOTMgMTYuODg2MjcwMSwwLjAxNjQxNjAzOTMgTDI5LjY5MTE0OTEsMC4wMTY0MTYwMzkzIEMzMS45MTgwMDM5LDAuMDE2NDE2MDM5MyAzMy43MDM2NDczLDEuODMzOTczNSAzMy43MDM2NDczLDQuMDk2OTMzOTUgWiBNMzIuMDMyMzkyLDQuMDk2OTMzOTUgQzMyLjAzMjM5MiwyLjc3MDM0ODE2IDMwLjk5NjQ5MjMsMS43MTQ2MjcgMjkuNjkxMDU2MywxLjcxNDYyNyBMMTYuODg2MjcwMSwxLjcxNDYyNyBDMTUuNTgwNzQxMiwxLjcxNDYyNyAxNC40ODQyMTIsMi43NzAzNDgxNiAxNC40ODQyMTIsNC4wOTY5MzM5NSBMMTQuNDg0MjEyLDEwLjY4NTMzMjEgTDE0LjQ4NDIxMiwxOC42MDQwODk4IEwxNi4xNjQyODc4LDE3LjA2MTI2NTIgQzE2LjI0MjA5NCwxNi45ODkwOTEyIDE2LjMyOTI3NzgsMTYuOTIzMDQ5NyAxNi4zOTI4Nzg0LDE2Ljg2MzQyMzYgQzE3LjE2MDA3NzQsMTYuMTQ1MDgwMyAxNy4zNTYzNTcsMTYuMDMwMjYyNCAxOC4zNTcwNjc1LDE2LjA1MTIwNyBDMTguNDkzNTUzNCwxNi4wNTQxMzE3IDE4LjY1NjEyOTQsMTYuMDU1MTY5NSAxOC44NTQxNzMxLDE2LjA1NTE2OTUgTDI5LjY5MTA1NjMsMTYuMDU1MTY5NSBDMzAuOTk2NDkyMywxNi4wNTUxNjk1IDMyLjAzMjM5MiwxNC45ODA3NjggMzIuMDMyMzkyLDEzLjY1NDI3NjYgTDMyLjAzMjM5Miw0LjA5NjkzMzk1IFoiIGlkPSJTaGFwZSI+PC9wYXRoPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
              <div
                style={{
                  backgroundColor: headerBack,
                  borderRadius: "100%",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  border: "1px",
                  border: "solid",
                  borderColor: launcherID === 1 ? "#000" : "#fff",
                }}
                onClick={() => {
                  setLauncherID(1);
                }}
              >
                <img
                  src="chat-1.png"
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
              <div
                style={{
                  backgroundColor: headerBack,
                  borderRadius: "100%",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  border: "1px",
                  border: "solid",
                  borderColor: launcherID === 2 ? "#000" : "#fff",
                }}
                onClick={() => {
                  setLauncherID(2);
                }}
              >
                <img
                  src="chat-2.png"
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
              <div
                style={{
                  backgroundColor: headerBack,
                  borderRadius: "100%",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  border: "1px",
                  border: "solid",
                  borderColor: launcherID === 3 ? "#000" : "#fff",
                }}
                onClick={() => {
                  setLauncherID(3);
                }}
              >
                <img
                  src="chat-3.png"
                  style={{ width: "20px", height: "20px" }}
                />
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
