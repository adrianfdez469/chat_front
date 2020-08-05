import React from 'react';
import {useRecoilValue} from 'recoil';
import {backdropState} from '../recoil/atoms';

const Backdrop = props => {

    const useBackdrop = useRecoilValue(backdropState);
    
    if(useBackdrop){
        console.log(`se muestra backdrop ${useBackdrop}`)
        return <div className="backdrop">
            <div class="loader">Loading...</div>
        </div>;
    }else{
        return null;
    }
/*
    const cmpBody = useBackdrop ? <div className="backdrop"></div> : <></>;

    return (
        {cmpBody}
    );*/

}
export default Backdrop;