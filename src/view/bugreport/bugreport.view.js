import React from 'react';

import {Container, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Grid} from '@material-ui/core';


const BugReportView = ({idioma, text, comentState, onCommentChange, onSend}) => {

    return <Container maxWidth="sm"> 
            <DialogTitle id="form-dialog-title">{text.winTitle[idioma]}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {text.text[idioma]}
                </DialogContentText>
                
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                    <TextField
                                id="outlined-textarea"
                                label={text.report[idioma]}
                                multiline
                                variant="outlined"
                                fullWidth
                                rowsMax={4}
                                rows={4}
                                value={comentState}
                                onChange={onCommentChange}
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
export default BugReportView;