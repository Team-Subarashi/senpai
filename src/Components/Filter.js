import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { category as categoryAtom } from "../atoms";
import { Grid, Button } from "@material-ui/core";
import { Menu, Popover, MenuItem } from "@mui/material";

export default function Filter() {
  const [menuState, toggleMenuState] = useState(false);
  const [category, setCategory] = useRecoilState(categoryAtom);

  return (
    <Grid
      container
      xs={12}
      style={{ height: "inherit", backgroundColor: "lightblue" }}
    >
      <Button
        id="categoryButton"
        style={{ backgroundColor: "purple", color: "white", marginLeft: "3vw" }}
        onClick={() => toggleMenuState(!menuState)}
      >
        Category
      </Button>
      <Menu
        open={menuState}
        anchorEl={document.getElementById("categoryButton")}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        // style={{ marginTop: "-75.5vh" }}
      >
        <MenuItem
          onClick={(e) => {
            console.log(e.target.innerText);
            setCategory(e.target.innerText);
            toggleMenuState(!menuState);
          }}
        >
          All
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            console.log(e.target.innerText);
            setCategory(e.target.innerText);
            toggleMenuState(!menuState);
          }}
        >
          Pottery
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            console.log(e.target.innerText);
            setCategory(e.target.innerText);
            toggleMenuState(!menuState);
          }}
        >
          Zumba
        </MenuItem>
      </Menu>
    </Grid>
  );
}
