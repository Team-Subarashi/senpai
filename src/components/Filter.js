import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { category as categoryAtom } from "../atoms";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// Works slightly differently than the above menu. Which is better?
// import Menu from "@material-ui/core/Menu";

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
      item
      xs={12}
      style={{
        height: "inherit",
        backgroundColor: "#f3f0e9",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Button
        id="categoryButton"
        style={{
          backgroundColor: "purple",
          color: "white",
          height: "2rem",
          marginLeft: "1rem",
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
