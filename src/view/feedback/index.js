import React from 'react';

import FeedbackController from './feeedback.controller';

const Feedback = React.memo(props => {
    
    return <FeedbackController {...props} />;

});
export default Feedback;