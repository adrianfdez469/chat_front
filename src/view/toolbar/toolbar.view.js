import React, {Suspense/*, useRef*/} from 'react';
//import {useRecoilState} from 'recoil';
//import { anchorElMenuBtn } from '../../components/recoil/atoms'; 
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
//import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';

//import ProfileOpt from './profileOptions';
const AsyncProfileOpt = React.lazy(() => import('./profileOptions'));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
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
                        id="userAvatarButton"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <Avatar
                            id="userAvatar"
                            src={avatarSrc}
                        />
                        
                    </IconButton>
                    {userData !== null && 
                    <Suspense fallback={
                            <Backdrop className={classes.backdrop} open={true} >
                                <CircularProgress color="inherit" />
                            </Backdrop>}
                        >
                        <AsyncProfileOpt open={open} anchorEl={anchorEl} handleClose={handleClose}/>
                    </Suspense>}
                    {/*<Popover 
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
                        
                    </Popover>*/}

                
                </div>          
            </Toolbar>
        </AppBar>
        </div>
    );
}

export default ToolbarView;