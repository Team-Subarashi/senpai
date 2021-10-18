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
  const [stateHover, setStateHover] = React.useState(-1);
  const value = React.useRef(2);
  const hover = React.useRef(-1);
  const review = React.useRef();
  const DropDown = () => {
    return (
      <>
        <FormControl fullWidth>
          <InputLabel xs={12} id="demo-simple-select-label">
            RATE
          </InputLabel>
          <Select>
            <MenuItem onChange={console.log((rate.current = 1))} value={1}>
              1
            </MenuItem>
            <MenuItem onChange={(rate.current = 2)} value={2}>
              2
            </MenuItem>
            <MenuItem onChange={(rate.current = 3)} value={3}>
              3
            </MenuItem>
            <MenuItem onChange={(rate.current = 4)} value={4}>
              4
            </MenuItem>
            <MenuItem onChange={(rate.current = 5)} value={5}>
              5
            </MenuItem>
          </Select>
        </FormControl>
      </>
    );
  };
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
          value={value.current}
          precision={0.5}
          onClick={handleClick}
          onChange={(event, newValue) => {
            value.current = newValue;
            console.log(value.current);
          }}
          onChangeActive={(event, newHover) => {
            hover.current = newHover;
            // setStateHover(newHover);
            value.current = newHover;
            // console.log(newHover);
          }}
        />
        {/* {value.current !== null && (
          <Box ml={2}>
            {labels[hover.current !== -1 ? hover.current : value.current]}
          </Box>
        )} */}
      </div>
    );
  }
  const FormDialog = () => {
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      console.log("closed");
    };
    const handleSubmit = () => {
      // console.log(lesson);
      setOpen(false);
      if (typeof review.current === "string" && typeof value === "number") {
        axios.post("/api/v1/reviews", {
          rating: value.current,
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
      // console.log({
      //   rating: value,
      //   review: review.current,
      //   kohaiId: lesson.kouhaiId,
      //   senpaiId: lesson.senpaiId,
      //   avatar: lesson.avatar,
      //   startDate: lesson.startDate,
      //   endDate: lesson.endDate,
      //   title: lesson.title,
      // });
      value.current = null;
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
