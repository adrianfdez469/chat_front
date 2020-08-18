import React from 'react';

import { fade, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import {DEFAULT_CONFIG} from '../../conf/configuration';
import { blue, red, grey } from '@material-ui/core/colors';


import CloseIcon from '@material-ui/icons/Close';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import text from './idioma.json';
import { ListItemSecondaryAction } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },
    dialogContent: {
      padding: 0
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        /*[theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },*/
      },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        /*[theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },*/
      },

  }));

const AddContactView = ({idioma, closeAddContactWin, open,
    buscarUsuarios, users,
    inputSearchRef,
    sendFriendRequest
}) => {
    
    const classes = useStyles();
    
    return (
        <Dialog
            maxWidth="xs"
            onEntering={() => {}}
            aria-labelledby="confirmation-dialog-title"
            open={open}
            onClose={closeAddContactWin}
        >
            <DialogTitle id="confirmation-dialog-title" className={classes.dialogTitle}>{text.title[idioma]} </DialogTitle>
            <Divider />
            <InputSearch idioma={idioma} buscarUsuarios={buscarUsuarios} inputSearchRef={inputSearchRef}/>
            <DialogContent dividers className={classes.dialogContent}>
                <List style={{minHeight:'200px'}}>
                    {
                        users.map(user => {
                            return (
                                <UserItem user={user} sendFriendRequest={sendFriendRequest}/>
                            )
                        })
                    }
                </List>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={closeAddContactWin} color="primary">
                    {text.close[idioma]}
                </Button>
            </DialogActions>
        </Dialog>
    );

}

const UserItem = ({user, sendFriendRequest}) => {

    const classes = useStyles();
    //const [iconButtonDisabledState, setIconButtonDisabledState] = React.useState(false)

    const disableItem = () => {
        //setIconButtonDisabledState(true);
        sendFriendRequest(user.userId);

    }

    return (
        <ListItem key={user.email} >
            <ListItemAvatar>
                <Avatar className={classes.avatar} src={DEFAULT_CONFIG.server + user.avatarUrl}></Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={user.nickname}
                secondary={user.email}
            />
            
                <ListItemSecondaryAction>
                    <IconButton color={user.blockinguser ? grey[100] : blue[300]} onClick={disableItem} disabled={user.blockinguser}>
                        <AddIcon color={user.blockinguser ? 'disabled' : "primary"}/>
                    </IconButton>
                </ListItemSecondaryAction>
            
        </ListItem>
    )

}

const InputSearch = ({idioma, buscarUsuarios, inputSearchRef}) => {

    const classes = useStyles();

    const [searchState, setSearchState] = React.useState('');

    const onChangeSearch = ({target: {value}}) => {
        setSearchState(value);
    }
    const clearSearch = () => {
        setSearchState('');
    }
    const keyPressHandler = (event) => {
        if(event.charCode === 13){
            buscarUsuarios();
        }
    }
    

    return (
        <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    onKeyPress={keyPressHandler}
                    placeholder={text.search[idioma]}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchState}
                    onChange={onChangeSearch}
                    inputRef={inputSearchRef}
                    endAdornment={
                        <InputAdornment position="end">
                            {searchState !== '' ?
                            <IconButton
                                size="small"
                                aria-label="toggle password visibility"
                                onClick={clearSearch}
                            >
                                <CloseIcon />
                            </IconButton>
                            : null}
                            <IconButton
                                size="small"
                                aria-label="toggle password visibility"
                                onClick={buscarUsuarios}
                            >
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment> 
                        
                    }
                />
            </div>
    );
}

export default AddContactView;