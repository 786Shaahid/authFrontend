import {useEffect} from 'react'
const DeviceTypeChecker = () => {
    const isMobile = () => {
        return window.innerWidth <= 768;
    };

    // Call showAlertIfMobile when the component mounts
    useEffect(() => {
        if (isMobile()) {
            window.alert('This Application Is Optimized For Desktop Screens.');
        }
    }, []);

    
};

export default DeviceTypeChecker;
