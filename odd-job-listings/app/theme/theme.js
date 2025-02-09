import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px", // ✅ Round all buttons
          fontFamily: "Courier New, monospace", // ✅ Global font
          fontSize: "1.2rem",
          backgroundColor: "#FF5733", // ✅ Default color
          color: "white",
          padding: "10px 20px",
          "&:hover": {
            backgroundColor: "#E64A19",
          },
        },
      },
    },
  },
});

export default theme;
