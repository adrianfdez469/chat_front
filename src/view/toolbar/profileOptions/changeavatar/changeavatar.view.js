import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Dialog, Container, Avatar, Button} from '@material-ui/core';
import { pink } from '@material-ui/core/colors';
import AvatarEdit from 'react-avatar-edit';



const useStyles = makeStyles((theme) => ({
    avatarEdit: {
        margin: theme.spacing(2),
        marginLeft: theme.spacing(3),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: ''
    },
    avatar: {
        marginLeft: theme.spacing(7),
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    button: {
        width: '100%', 
        marginBottom: theme.spacing(2)
    }
}));


const ChangeAvatarView = ({text, idioma, preview, setPreview, avatarRef, avatarOpen, close, onAvatarChange}) => {

    const classes = useStyles(); 

    return <Dialog open={avatarOpen} onClose={close} >
        <Container component="main" maxWidth="xs">
            <div className={classes.avatarEdit}>
                <AvatarEdit
                        width={120}
                        height={100}
                        onCrop={prev => {                                    
                            setPreview(prev)}
                        }
                        onClose={() => {setPreview(null)}}
                        closeIconColor={pink[500]}
                        label={text.choosefile[idioma]}        
                        ref={avatarRef}                    
                    />
                    <Avatar                           
                        src={preview}
                        variant="circle"
                        className={classes.avatar}
                    />
            </div>
            <Button 
                variant="contained" 
                color="primary"  
                disabled={preview === null} 
                className={classes.button}
                onClick={onAvatarChange}
            >
                {text.btnCambiar[idioma]}
            </Button>
        </Container>
    </Dialog>
}
export default ChangeAvatarView;