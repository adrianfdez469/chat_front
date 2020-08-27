import React from 'react';

import {Container, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Grid} from '@material-ui/core';


const ShareAppView = ({idioma, text, nameState, onNameChange, emailState, onEmailChange, onSend}) => {

    

    return <Container maxWidth="sm"> 
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {text.text[idioma]}
                </DialogContentText>
                
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label={text.name[idioma]}
                            autoFocus
                            value={nameState.value}
                            helperText={!nameState.valid ? text[nameState.msg][idioma] : ''}
                            error={!nameState.valid}
                            onChange={onNameChange}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label={text.email[idioma]}
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={emailState.value}
                            helperText={!emailState.valid ? text.invalidEmail[idioma] : ''}
                            error={!emailState.valid}
                            onChange={onEmailChange}
                        />
                    </Grid>
                </Grid>
                
            </DialogContent>
                <DialogActions>
                    <Button onClick={onSend}>
                        {text.send[idioma]}
                    </Button>
            </DialogActions>
        </Container>;

}
export default ShareAppView;