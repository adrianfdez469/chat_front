import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardHeader, Avatar, Badge, IconButton, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import ShareIcon from '@material-ui/icons/Share';
import BugReportIcon from '@material-ui/icons/BugReport';
import StarIcon from '@material-ui/icons/Star';

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
  }
}));

const ProfileView = ({text, idioma, avatarUrl, userData, logout}) => {
    console.log(avatarUrl);
    
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
                        secondary={text.editDesc[idioma]}
                    />
                </ListItem>
                <Divider />
                <ListItem 
                    button
                    onClick={() => alert('Not implemented')}
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

const SmallPhotoCameraButton = () => {
    return (
        <IconButton size="small" style={{backgroundColor:"white", boxShadow: '0 0 5px grey'}} onClick={() => alert('Cambiar foto de perfil')}>
            <PhotoCameraOutlinedIcon fontSize="small"/>
        </IconButton>
        
    );
}

export default ProfileView;