import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  headerBackground: "#123456",
  primaryColor: "#333333",
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
    // applyStyles: (state) => {
    //   console.log("style from store: ", state);
    //   Object.entries(state).forEach(([property, value]) => {
    //     const convertedProperty = property
    //       .replace(/([A-Z])/g, "-$1")
    //       .toLowerCase();
    //     document.documentElement.style.setProperty(
    //       `--${convertedProperty}`,
    //       value
    //     );
    //   });
    // },
  },
});

export const { applyStyles } = stylesSlice.actions;
export const selectStyles = (state) => state.styles;
export default stylesSlice.reducer;
