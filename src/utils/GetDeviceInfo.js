import { deviceDetect } from 'react-device-detect';

const getDeviceInfo = () => {
    const detection = deviceDetect();
    return `${detection.osName} ${detection.osVersion} ${detection.browserName} ${detection.browserMajorVersion}`;
}

export default getDeviceInfo;