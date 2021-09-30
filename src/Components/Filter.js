import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import { Menu, Popover, MenuItem } from "@mui/material";

export default function Filter() {
  const [menuState, toggleMenuState] = useState(false);

  return (
    <Grid container xs={12} style={{ height: "inherit" }}>
      <Button
        style={{ backgroundColor: "purple", color: "white" }}
        onClick={() => toggleMenuState(!menuState)}
      >
        Category
      </Button>
      <Menu open={menuState} style={{ marginTop: "-75.5vh" }}>
        <MenuItem
          onClick={(e) => {
            console.log(e.target.innerText);
            toggleMenuState(!menuState);
          }}
        >
          All
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            console.log(e.target.innerText);
            toggleMenuState(!menuState);
          }}
        >
          Pottery
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            console.log(e.target.innerText);
            toggleMenuState(!menuState);
          }}
        >
          Zumba
        </MenuItem>
      </Menu>
    </Grid>
  );
}
