import {useEffect} from 'react'
const DeviceTypeChecker = () => {
    const isMobile = () => {
        return window.innerWidth <= 768;
    };

    const showAlertIfMobile = () => {
        if (isMobile()) {
            window.alert('This Application Is Optimized For Desktop Screens.');
        }
    };  

    // Call showAlertIfMobile when the component mounts
    useEffect(() => {
        showAlertIfMobile();
    }, []);

    
};

export default DeviceTypeChecker;
