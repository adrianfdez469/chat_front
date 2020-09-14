import React from 'react';
import { DialogTitle, DialogContent, DialogActions, Button, Typography, Avatar } from '@material-ui/core';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
const UpdateAvatarView = ({idioma, text, handleClose, onAgreeUpdate, avatarSrc, newAvatarSrc}) => {

    return (
        <>
            <DialogTitle>{text.title[idioma]}</DialogTitle>
            <DialogContent>
                <Typography>{text.text[idioma]}</Typography>
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent: 'center',
                    marginTop: '1em',
                    alignItems: 'center',
                }}>
                    <Avatar src={avatarSrc} />
                    <DoubleArrowIcon />
                    <Avatar src={newAvatarSrc} />
                </div>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                    {text.disagree[idioma]}
                </Button>
                <Button onClick={onAgreeUpdate} color="primary" autoFocus>
                    {text.agree[idioma]}
                </Button>
            </DialogActions>
        </>
    );

}
export default React.memo(UpdateAvatarView);