import React from 'react';
import * as M from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function Header() {
  return (
    <div>
      <M.AppBar position="static">
        <M.Toolbar>
          <M.Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            <M.Link href="/"color="inherit">
            Blog
            </M.Link>
          </M.Typography>
          <M.Link href="/create">
            <M.IconButton aria-label="open drawer" edge="end">
              <AddIcon />
              <M.Typography noWrap sx={{ flexGrow: 1 }}>
              Novo Post
              </M.Typography>
            </M.IconButton>
          </M.Link>                    
        </M.Toolbar>
      </M.AppBar>
    </div>
  );
}