import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

export default function BodygraphSelectorMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
    console.log(event.currentTarget.getAttribute('bodygraphID'))
  };

  return (
    <div>
        <Typography variant="body2" color="text.secondary" align="center">

        Current Bodygraph:<br />Jonah Dempcy<br />
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Change Bodygraph
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>&laquo;none&raquo;</MenuItem>
          <MenuItem bodygraphID="jonah-dempcy" onClick={handleClose}>Jonah Dempcy</MenuItem>
          <MenuItem bodygraphID="jenny-v" onClick={handleClose}>Jennifer Vanderheiden</MenuItem>
          <MenuItem bodygraphID="mike-stenbaek" onClick={handleClose}>Mike Stenbæk</MenuItem>
        </Menu>      
      </Typography>
    </div>
  );
}