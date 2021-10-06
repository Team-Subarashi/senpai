import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function BookNowPopover({ senpaiId }) {
  const selectedSenpai = senpaiId;

  const classes = useStyles();

  //Popover logic
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // end of popover logic

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        // onClick={handleClick}
      >
        <Link to={`/senpai/${senpaiId}/schedule`}>View schedule</Link>
      </Button>

    </div>
  );

}
