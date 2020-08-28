import React, {useState, useEffect, useCallback} from 'react';
import {useRecoilValue} from 'recoil';
import useAxiosHook from '../../utils/axiosHook';
import useNotification from '../../components/uiComponents/notification/notification.hook';
import {idiomaState} from '../../components/recoil/atoms';

import FeedbackView from './feedback.view';
import text from './idioma.json';


const FeedbackController = ({close}) => {

    const idioma = useRecoilValue(idiomaState);
    const  {postRequest}  = useAxiosHook();

    const [comentState, setComntState] = useState('');
    const [globalState, setGlobalState] = useState({
        design: 0,
        performance: 0,
        usability: 0,
        overall: 0
    });
    

    const onCommentChange = ({target: {value}}) => {
        setComntState(value);
    }

    const calcProm = (desing, performance, usability, newValue = 0) => {
        let cant = newValue > 0 ? 1 : 0;
        let promedio = newValue;
        if(desing > 0) {
            promedio += desing;
            cant++; 
        }
        if(performance > 0){
            promedio += performance;
            cant++;
        }
        if(usability > 0){
            promedio += usability;
            cant++;
        }
        if(cant > 0){
            promedio = promedio / cant;
            const restoProm = promedio % 0.5;
            promedio = promedio - restoProm;
        }
        
        return promedio;
    }
    const onChange = useCallback((newValue, type) => {

        setGlobalState(oldState => {
            let desing = 0;
            let performance = 0;
            let usability = 0;
            if(type !== 'design' && oldState.design > 0){
                desing = oldState.design;
            }
            if(type !== 'performance' && oldState.performance > 0){
                performance = oldState.performance;
            }
            if(type !== 'usability' && oldState.usability > 0){
                usability = oldState.usability;
            }
            

            let promedio = calcProm(desing, performance, usability, newValue);
            
            const newGlobalState = {...oldState, [type]: newValue, overall: promedio};
            return newGlobalState;

        });
    }, []);
    
    

    useEffect(() => {

        postRequest({
            url: '/users/getUserFeedback',
            messageOnError: text.lbOnLoadError[idioma],
            doFnAfterSuccess: resp => {
                if(resp.status === 200){
                    const rating = resp.data.rating;
                    const stateObj = {
                        design: rating.design,
                        performance: rating.performance,
                        usability: rating.usability,
                        overall: calcProm(rating.design, rating.performance, rating.usability)
                    }
                    
                    setGlobalState(stateObj);
                    setComntState(rating.comment);
                }
            }
        })
    }, []);

    const onSave = () => {
        postRequest({
            url: "/users/saveFeedback",
            bodyParams: {
                designRating: globalState.design, 
                performaceRating: globalState.performance, 
                usabilityRating: globalState.usability, 
                comment: comentState
            },
            messageOnError: text.lbOnSaveError[idioma],
            messageOnSuccess: text.lbOnsaveOk[idioma],
            doFnAfterSuccess: resp => {
                close();
            }
        });
    }

    return <FeedbackView 
        text={text}
        idioma={idioma}

        globalState={globalState}
        onChange={onChange}
        
        comentState={comentState}
        onCommentChange={onCommentChange}

        onSave={onSave}
    />;

}
export default FeedbackController;