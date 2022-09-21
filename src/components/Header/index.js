import React from 'react';
import { Link } from "react-router-dom";
import * as M from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function Header() {
    return (
        <div>
            <M.AppBar position="fixed">
                <M.Toolbar>
                    <M.Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
                      {/* <Link to=""> */}
                      Blog
                      {/* </Link>                       */}
                    </M.Typography>
                    <M.IconButton
                      color="inherit"
                      aria-label="open drawer"
                      edge="end"
                      // onClick={handleDrawerOpen}
                      // sx={{ ...(open && { display: 'none' }) }}
                    >
                      <AddIcon />
                      <M.Typography noWrap sx={{ flexGrow: 1 }}>
                      Novo Post
                      </M.Typography>
                    </M.IconButton>
                </M.Toolbar>
            </M.AppBar>
        </div>
    );
}