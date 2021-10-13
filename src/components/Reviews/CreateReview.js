import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormControl, Select, MenuItem, InputLabel } from "@material-ui/core";
import axios from "axios";

const CreateReview = ({ lesson }) => {
  console.log(lesson);
  const [open, setOpen] = React.useState(false);
  const rate = React.useRef();
  const review = React.useRef();
  const DropDown = () => {
    return (
      <>
        <FormControl fullWidth>
          <InputLabel xs={12} id="demo-simple-select-label">
            RATE
          </InputLabel>
          <Select>
            <MenuItem onChange={(rate.current = 1)} value={1}>
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

  const FormDialog = () => {
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      console.log("closed");
    };
    const handleSubmit = () => {
      setOpen(false);
      if (
        typeof review.current === "string" &&
        typeof rate.current === "number"
      ) {
        axios.post("/api/v1/reviews", {
          rating: rate.current,
          review: review.current,
          kohaiId: lesson.kouhaiId,
          senpaiId: lesson.senpaiId,
        });
        console.log(typeof review.current, typeof rate.current);
      } else {
        alert("Please add a correct review and rate.");
      }
      rate.current = null;
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
            <DropDown />
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
