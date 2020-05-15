//토큰 생성 유틸

const randomString = require('crypto-random-string');

const generateToken = () => {
    return randomString({length : 64, type : 'base64'});
}

export default generateToken;