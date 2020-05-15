import { Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

//URL 파라미터 파싱 함수
import getUrlParams from '../../utils/GetUrlParams.js';

//환경변수 가져오기
import dotenv from 'dotenv';

//http connection을 위함
import HttpRequest from "../../utils/UseFetch.js"

//기기 정보 가져오기
import getDeviceInfo from "../../utils/GetDeviceInfo.js";

//최종 로그인 처리 메서드
import doSignIn from "../../utils/DoSignIn.js";

dotenv.config();


export default function NaverLoginOKPage(props) {
    const { ...rest } = props;
    const [ canRedirect, setCanRedirect ] = useState(false);
    const [ isErrorOccured, setErrorOccured ] = useState(false);

    //URL 파라미터 가져오기
    const params = getUrlParams();
    useEffect(() => {
        HttpRequest(`${process.env.REACT_APP_RESTAPI_SERVER}/login/naver`, 'POST', JSON.stringify({code: params.code, deviceInfo: getDeviceInfo()}),
         (res) => {
            console.log(res);
            if(res.response === "OK") {
                //유저 정보 가져오기
                const userInfo = res.data;
                //토큰 생성
                const token = {
                    id: userInfo.id,
                    nickname: userInfo.nickname,
                    email: userInfo.email,
                    mToken: userInfo.token,
                    provider: 'naver'
                };
                //최종 로그인 처리
                setCanRedirect(doSignIn(token));
            } else {
                console.log(`${res.response} : ${res.data}`);
            }
        });
    }, [1]);


    return (
        <div>
            { canRedirect && <Redirect to="/" /> } 
            { isErrorOccured && <Redirect to="/login" />}
        </div>
    );
}