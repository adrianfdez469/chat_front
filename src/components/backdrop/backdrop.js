import React from 'react';
import {useRecoilValue} from 'recoil';
import {backdropState} from '../recoil/atoms';

const Backdrop = props => {

    const useBackdrop = useRecoilValue(backdropState);
    
    if(useBackdrop){
        return <div className="backdrop">
            <div class="loader">Loading...</div>
        </div>;
    }else{
        return null;
    }

}
export default Backdrop;