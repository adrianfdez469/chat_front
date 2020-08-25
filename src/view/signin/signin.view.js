import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link as RouterLink} from 'react-router-dom';
import ForgotPass from './forgotpass';
import text from './idioma.json'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  link: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: theme.palette.text.secondary,
    '&:hover':{
        textDecoration: 'underline',
    }
  }
}));

export default function SignIn({idioma, emailRef, passRef, onSignIn, rememberChecked, onRememberChange, 
  forgetPassHandler, forgotWinState}) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {text.signin[idioma]}
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={text.email[idioma]}
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={emailRef}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={text.password[idioma]}
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={passRef}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" checked={rememberChecked} onChange={onRememberChange}/>}
            label={text.rememberme[idioma]}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSignIn}            
          >
            {text.signin[idioma]}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link className={classes.link} onClick={forgetPassHandler}>
                {text.forgotpassword[idioma]}
              </Link>
            </Grid>
            <Grid item>
                {
                <RouterLink to="/signup" /*style={{textDecoration: 'none'}}*/ className={classes.link}>
                    
                    {text.gosignup[idioma]}
                    
                </RouterLink>
                }
            </Grid>
          </Grid>
        </form>
      </div>
      <ForgotPass idioma={idioma} forgotWinState={forgotWinState} forgetPassHandler={forgetPassHandler}/>

    </Container>
  );
}