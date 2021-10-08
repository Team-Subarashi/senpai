import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { category as categoryAtom } from "../atoms";
import { Grid, Button } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/Popover";

export default function Filter() {
  const [menuState, toggleMenuState] = useState(false);
  const [category, setCategory] = useRecoilState(categoryAtom);

  const clickHandler = (e) => {
    document.getElementById("categoryButton").innerText = e.target.innerText;
    setCategory(e.target.innerText);
    toggleMenuState(!menuState);
  };

  return (
    <Grid
      container
      xs={12}
      style={{ height: "inherit", backgroundColor: "lightblue" }}
    >
      <Button
        id="categoryButton"
        style={{
          backgroundColor: "purple",
          color: "white",
          marginLeft: "3vw",
          marginTop: "1vh",
          marginBottom: "1vh",
        }}
        onClick={() => toggleMenuState(!menuState)}
      >
        {category}
      </Button>
      <Menu
        open={menuState}
        anchorEl={document.getElementById("categoryButton")}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <MenuItem onClick={(e) => clickHandler(e)}>All</MenuItem>
        <MenuItem onClick={(e) => clickHandler(e)}>D3</MenuItem>
        <MenuItem onClick={(e) => clickHandler(e)}>WebGL</MenuItem>
        <MenuItem onClick={(e) => clickHandler(e)}>Canvas</MenuItem>
        <MenuItem onClick={(e) => clickHandler(e)}>OpenGL</MenuItem>
        <MenuItem onClick={(e) => clickHandler(e)}>WebGPU</MenuItem>
        <MenuItem onClick={(e) => clickHandler(e)}>three.js</MenuItem>
        <MenuItem onClick={(e) => clickHandler(e)}>CSS</MenuItem>
      </Menu>
    </Grid>
  );
}
