import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { CardHeader, Avatar, Badge, IconButton, Divider, List, ListItem, ListItemIcon , FormControl, ListItemText, Select, MenuItem, FormControlLabel, Switch } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import ShareIcon from '@material-ui/icons/Share';
import BugReportIcon from '@material-ui/icons/BugReport';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import StarIcon from '@material-ui/icons/Star';
import LanguageIcon from '@material-ui/icons/Language';
import ColorLensIcon from '@material-ui/icons/ColorLens';

import ChangePass from './changepass';
import ChangeAvatar from './changeavatar';
import EditProfile from './editprofile';
import ShareApp from '../../shareapp';

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



const ProfileView = ({text, idioma, avatarUrl, userData, logout, changeIdioma, darkMode, changeTheme, 
    changePass, setChangePass, changeAvatar, setChangeAvatar, editProfile, setChangeProfile, shareApp, setShareApp

}) => {
    
    const classes = useStyles();

    return (<>
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
                        badgeContent={<SmallPhotoCameraButton onClick={setChangeAvatar}/>}
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
                        onClick={setShareApp}
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

        <ChangePass 
            isopen={changePass}
            close={setChangePass}
        />
        <ChangeAvatar
            avatarOpen={changeAvatar}
            avatarClose={setChangeAvatar}
        />
        <EditProfile 
            isOpen={editProfile}
            setClose={setChangeProfile}
        />
        <Dialog open={shareApp} onClose={setShareApp}>
            <ShareApp close={setShareApp}/>
        </Dialog>
    </>

  );
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

const SmallPhotoCameraButton = ({onClick}) => {
    const classes = useSmallPhotoCameraButtonStyle();
    return (
        <IconButton size="small" 
            className={classes.iconButton}
            onClick={onClick}
        >
            <PhotoCameraOutlinedIcon fontSize="small"/>
        </IconButton>
        
    );
}

export default ProfileView;