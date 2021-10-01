import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { category as categoryAtom } from "../atoms";
import { Grid, Button } from "@material-ui/core";
import { Menu, Popover, MenuItem } from "@mui/material";

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
        Category
      </Button>
      <Menu
        open={menuState}
        anchorEl={document.getElementById("categoryButton")}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        // style={{ marginTop: "-75.5vh" }}
      >
        <MenuItem onClick={(e) => clickHandler(e)}>All</MenuItem>
        <MenuItem onClick={(e) => clickHandler(e)}>Pottery</MenuItem>
        <MenuItem onClick={(e) => clickHandler(e)}>Zumba</MenuItem>
        <MenuItem onClick={(e) => clickHandler(e)}>Dancing</MenuItem>
        <MenuItem onClick={(e) => clickHandler(e)}>Archery</MenuItem>
        <MenuItem onClick={(e) => clickHandler(e)}>Painting</MenuItem>
        <MenuItem onClick={(e) => clickHandler(e)}>Cooking</MenuItem>
      </Menu>
    </Grid>
  );
}
