import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  headerBackground: "#004588",
  titleFont: "22px",
  subtitleFont: "14px",
  primaryColor: "#a3eaf7",
  messageColor: "black",
  secondaryColor: "black",
  responseColor: "white",
  chatFont: "12px",
};

export const stylesSlice = createSlice({
  name: "styles",
  initialState,
  reducers: {
    applyStyles: (state, action) => {
      console.log("style from store: ", action.payload);
      Object.entries(action.payload).forEach(([property, value]) => {
        const convertedProperty = property
          .replace(/([A-Z])/g, "-$1")
          .toLowerCase();
        document.documentElement.style.setProperty(
          `--${convertedProperty}`,
          value
        );
      });

      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { applyStyles } = stylesSlice.actions;
export const selectStyles = (state) => state.styles;
export default stylesSlice.reducer;
