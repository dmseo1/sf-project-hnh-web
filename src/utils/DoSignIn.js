const doSignIn = (token) => {
    //localStorage에 토큰 저장
    const { id, nickname, email, provider, mToken } = token;
    window.localStorage.setItem('hnh-id', id);
    window.localStorage.setItem('hnh-nickname', nickname);
    window.localStorage.setItem('hnh-email', email);
    window.localStorage.setItem('hnh-token', mToken);
    window.localStorage.setItem('hnh-provider', provider);
    console.log('localStorage에 로그인 정보가 저장됨');
    return true; 
}

export default doSignIn;