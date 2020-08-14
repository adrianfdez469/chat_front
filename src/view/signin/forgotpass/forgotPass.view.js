import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import text from './idioma.json';



const ForgotPassView = ({idioma, forgetPassHandler, forgotWinState, forgotWinOk, onChangeForgotEmail, forgotEmailState}) => {

    return (
        <Dialog open={forgotWinState} onClose={forgetPassHandler} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{text.title[idioma]}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {text.forgotText[idioma]}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={text.email[idioma]}
            type="email"
            fullWidth
            onChange={onChangeForgotEmail}
            value={forgotEmailState.value}
            helperText={!forgotEmailState.valid ? text.invalidEmail[idioma] : ''}
            error={!forgotEmailState.valid}

          />
        </DialogContent>
        <DialogActions>
          <Button onClick={forgetPassHandler} color="primary">
            {text.forgotBtnCancel[idioma]}
          </Button>
          <Button onClick={forgotWinOk} color="primary">
            {text.forgotBtnOk[idioma]}
          </Button>
        </DialogActions>
      </Dialog>
    );

}
export default ForgotPassView;