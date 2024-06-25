import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import React from 'react';

export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="a"
          sx={{ flexGrow: 1, fontWeight: 400, letterSpacing: -1 }}
          href="/"
        >
          Tasks
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
