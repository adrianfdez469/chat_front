import React from 'react';
import Tour from 'reactour';
import {makeStyles} from '@material-ui/core/styles';
import text from './idioma.json';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {darkModeAtom, /*anchorElMenuBtn,*/ speedDialStateAtom, addContactViewOpenState} from '../../components/recoil/atoms';
import {focusStepAtom, tourAtom} from './tour.atoms';
import {friendSelector} from '../../components/recoil/selectors';

const useStyle = makeStyles(theme => ({
    helper: {
        padding: '35px'
    }
}));

const AppReactTour = ({idioma}) => {

    const classes = useStyle();
    const [tourState, setTourState] = useRecoilState(tourAtom);
    const darkModeState = useRecoilValue(darkModeAtom);
    const [focusStep, setFocusStep] = useRecoilState(focusStepAtom);
    //const setAnchorElMenuBtn = useSetRecoilState(anchorElMenuBtn);
    const setSpeedDialState = useSetRecoilState(speedDialStateAtom);
    const SetaddContactViewOpenState = useSetRecoilState(addContactViewOpenState);
    const friendDispatcher = useSetRecoilState(friendSelector);


    const TOUR_STEPS = [
        {
            selector: "",
            content: text.tourWelcome[idioma],
        },{
            selector: "#idMainButton",
            content: text.tourSpeedDial[idioma],            
            action: () => {
                setSpeedDialState(true);
            }
        },
        {
            selector: "#Mainspeeddialbutton-action-0",
            content: text.tourSpeedDialAdd[idioma]
        },
        {
            selector: "#idUsuarioEjemplo",
            content: text.tourAddWinUser[idioma],
            position: 'top'
        },
        {
            selector: "#idAddUserIconButton",
            content: text.tourRequestFriendshipButton[idioma],
            position: 'botton'
        },
        {
            selector: "#lista>li",
            content: text.tourFriend[idioma],
            position: 'botton'
        },
        {
            selector: "#idIconInfoFriendStatus",
            content: text.tourFriendDetailStatus[idioma],
            position: 'botton'
        },
        {
            selector: "#idIconFriendActions",
            content: text.tourFriendActions[idioma],
            position: 'botton'
        },
        {
            selector: "#userAvatar",
            content: text.tourStepProfile[idioma],
            stepInteraction: true,
        },
        /*{
            selector: "#cameraIconButton",
            content: text.tourStepProfileCamera[idioma]
        },
        {
            selector: "#idBtnLogout",
            content: text.tourStepProfileLogout[idioma]
        },
        {
            selector: "#profileMenuOptions",
            content: text.tourStepProfileMenuOptions[idioma]
        },
        {
            selector: "#profileOtherMenuOptions",
            content: text.tourStepOtherMenuOptions[idioma]
        },*/
        {
            selector: "",
            content: text.finalStep[idioma]
        }
    ]

    const TOUR_STEPS_STYLED = TOUR_STEPS.map(step => ({...step, style:{
            backgroundColor: darkModeState && "#444"
        }}))
    
    const next = () => {
        switch(focusStep){
            case 2: {
                
                SetaddContactViewOpenState(true);
                setTimeout(() => {
                    setFocusStep(focusStep+1)
                    setSpeedDialState(false);
                }, 300);
                break;
            }
            case 4: {
                
                friendDispatcher({action: 'add', payload: {friend: {
                    email: 'user.email@mail.com',
                    nickname: 'Nickname',
                    friendShipStatus: 2,
                    friendShipStatusCode: 'REQUESTED',
                    isTourTest: true,
                    contactId: 'example_contact_id'
                }}});
                setTimeout(() => {
                    SetaddContactViewOpenState(false);
                    setFocusStep(focusStep+1)
                }, 100);
                break;
            }
            /*case 8: {
                const target = document.getElementById('userAvatarButton');
                setAnchorElMenuBtn(target);
                setTimeout(() => setFocusStep(focusStep+1), 300);

                break;
            }
            case 12:{
                setAnchorElMenuBtn(null);
                setFocusStep(focusStep+1);
                break; 
            }*/
            default: setFocusStep(focusStep+1); 
        }
        
    }
    const prev = () => {
        switch(focusStep){
            case 1: {
                setSpeedDialState(false);
                setFocusStep(focusStep-1);
                break;
            }
            case 3: {
                setSpeedDialState(true);
                SetaddContactViewOpenState(false);
                setFocusStep(focusStep-1);
                break;
            }
            case 5: {
                friendDispatcher({action: 'delete', payload: {
                    friendId: 'example_contact_id'
                }});
                SetaddContactViewOpenState(true);
                setTimeout(() => setFocusStep(focusStep-1), 300);
                break;
            }
            /*case 9: {
                setAnchorElMenuBtn(null);
                setFocusStep(focusStep-1);
                break;
            }  */          
            default: setFocusStep(focusStep-1); 
        }
        
    }

    const beforeClose = () => {
        //setAnchorElMenuBtn(null);
        friendDispatcher({action: 'delete', payload: {
            friendId: 'example_contact_id'
        }});
        setSpeedDialState(false);
    };

    
    return (
        <>
            <Tour
                steps={TOUR_STEPS_STYLED}
                isOpen={tourState}
                onRequestClose={() => setTourState(false)} 
                badgeContent={(curr, tot) => `${curr} ${text.of[idioma]} ${tot}`}
                accentColor='salmon'
                closeWithMask={false}
                disableInteraction
                rounded={10} 
                maskSpace={5}
                showNavigation={false}
                goToStep={focusStep}
                nextStep={next}
                prevStep={prev}
                onBeforeClose={beforeClose}                 
                className={classes.helper}
            />
        </>
      )
}
//export default React.memo(AppTourView);
export default React.memo(AppReactTour);