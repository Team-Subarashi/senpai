import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Container from '@mui/material/Container';
import { getAuth, createUserWithEmailAndPassword, signOut } from '@firebase/auth';
import { Link, useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Alert from '@mui/lab/Alert';
import axios from 'axios';
import useTheme from '@mui/styles/useTheme'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid',
    borderColor: 'gray',
    padding: theme.spacing(9)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

export default function SignUp() {
  const history = useHistory();
  const theme = useTheme();
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value)
  }
  const passwordConfirmChangeHandler = (e) => {
    setPasswordConfirm(e.target.value)
  }
  const emailChangeHandler = (e) => {
    setEmail(e.target.value)
  }
  const nameChangeHandler = (e) => {
    setName(e.target.value)
  }

  const submitHandler = () => {
    if (password !== passwordConfirm) {
      setErrorMessage("Passwords don't match")
      return
    }
    setErrorMessage("")

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        axios({
          method: "post",
          url: "/users",
          data: {
            name: name,
            email: email,
            authId: userCredential.user.uid
          }
        })
        signOut(auth).then(() => {  // TEMPORARY BUGFIX FOR CREATE ACCOUNT NOT PROPERLY LOGGING IN
          // Sign-out successful.
        }).catch((error) => {
          // An error happened.
          console.log(error)
        });
        history.push('/login')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        setErrorMessage(error.message)
        // ..
      });
  }

  return (
    <Container component="main" maxWidth="xs" sx={{p:10}}>
      <div className={classes.paper}>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" color={theme.palette.text.primary}>
          Sign Up
        </Typography>
        {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={(e) => nameChangeHandler(e)}
          />
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password-confirm"
            label="Re-enter your password"
            type="password"
            id="password-confirm"
            autoComplete="current-password-confirm"
            onChange={(e) => passwordConfirmChangeHandler(e)}
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
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}