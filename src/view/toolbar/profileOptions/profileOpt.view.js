import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import Popover from '@material-ui/core/Popover';


import EditIcon from '@material-ui/icons/Edit';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import ShareIcon from '@material-ui/icons/Share';
import BugReportIcon from '@material-ui/icons/BugReport';
//import VpnKeyIcon from '@material-ui/icons/VpnKey';
import StarIcon from '@material-ui/icons/Star';
import LanguageIcon from '@material-ui/icons/Language';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

import {blue, pink} from '@material-ui/core/colors'

import ChangePass from './changepass';
import ChangeAvatar from './changeavatar';
import EditProfile from './editprofile';
import ShareApp from '../../shareapp';
import Feedback from '../../feedback';
import BugReport from '../../bugreport';


const useStyles = makeStyles( theme => ({
    root: {
        maxWidth: 345,
    },
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7)
    },
    cardHeaderAction: {
        alignSelf: 'flex-end',
    },
    cardHeaderContent:{
        overflowX: "hidden",
        marginRight: theme.spacing(2)
    },
    langSelect: {
        fontSize: '0.9em', 
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing:'0.00938em'
    },
    avatarMan: {
        color: theme.palette.getContrastText(blue[400]),
        backgroundColor: blue[400],
    },
    avatarWoman: {
        color: theme.palette.getContrastText(pink[300]),
        backgroundColor: pink[300],
    },
}));



const ProfileView = ({text, idioma, avatarUrl, userData, logout, changeIdioma, darkMode, changeTheme, 
    changePass, setChangePass, changeAvatar, setChangeAvatar, editProfile, setChangeProfile, shareApp, setShareApp, feedback, setFeedback,
    bugreport, setBugreport,
    open, anchorEl, handleClose,
    allowedOSNot, changeNotifSwith
}) => {
    
    const classes = useStyles();
    
    return (<Popover
        
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >



        <Card className={classes.root}>
            <CardHeader
                classes={{
                    action: classes.cardHeaderAction,
                    content: classes.cardHeaderContent,
                }}
                avatar={
                    <Badge
                        overlap="circle"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                        }}
                        badgeContent={<SmallPhotoCameraButton onClick={setChangeAvatar}/>}
                    >   
                            <Avatar 
                                aria-label="recipe" 
                                className={`${classes.avatar} ${userData.gender === "M" ? classes.avatarMan : classes.avatarWoman}`} 
                                src={avatarUrl}                            
                            />                        
                    </Badge>
                }
                action={
                    <Tooltip title={text.logout[idioma]}>
                        <IconButton onClick={logout} id="idBtnLogout">
                            <ExitToAppIcon />
                        </IconButton>
                    </Tooltip>
                }
                title={userData.nickname}
                subheader={userData.email}
            />
            
            <Divider />
            
                <List >
                    <div id="profileMenuOptions">
                        <ListItem 
                            button
                            onClick={setChangeProfile}
                        >
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>
                            <ListItemText 
                                primary={text.edit[idioma]}
                                primaryTypographyProps={{style: {fontSize: '0.9em'}}}
                            />
                        </ListItem>
                        {/*<ListItem 
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
                        </ListItem>*/}
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

                        
                        <ListItem>
                            <ListItemIcon>
                                <NotificationsActiveIcon />
                            </ListItemIcon>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={allowedOSNot}
                                        onChange={changeNotifSwith}
                                        color="primary"
                                    />
                                }
                                label={text.allowOSNotifications[idioma]}
                            />
                        </ListItem>
                    </div>
                    <Divider />
                    <div id="profileOtherMenuOptions">
                        <ListItem 
                            button
                            onClick={setShareApp}
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
                            onClick={setFeedback}
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
                            onClick={setBugreport}
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
                    </div>
                </List>
        </Card>
        
        <Dialog open={changePass} onClose={setChangePass}>
            <ChangePass />
        </Dialog>

        <Dialog open={changeAvatar} onClose={setChangeAvatar}>
            <ChangeAvatar close={setChangeAvatar}/>
        </Dialog>
        
        <Dialog open={editProfile} onClose={setChangeProfile}>
            <EditProfile close={setChangeProfile}/>
        </Dialog>
        
        <Dialog open={shareApp} onClose={setShareApp}>
            <ShareApp close={setShareApp}/>
        </Dialog>
        
        <Dialog open={feedback} onClose={setFeedback}>
            <Feedback close={setFeedback}/>
        </Dialog>
        
        <Dialog open={bugreport} onClose={setBugreport}>
            <BugReport close={setBugreport}/>
        </Dialog>
    </Popover>

  );
}

const useSmallPhotoCameraButtonStyle = makeStyles(theme => {
        
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

const SmallPhotoCameraButton = ({onClick}) => {
    const classes = useSmallPhotoCameraButtonStyle();
    return (
        <IconButton 
            id='cameraIconButton'
            size="small" 
            className={classes.iconButton}
            onClick={onClick}
        >
            <PhotoCameraOutlinedIcon fontSize="small"/>
        </IconButton>
        
    );
}

export default ProfileView;