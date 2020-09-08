import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
//import ShareIcon from '@material-ui/icons/Share';
//import MessageIcon from '@material-ui/icons/Message';
//import GroupAddIcon from '@material-ui/icons/GroupAdd';
import CallSplitIcon from '@material-ui/icons/CallSplit';


const useStyles = makeStyles((theme) => ({
    speedDial: {
      position: 'absolute',
      bottom: theme.spacing(0),
      right: theme.spacing(0),
    },
    speedDialDiv: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      width: theme.spacing(7), 
      height: theme.spacing(7)
    },
    icon: {
        color: theme.palette.text.secondary
    }
  }));

const MainButtonView = ({idioma, handleOpen, handleClose, open, openAddContactView, text}) => {

    const classes = useStyles();
  
    
    return (
      <div id="idMainButton" className={classes.speedDialDiv} >
        <SpeedDial
            ariaLabel="Main speed dial button"
            className={classes.speedDial}            
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
        >
        
          <SpeedDialAction
            //id="idBtnAddContact"
            key='add'
            icon={<PersonAddIcon className={classes.icon}/>}
            tooltipTitle={text.addContact[idioma]}
            tooltipOpen
            onClick={openAddContactView}
          />
          <SpeedDialAction
            key='addgroup'
            icon={<CallSplitIcon className={classes.icon}/>}
            tooltipTitle={text.sendAll[idioma]}
            tooltipOpen
            onClick={() => {
              console.log('Enviar mensaje de difusion');
              alert('Not implemented!')
            }}
          />
          {/*<SpeedDialAction
            key='addgroup'
            icon={<GroupAddIcon className={classes.icon}/>}
            tooltipTitle={text.addGroup[idioma]}
            tooltipOpen
            onClick={() => {
              console.log('Crear un grupo');
              alert('Not implemented!')
            }}
          />
          <SpeedDialAction
            key='send'
            icon={<MessageIcon className={classes.icon}/>}
            tooltipTitle={text.sendMsg[idioma]}
            tooltipOpen
            onClick={() => {
              console.log('Enviar mensaje a un contacto que no esta en tu lista de contacto');
              alert('Not implemented!')
            }}
          />
          <SpeedDialAction
            key='share'
            icon={<ShareIcon className={classes.icon}/>}
            tooltipTitle={text.shareMsg[idioma]}
            tooltipOpen
            onClick={() => {
              console.log('Compartir la aplicacion por correo electronivo');
              alert('Not implemented!')
            }}
          />*/}
        </SpeedDial>
      </div>
    );

}
export default React.memo(MainButtonView);