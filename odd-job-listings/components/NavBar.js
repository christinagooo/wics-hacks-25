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

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Box
          sx={{ flexGrow: 1}}
        >
          <Button color="inherit" href="/">OddJobs</Button>
        </Box>
  
          {/* <Link href="/create-post"> */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              // onClick={() => router.push("/create-post")}
              href="/create-post"
            > 
              <CreateIcon/>
            </IconButton>
          {/* </Link> */}
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}