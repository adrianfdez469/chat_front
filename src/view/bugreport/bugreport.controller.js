import React, {useState} from 'react';
import {useRecoilValue} from 'recoil';
import useAxiosHook from '../../utils/axiosHook';
import {idiomaState} from '../../components/recoil/atoms';
import BugReportView from './bugreport.view';
import text from './idioma.json';

const BugReportController = ({close}) => {

    const idioma = useRecoilValue(idiomaState);
    
    const {postRequest} = useAxiosHook();

    const [comentState, setComntState] = useState('');

    const onCommentChange = ({target: {value}}) => {
        setComntState(value);
    }

    const onSend = () => {
        postRequest({
            url: "/bugs/saveBugReport",
            bodyParams: {
                description: comentState
            },
            messageOnError: text.sendError[idioma],
            messageOnSuccess: text.sendOk[idioma],
            doFnAfterSuccess: resp => {
                close();
            }
        });
    }


    return <BugReportView 
        text={text}
        idioma={idioma}

        comentState={comentState}
        onCommentChange={onCommentChange}

        onSend={onSend}
    />;

}
export default BugReportController;