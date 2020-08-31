import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import { pink, blueGrey } from '@material-ui/core/colors';




import { Container, Divider } from '@material-ui/core';

import AvatarEdit from 'react-avatar-edit';



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        paddingTop: theme.spacing(2),
        overflowY: 'auto'
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    Stepper: {
        backgroundColor: 'transparent',
        
    },
    combo: {
        minWidth: 120
    },
    avatarPink: {
        color: theme.palette.getContrastText(pink[300]),
        backgroundColor: pink[300],
        marginLeft: theme.spacing(7),
        width: theme.spacing(10),
        height: theme.spacing(10),
      },
    avatarBlue: {
        color: theme.palette.getContrastText(blueGrey[500]),
        backgroundColor: blueGrey[500],
        marginLeft: theme.spacing(7),
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    avatarButton: {
        padding: 0, 
        borderRadius: '50%', 
        minWidth: 0
    },
    avatarEdit: {
        margin: theme.spacing(2),
        marginLeft: theme.spacing(3),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: ''
    },
    
    
}));

const ActivateUserView = ({idioma, text,activeStep, handleFinish,
    handleLanguageChange, 
    sexSelectHandler,sexState,
    nicknameState, setNicknameHandler,
    preview, setPreview,
    goNextConf,goBackConf,
    sendActivation, activationError,
    avatarRef,
    isUserInvited, passState, onChangePass
}) => {

    const classes = useStyles();    

    let orientation = 'vertical';

    return (
        <div className={classes.root}>
            <Container>
                <Typography variant="h6">{`${text.hello[idioma]}${nicknameState}${text.hello1[idioma]}`}</Typography>
                <Typography variant="body1">{text.descriptionText[idioma]}</Typography>
            </Container>
            <Divider />
            <Stepper activeStep={activeStep} orientation={orientation} className={classes.Stepper}>
                <Step >
                    <StepLabel >{text.labelIdioma[idioma]}</StepLabel>
                    <StepContent>
                        <FormControl variant="standard" className={classes.combo}>
                            <Select
                                id="input-language"
                                value={idioma}
                                onChange={handleLanguageChange}
                            >
                                <MenuItem value={'en'}>{text.english[idioma]}</MenuItem>
                                <MenuItem value={'es'}>{text.spanish[idioma]}</MenuItem>
                            </Select>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={goNextConf}
                                className={classes.button}
                            >
                                {text.next[idioma]}
                            </Button>
                        </FormControl>                        
                    </StepContent>
                </Step>

                <Step >
                    <StepLabel >{text.labelSexo[idioma]}</StepLabel>
                    <StepContent>
                        <FormControl variant="standard" className={classes.combo}>
                            <Select
                                id="input-language"
                                value={sexState}
                                onChange={sexSelectHandler}
                            >
                                <MenuItem value={'M'}>{text.male[idioma]}</MenuItem>
                                <MenuItem value={'F'}>{text.female[idioma]}</MenuItem>
                            </Select>
                        </FormControl>
                        <div className={classes.actionsContainer}>
                            <div>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={goBackConf}
                                className={classes.button}
                            >
                                {text.back[idioma]}
                            </Button>
                            <Button
                                disabled={sexState == null}
                                variant="contained"
                                color="primary"
                                onClick={goNextConf}
                                className={classes.button}
                            >
                                {text.next[idioma]}
                            </Button>
                            </div>
                        </div>
                    </StepContent>
                </Step>

                <Step >
                    <StepLabel >{text.labelNickname[idioma]}</StepLabel>
                    <StepContent>
                        <FormControl variant="standard" className={classes.combo}>
                            <TextField 
                                id="standard-basic"
                                placeholder={text.labelNickname[idioma]}
                                value={nicknameState}
                                onChange={setNicknameHandler}   
                            />
                        </FormControl>
                        <div className={classes.actionsContainer}>
                            <div>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={goBackConf}
                                className={classes.button}
                            >
                                {text.back[idioma]}
                            </Button>
                            <Button
                                disabled={nicknameState === ''}
                                variant="contained"
                                color="primary"
                                onClick={goNextConf}
                                className={classes.button}
                            >
                                {text.next[idioma]}
                            </Button>
                            </div>
                        </div>
                    </StepContent>
                </Step>

                <Step >
                    <StepLabel >{text.labelAvatar[idioma]}</StepLabel>
                    <StepContent>                    
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
                                    alt={`${nicknameState}`}
                                    src={preview}
                                    variant="circle"
                                    className={sexState==="F" ? classes.avatarPink : classes.avatarBlue}
                                />
                        </div>
                        <div className={classes.actionsContainer}>
                            <div>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={goBackConf}
                                className={classes.button}
                            >
                                {text.back[idioma]}
                            </Button>
                            <Button
                                disabled={nicknameState === ''}
                                variant="contained"
                                color="primary"
                                onClick={isUserInvited ? goNextConf : sendActivation}
                                className={classes.button}
                            >
                                {text.next[idioma]}
                            </Button>
                            </div>
                        </div>
                    </StepContent>
                </Step>
                
                {isUserInvited 
                ? <Step >
                    <StepLabel >{text.password[idioma]}</StepLabel>
                    <StepContent>
                        
                        <FormControl variant="standard" className={classes.combo}>
                            <TextField
                                variant="standard"
                                required
                                fullWidth
                                name="password"
                                label={text.pass[idioma]}
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={passState.value}
                                helperText={!passState.valid ? text[passState.msg][idioma] : ''}
                                error={!passState.valid}
                                onChange={onChangePass}
                            />
                            
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={goBackConf}
                                        className={classes.button}
                                    >
                                        {text.back[idioma]}
                                    </Button>
                                    <Button
                                        disabled={!passState.valid || !passState.value.length > 0}
                                        variant="contained"
                                        color="primary"
                                        onClick={sendActivation}
                                        className={classes.button}
                                    >
                                        {text.next[idioma]}
                                    </Button>
                                </div>
                            </div>
                        </FormControl>

                    </StepContent>
                </Step>
                : null
                 }

                <Step >
                    <StepLabel error={activationError}>{text.label1[idioma]}</StepLabel>
                </Step>

                <Step >
                    <StepLabel >{text.label3[idioma]}</StepLabel>
                    <StepContent>
                        <Typography>{text.content3[idioma]}</Typography>
                        <div className={classes.actionsContainer}>
                            <div>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleFinish}
                                className={classes.button}
                            >
                                {text.goLogin[idioma]}
                            </Button>
                            </div>
                        </div>
                    </StepContent>
                </Step>

            </Stepper>
            <Divider />
        </div>
    );

}
export default ActivateUserView;