import React, { useDebugValue } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Rating } from "@material-ui/lab";
import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import axios from "axios";

const CreateReview = ({ lesson }) => {
  const [open, setOpen] = React.useState(false);
  const [stateValue, setStateValue] = React.useState(2);
  // const [stateHover, setStateHover] = React.useState(-1);
  const review = React.useRef();
  //if we want labels for the stars
  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  const useStyles = makeStyles({
    root: {
      width: 200,
      display: "flex",
      alignItems: "center",
    },
  });

  const handleClick = (event, value) => {
    console.log(event);
    console.log(value);
  };
  function HoverRating() {
    // const [value, setValue] = React.useState(2);
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <Rating
          name="hover-feedback"
          value={stateValue} //2
          precision={0.5}
          // onClick={handleClick}
          onChange={(event, newValue) => {
            // value.current = newValue;
            setStateValue(newValue);
            console.log(stateValue);
          }}
          onChangeActive={(event, newHover) => {
            // hover.current = newHover;
            // value.current = newHover;
            // console.log(newHover);
            // setStateHover(newHover);
            // console.log("active");
          }}
        />
        {
          //if we want labels for the stars
          /*
         {stateValue !== null && (
          <Box ml={2}>
            {labels[stateHover !== -1 ? stateHover : stateValue]}
          </Box>
        )} */
        }
      </div>
    );
  }
  const FormDialog = () => {
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    const handleSubmit = () => {
      setOpen(false);
      if (
        typeof review.current === "string" &&
        typeof stateValue === "number"
      ) {
        axios.post("/api/v1/reviews", {
          rating: stateValue,
          review: review.current,
          kohaiId: lesson.kouhaiId,
          senpaiId: lesson.senpaiId,
          avatar: lesson.avatar,
          startDate: lesson.startDate,
          endDate: lesson.endDate,
          title: lesson.title,
        });
      } else {
        alert("Please add a correct review and rate.");
      }
      setStateValue(2);
      review.current = null;
    };

    return (
      <div>
        <Button variant="outlined" color="white" onClick={handleClickOpen}>
          ADD REVIEW
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">REVIEW</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <HoverRating />
            <TextField
              autoFocus
              margin="dense"
              id="review"
              label="Review"
              type="review"
              fullWidth
              onChange={(e) => (review.current = e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="white">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="white">
              SUBMIT
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  if (!lesson.userIsSenpai) {
    return (
      <div>
        <FormDialog />
      </div>
    );
  } else {
    return null;
  }
};

export default CreateReview;
