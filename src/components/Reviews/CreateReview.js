import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { Rating } from "@material-ui/lab";
import { Container } from "@material-ui/core";
import axios from "axios";
import { userState } from "../../atoms";
import { useRecoilValue } from "recoil";

const CreateReview = ({ lesson }) => {
  const user = useRecoilValue(userState);
  const [open, setOpen] = React.useState(false);
  const [stateValue, setStateValue] = React.useState(2);
  // const [stateHover, setStateHover] = React.useState(-1);
  const review = React.useRef();
  //if we want labels for the stars
  // const labels = {
  //   0.5: "Useless",
  //   1: "Useless+",
  //   1.5: "Poor",
  //   2: "Poor+",
  //   2.5: "Ok",
  //   3: "Ok+",
  //   3.5: "Good",
  //   4: "Good+",
  //   4.5: "Excellent",
  //   5: "Excellent+",
  // };

  const useStyles = makeStyles({
    root: {
      width: 200,
      display: "flex",
      alignItems: "center",
    },
  });

  function HoverRating() {
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <Rating
          name="hover-feedback"
          value={stateValue} //2
          precision={0.5}
          onChange={(event, newValue) => {
            setStateValue(newValue);
          }}
          // onChangeActive={(event) => {
          // hover.current = newHover;
          // value.current = newHover;
          // console.log(newHover);
          // setStateHover(newHover);
          // console.log("active");
          // }}
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
          avatar: user.avatar,
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
        <Button
          // variant="text"
          variant="contained"
          color="secondary"
          onClick={handleClickOpen}
          style={{ color: "white" }}
        >
          ADD REVIEW
        </Button>
        <Dialog
          fullWidth="true"
          maxWidth="sm"
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" style={{}}>
            REVIEW
          </DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <HoverRating />
            <TextField
              color="secondary"
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
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClose}
              style={{ color: "white" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
              style={{ color: "white" }}
            >
              SUBMIT
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  if (!lesson.userIsSenpai) {
    return (
      <Container>
        <FormDialog />
      </Container>
    );
  } else {
    return null;
  }
};

export default CreateReview;
