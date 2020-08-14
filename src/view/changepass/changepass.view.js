import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import RouterLink from 'react-router-dom/Link';
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
  }
}));

export default function ChangePassView({idioma, passState, pass2State, onPassChange, onPass2Change, submitPass}) {
  
        const classes = useStyles();

  return (  
    <Container component="main" maxWidth="xs">  
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {text.title[idioma]}
        </Typography>
        <form className={classes.form} noValidate>
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
                value={passState.value}
                onChange={onPassChange}
                helperText={!passState.valid ? text.invalidPass[idioma] : ''}
                error={!passState.valid}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label={text.repeatPassword[idioma]}
                type="password"
                id="password"
                autoComplete="current-password"
                value={pass2State.value}
                onChange={onPass2Change}
                helperText={!pass2State.valid ? text.passNotEqual[idioma] : ''}
                error={!pass2State.valid}
            />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitPass}            
          >
            {text.changePass[idioma]}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <RouterLink to="/">
              {text.signin[idioma]}
              </RouterLink>
            </Grid>
          </Grid>
         </form>
      </div>
      </Container>
  );
}