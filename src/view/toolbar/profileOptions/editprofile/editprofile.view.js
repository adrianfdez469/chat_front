import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {Container, TextField, Grid, Button, Avatar, CssBaseline, Typography, Switch} from '@material-ui/core';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import {pink, blue} from '@material-ui/core/colors';

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

const CustomSwitch = withStyles((theme) => ({
    switchBase: {
        color: blue[800],  
        '&$checked': {
            color: pink[500],
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.common.white,
                borderColor: theme.palette.common.white,
            },
        }
    },
    track: {
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);

const EditProfileView = ({text, idioma, isOpen, setClose, userData, 
    lastName, nameState, nicknameState, emailState, gender,
    onNameChange, onEmailChange, onNickNameChange, onLastNameChange, onSwitchGender,
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
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label={text.firstName[idioma]}
                                autoFocus
                                value={nameState.value}
                                helperText={!nameState.valid ? text[nameState.msg][idioma] : ''}
                                error={!nameState.valid}
                                onChange={onNameChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="lastName"
                                label={text.lastName[idioma]}
                                name="lastName"
                                autoComplete="lname"
                                value={lastName.value}
                                onChange={onLastNameChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
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
                                onChange={onEmailChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
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
                        
                            <Typography component="div" style={{width: '100%'}}>
                                <Grid component="label" container alignItems="center" spacing={1} style={{width: '100%', margin: 0, justifyContent: 'center'}}>
                                    <Grid item>{text.male[idioma]}</Grid>
                                        <Grid item>
                                            <CustomSwitch checked={gender} onChange={onSwitchGender} name="checkedC" className={classes.customSwitch}/>
                                        </Grid>
                                    <Grid item>{text.female[idioma]}</Grid>
                                </Grid>
                            </Typography>
                                 
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