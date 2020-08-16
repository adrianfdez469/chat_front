import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MessageIcon from '@material-ui/icons/Message';
import text from './idioma.json'

const useStyles = makeStyles((theme) => ({
    speedDial: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }));

const MainButtonView = ({idioma, handleOpen, handleClose, open, openAddContactView}) => {

  const classes = useStyles();
  

    return (
      <>
        <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            className={classes.speedDial}            
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
        >
          <SpeedDialAction
            key='add'
            icon={<PersonAddIcon color="error"/>}
            tooltipTitle={text.addContact[idioma]}
            tooltipOpen
            onClick={openAddContactView}
          />
          <SpeedDialAction
            key='send'
            icon={<MessageIcon color="error"/>}
            tooltipTitle={text.sendMsg[idioma]}
            tooltipOpen
            onClick={() => {
              console.log('Enviar mensaje a un contacto que no esta en tu lista de contacto');
              alert('Not implemented!')
            }}
          />
        </SpeedDial>
      </>
    );

}
export default MainButtonView;