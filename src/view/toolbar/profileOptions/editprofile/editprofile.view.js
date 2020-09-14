import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Container, TextField, Grid, Button, Avatar, CssBaseline, Typography} from '@material-ui/core';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
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
    },
    customSwitch: {
        alignSelf: 'center'
    }
}));

const EditProfileView = ({text, idioma, 
    lastName, nameState, nicknameState, emailState,
    onNameChange, onEmailChange, onNickNameChange, onLastNameChange,
    onSave, avatarSrc
}) => {
    
    const classes = useStyles();
    
    return <Container component="main" maxWidth="xs">    
            <CssBaseline /> 
            <div className={classes.paper}>
                <Avatar className={classes.avatar}> 
                    <PermIdentityOutlinedIcon fontSize="large"/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {text.title[idioma]}
                </Typography>       
            
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size="small"
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label={text.firstName[idioma]}
                                value={nameState.value}
                                helperText={!nameState.valid ? text[nameState.msg][idioma] : ''}
                                error={!nameState.valid}
                                //onChange={onNameChange}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size="small"
                                variant="outlined"
                                fullWidth
                                id="lastName"
                                label={text.lastName[idioma]}
                                name="lastName"
                                autoComplete="lname"
                                value={lastName.value}
                                //onChange={onLastNameChange}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                size="small"
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label={text.email[idioma]}
                                name="email"
                                autoComplete="email"
                                value={emailState.value}
                                helperText={!emailState.valid ? text.invalidEmail[idioma] : ''}
                                error={!emailState.valid}
                                //onChange={onEmailChange}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                size="small"
                                variant="outlined"
                                required
                                fullWidth
                                name="nickname"
                                label={text.nickname[idioma]}
                                
                                id="nickname"
                                
                                value={nicknameState.value}
                                helperText={!nicknameState.valid ? text[nicknameState.msg][idioma] : ''}
                                error={!nicknameState.valid}
                                onChange={onNickNameChange}
                            />
                        </Grid>  
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onSave}
                    >
                        {text.save[idioma]}
                    </Button>
                </form>

                
        
            </div>
        </Container>;

}
export default EditProfileView;