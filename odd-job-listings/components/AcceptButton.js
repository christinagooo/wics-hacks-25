"use client"; 

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: "50px", // ✅ Round edges
  fontFamily: "Courier New, monospace", // ✅ Custom font
  fontSize: "1.2rem",
  backgroundColor: "#FF5733", // ✅ Custom color
  color: "white",
  padding: "10px 20px",
  "&:hover": {
    backgroundColor: "#E64A19",
  },
}));

export default function AcceptButton({ onClick, children }) {
  return <CustomButton onClick={onClick}>{children}</CustomButton>;
}

