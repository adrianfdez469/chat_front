import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Dialog, Container, Avatar, Typography, TextField, Button} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const usePassStyles = makeStyles((theme) => ({
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

const ChangepassView = ({text, idioma, open, onClose, oldPassState, passState, pass2State, onOldPassChange, onPassChange, onPass2Change, submitPass }) => {

    const classes = usePassStyles();
    
    return <Dialog open={open} onClose={onClose} >
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
                                label={text.oldpassword[idioma]}
                                type="password"
                                id="oldpassword"
                                autoComplete="current-password"
                                value={oldPassState.value}
                                onChange={onOldPassChange}
                                helperText={!oldPassState.valid ? text.invalidOldPass[idioma] : ''}
                                error={!oldPassState.valid}
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
                        </form>
                    </div>
                </Container>
    </Dialog>

}
export default ChangepassView;