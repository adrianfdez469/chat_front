import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { CardHeader, Avatar, Badge, IconButton, Divider, List, ListItem, ListItemIcon, TextField ,ListItemText, Typography, Container, FormControl, Select, MenuItem, FormControlLabel, Switch, Dialog } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import ShareIcon from '@material-ui/icons/Share';
import BugReportIcon from '@material-ui/icons/BugReport';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import StarIcon from '@material-ui/icons/Star';
import LanguageIcon from '@material-ui/icons/Language';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ColorLensIcon from '@material-ui/icons/ColorLens';

const useStyles = makeStyles( theme => ({
    root: {
        maxWidth: 345,
    },
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7)
    },
    cardHeaderAction: {
        alignSelf: 'flex-end'
    },
    langSelect: {
        fontSize: '0.9em', 
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing:'0.00938em'
    }
}));



const ProfileView = ({text, idioma, avatarUrl, userData, logout, changeIdioma, darkMode, changeTheme, setChangePass}) => {
    
     const classes = useStyles();

    return (
    <Card className={classes.root}>
        <CardHeader
            classes={{
                action: classes.cardHeaderAction
            }}
            avatar={
                <Badge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    badgeContent={<SmallPhotoCameraButton />}
                >   
                        <Avatar 
                            aria-label="recipe" 
                            className={classes.avatar} 
                            src={avatarUrl}                            
                        />
                    
                </Badge>
            }
            action={
                <Button variant="outlined" onClick={logout}>{text.logout[idioma]}</Button>
            }
            title={userData.nickname}
            subheader={userData.email}
        />
        <Divider />
        
            <List>
                <ListItem 
                    button
                    onClick={() => alert('Not implemented')}
                >
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText 
                        primary={text.edit[idioma]}
                        primaryTypographyProps={{style: {fontSize: '0.9em'}}}
                    />
                </ListItem>
                <ListItem 
                    button
                    onClick={setChangePass}
                >
                    <ListItemIcon>
                        <VpnKeyIcon />
                    </ListItemIcon>
                    <ListItemText 
                        primary={text.editpass[idioma]}
                        primaryTypographyProps={{style: {fontSize: '0.9em'}}}
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <LanguageIcon />
                    </ListItemIcon>
                        <FormControl >
                            <Select
                                value={idioma}
                                onChange={changeIdioma}
                                displayEmpty
                                className={classes.langSelect}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value={'en'}>English</MenuItem>
                                <MenuItem value={'es'}>Español</MenuItem>
                            </Select>
                            
                        </FormControl>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <ColorLensIcon />
                    </ListItemIcon>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={darkMode}
                                onChange={changeTheme}
                                color="primary"
                            />
                        }
                        label={text.darkMode[idioma]}
                    />
                </ListItem>
                <Divider />
                <ListItem 
                    button
                    onClick={() => {
                        alert('Not implemented')
                    }}
                >
                    <ListItemIcon>
                        <ShareIcon />
                    </ListItemIcon>
                    <ListItemText 
                        primary={text.share[idioma]}
                        primaryTypographyProps={{style: {fontSize: '0.9em'}}}
                        secondary={text.shareDesc[idioma]}
                        secondaryTypographyProps={{style: {fontSize: '0.8em'}}}
                    />
                </ListItem>
                <ListItem 
                    button
                    onClick={() => alert('Not implemented')}
                >
                    <ListItemIcon>
                        <StarIcon />
                    </ListItemIcon>
                    <ListItemText 
                        primary={text.feedback[idioma]}
                        primaryTypographyProps={{style: {fontSize: '0.9em'}}}
                        secondary={text.feedbackDesc[idioma]}
                        secondaryTypographyProps={{style: {fontSize: '0.8em'}}}
                    />
                </ListItem>
                <ListItem 
                    button
                    onClick={() => alert('Not implemented')}
                >
                    <ListItemIcon>
                        <BugReportIcon />
                    </ListItemIcon>
                    <ListItemText 
                        primary={text.report[idioma]}
                        primaryTypographyProps={{style: {fontSize: '0.9em'}}}
                        secondary={text.reportDesc[idioma]}
                        secondaryTypographyProps={{style: {fontSize: '0.8em'}}}
                    />
                </ListItem>
            </List>

    </Card>
  );
}


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

const DialogPass = ({text, idioma, open, onClose, oldPassState, passState, pass2State, onOldPassChange, onPassChange, onPass2Change, submitPass }) => {
    
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

const useSmallPhotoCameraButtonStyle = makeStyles(theme => {
        console.log(theme.palette.background.default);
        
        return {
            iconButton: {
                backgroundColor: theme.palette.background.default,
                boxShadow: `0 0 5px ${theme.palette.action.disabled}`,
                '&:hover': {
                    backgroundColor: theme.palette.background.default
                }
            }
        }
    }
);

const SmallPhotoCameraButton = () => {
    const classes = useSmallPhotoCameraButtonStyle();
    return (
        <IconButton size="small" 
            className={classes.iconButton}
            onClick={() => alert('Cambiar foto de perfil')}
        >
            <PhotoCameraOutlinedIcon fontSize="small"/>
        </IconButton>
        
    );
}

export {DialogPass};
export default ProfileView;