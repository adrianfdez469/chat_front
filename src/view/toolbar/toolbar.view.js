import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Popover from '@material-ui/core/Popover';
import Avatar from '@material-ui/core/Avatar';
import ProfileOpt from './profileOptions';
import {blue, pink} from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
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

const ToolbarView = ({avatarSrc, userData}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        
        <Toolbar>
          
            {/*<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>*/}
          
            <Typography variant="h6" className={classes.title}>
                Shutapp
            </Typography>          
            <div>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <Avatar
                        src={avatarSrc}
                        className={userData.gender === "M" ? classes.avatarMan : classes.avatarWoman}
                    />
                    
                </IconButton>
                <Popover 
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
                    <ProfileOpt />
                </Popover>

              
            </div>          
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ToolbarView;