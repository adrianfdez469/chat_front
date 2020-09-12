import React, {useState, useEffect} from 'react';
  
let hidden, visibilityChange; 
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
    hidden = "hidden";
    visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
}

const usePageVisibility = () => {

    const [isVisible, setIsVisible] = useState(true);

    

    const handleVisibilityChange = () => {
        if (document[hidden]) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    }

    useEffect(() => {
        if (typeof document.addEventListener === "undefined" || hidden === undefined) {
            console.log("Switch to a Google Chrome or Firefox browser, that supports the Page Visibility API.");
            setIsVisible(false);
        } else {
            document.addEventListener(visibilityChange, handleVisibilityChange, false);
        }
    }, []);

    return isVisible;

}
  export default usePageVisibility;