import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Container from '@mui/material/Container';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { Link, useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid',
    borderColor: 'gray',
    padding: theme.spacing(13)

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  signInText: {
    color: "#fff"
  },

}));

export default function SignIn() {
  const history = useHistory();


  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")


  const passwordChangeHandler = (e) => {
    setPassword(e.target.value)
  }
  const emailChangeHandler = (e) => {
    setEmail(e.target.value)
  }


  const submitHandler = () => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        history.push('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        // ..
      });
  }

  return (

    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography className={classes.signInText} component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => emailChangeHandler(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => passwordChangeHandler(e)}
          />
          <Button
            sx={{my:5}}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              e.preventDefault()
              submitHandler()
            }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link to="/signup" variant="body2">
                Don't have an account? Create an account
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>

  );
}