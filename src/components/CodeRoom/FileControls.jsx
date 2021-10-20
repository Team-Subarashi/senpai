// import { Typography } from "antd";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"; //MenuItem
import React from "react";
import { useRecoilState } from "recoil";
import { loadedFiles } from "../../atoms";
const FileControls = ({ activeFiles }) => {
  console.log(activeFiles);

  const [fileMenu, setFileMenu] = useRecoilState(loadedFiles);
  console.log(typeof setFileMenu);
  return (
    <div>
      <FormControl sx={{ width: "15vh" }}>
        <InputLabel sx={{ color: "#f7768e" }}>Select File:</InputLabel>
        <Select
          variant="standard"
          color="primary"
          labelId="file-control-label"
          id="file-control"
          label="Files"
          sx={{ backgroundColor: "white" }}
        >
          {fileMenu != "default" &&
            fileMenu.map((file, index) => {
              return (
                <MenuItem key={index} value={file.name}>
                  {file.name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </div>
  );
};

export default FileControls;
