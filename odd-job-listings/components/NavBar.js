"use client"; 


import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Link} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import ChecklistIcon from '@mui/icons-material/Checklist';
import HomeIcon from '@mui/icons-material/Home';

export default function NavBar() {
  return (
    <Box sx={{ 
      flexGrow: 1,
    }}>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(145deg, #eb4a26 0%, #c5ff96 100%)", // ✅ Cool gradient
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // ✅ Subtle shadow
          padding: "8px 16px", // ✅ Spacing for cleaner look
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        

          <IconButton
            size="large"
            color="inherit"
            href="/"
            sx={{
              mx: 1, // ✅ Equal spacing
              transition: "transform 0.2s ease-in-out",
              "&:hover": { transform: "scale(1.2)", color: "#ffdd57" }, // ✅ Icon animation
            }}
          > 
            <HomeIcon/>
          </IconButton>
          <Box
            sx={{ flexGrow: 1}}
          >
            {/* <Button color="inherit" href="/">Yeehire</Button> */}
          </Box>

          <IconButton
            size="large"
            color="inherit"
            href="/create-post"
            sx={{
              mx: 1, // ✅ Equal spacing
              transition: "transform 0.2s ease-in-out",
              "&:hover": { transform: "scale(1.2)", color: "#ffdd57" }, // ✅ Icon animation
            }}
          > 
            <CreateIcon/>
          </IconButton>

          <IconButton
            size="large"
            color="inherit"
            href="/listings"
            sx={{
              mx: 1,
              transition: "transform 0.2s ease-in-out",
              "&:hover": { transform: "scale(1.2)", color: "#ffdd57" },
            }}
          > 
            <ChecklistIcon/>
          </IconButton>

          <Button
            variant="outlined"
            color="inherit"
            sx={{
              borderColor: "white",
              fontWeight: "bold",
              textTransform: "uppercase",
              padding: "6px 16px",
              borderRadius: "8px",
              ml: 2,
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                color: "#eb4a26",
                borderColor: "#eb4a26",
                transform: "scale(1.2)",
              },
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}