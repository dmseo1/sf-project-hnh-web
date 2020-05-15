import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

//notification 도구

// core components
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Clearfix from "components/Clearfix/Clearfix.js";


//디바이스 정보
import getDeviceInfo from "../../utils/GetDeviceInfo.js";

//http connection을 위함
import HttpRequest from "../../utils/UseFetch.js"

//dotenv
import dotenv from 'dotenv';

//Typography
import Info from "components/Typography/Info.js";
import Warning from "components/Typography/Warning.js";
import Danger from "components/Typography/Danger.js";
import Success from "components/Typography/Success.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);
dotenv.config();


export default function JoinPage(props) {
    const { ...rest } = props;

    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

    //회원정보 입력 상태 저장
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userRePw, setUserRePw] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userNickname, setUserNickname] = useState('');

    //아이디, 비밀번호, 이메일 유효성 검사 상태 저장
    const [isIdChkInit, setIdChkInit] = useState(false);
    const [isPwChkInit, setPwChkInit] = useState(false);
    const [isRePwChkInit, setRePwChkInit] = useState(false);
    const [isEmailChkInit, setEmailChkInit] = useState(false);
    const [isNicknameChkInit, setNicknameChkInit] = useState(false);

    const [isIdChked, setIdChked] = useState(false);
    const [isPwChked, setPwChked] = useState(false);
    const [isRePwChked, setRePwChked] = useState(false);
    const [isEmailChked, setEmailChked] = useState(false);
    const [isNicknameChked, setNicknameChked] = useState(false);

    const [idChkMessage, setIdChkMessage] = useState("");
    const [pwChkMessage, setPwChkMessage] = useState("");
    const [rePwChkMessage, setRePwChkMessage] = useState("");
    const [emailChkMessage, setEmailChkMessage] = useState("");
    const [nicknameChkMessage, setNicknameChkMessage] = useState("");

    //전체 유효성 검사 상태
    const [canJoin, setJoin] = useState(true);
    const [ isJoinComplete, setJoinComplete ] = useState(false);


    setTimeout(function () {
        setCardAnimation("");
    }, 500);
    const classes = useStyles();

    //인풋 박스 상태 변화 감지
    const handleIdChange = (e) => {
        setUserId(e.target.value);
        setIdChkInit(true);
        //TODO: 아이디 형식 체크
        const regId = /^[a-zA-Z][a-zA-Z0-9]{2,19}$/;
        if(!regId.test(e.target.value)) {
            setIdChked(false);
            setIdChkMessage("아이디는 3-20자의 영문자, 숫자 조합이어야 하며, 첫 글자는 영문자로 시작해야 합니다.");
            return;
        }

        //아이디 중복 검사
        
        HttpRequest(`${process.env.REACT_APP_RESTAPI_SERVER}/join/id_dup_chk`, 'POST', JSON.stringify({ id: e.target.value }),
        (res) => {
          console.log(`Response from server...: ${res}`);
          if (res.response === "OK") {
            setIdChked(true);
            setIdChkMessage("사용 가능한 아이디입니다.");
          } else {
            setIdChked(false);
            setIdChkMessage("이미 등록된 아이디입니다.");
          }
        });
    }

    const handlePwChange = (e) => {
        setUserPw(e.target.value);
        setPwChkInit(true);
        const regPw = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*()+=<>,.-]).{8,20}$/;
        if(!regPw.test(e.target.value)) {
            setPwChked(false);
            setPwChkMessage("비밀번호는 영문자, 숫자, 특수문자를 모두 사용한 8-20자여야 합니다.")
        } else {
            setPwChked(true);
            setPwChkMessage("사용 가능한 비밀번호입니다.");
        }

        if(e.target.value !== userRePw) {
            setRePwChked(false);
            setRePwChkMessage("두 비밀번호가 일치하지 않습니다.");
        } else {
            setRePwChked(true);
            setRePwChkMessage("두 비밀번호가 일치합니다.");
        }
    }

    const handleRePwChange = (e) => {
        setUserRePw(e.target.value);
        setRePwChkInit(true);

        if(e.target.value === '') {
            setRePwChkInit(false);
            setRePwChked(false);
            return;
        }
     
        if(e.target.value !== userPw) {
            setRePwChked(false);
            setRePwChkMessage("두 비밀번호가 일치하지 않습니다.");
        } else {
            setRePwChked(true);
            setRePwChkMessage("두 비밀번호가 일치합니다.");
        }
    }

    const handleEmailChange = (e) => {
        setUserEmail(e.target.value);
        setEmailChkInit(true);

        //이메일 형식 체크
        const regEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
        if(!regEmail.test(e.target.value)) {
            setEmailChked(false);
            setEmailChkMessage("이메일 형식이 잘못되었습니다.");
            return;
        }
        
        //이메일 중복 체크
        HttpRequest(`${process.env.REACT_APP_RESTAPI_SERVER}/join/email_dup_chk`, 'POST', JSON.stringify({ email: e.target.value }),
        (res) => {
          console.log(`Response from server...: ${res}`);
          if (res.response === "OK") {
            setEmailChked(true);
            setEmailChkMessage("사용 가능한 이메일입니다.");
          } else {
            setEmailChked(false);
            setEmailChkMessage("이미 등록된 이메일입니다.");
          }
        });
    }

    const handleNicknameChange = (e) => {
        setUserNickname(e.target.value);
        setNicknameChkInit(true);

        if(e.target.value.length < 2 || e.target.value.length > 20) {
            setNicknameChked(false);
            setNicknameChkMessage("닉네임은 2-20자로 입력해주세요.");
        } else {
            setNicknameChked(true);
            setNicknameChkMessage("사용 가능한 닉네임입니다.");
        }
    }

    //회원가입 완료
    const userJoin = () => {
        if(isIdChked && isPwChked && isRePwChked && isEmailChked && isNicknameChked) {
            setJoin(true);
            HttpRequest(`${process.env.REACT_APP_RESTAPI_SERVER}/join/confirm`, 'POST', 
                JSON.stringify({ id: userId, password: userPw, email: userEmail, nickname: userNickname, deviceInfo: getDeviceInfo() }),
                (res) => {
                console.log(`Response from server...: ${res}`);
                if (res.response === "OK") {
                    //로컬 스토리지 저장
                    window.localStorage.setItem('hnh-id', userId);
                    window.localStorage.setItem('hnh-nickname', userNickname);
                    window.localStorage.setItem('hnh-email', userEmail);
                    window.localStorage.setItem('hnh-token', res.data.token);
                    window.localStorage.setItem('hnh-provider', 'direct');
                    //리다이렉트 실행
                    setJoinComplete(true);
                } else {
                    //
                }
            });  
        } else {
            setJoin(false);
            setJoinComplete(false);
        }
    }

    return (
        <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}>
            { isJoinComplete && (<Redirect to={{ pathname: "/", state: { from: "join-complete" }}}> </Redirect>)}
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={4}>
                        <Card className={classes[cardAnimaton]}>
                            <form className={classes.form} method="POST">

                                <p className={classes.divider}>회원가입</p>
                                <CardBody>
                                    <CustomInput
                                        labelText="ID"
                                        id="joining_id"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "text",
                                            onChange: handleIdChange,
                                          
                                        }}
                                    />
                                    {isIdChkInit && (isIdChked ? (<Success> {idChkMessage} </Success>) : (<Danger> {idChkMessage}</Danger>))}
                                    

                                    <CustomInput
                                        labelText="Password"
                                        id="joining_password"

                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "password",
                                            onChange: handlePwChange,
                                            autoComplete: "off"
                                        }}
                                    />
                                    {isPwChkInit && (isPwChked ? (<Success> {pwChkMessage} </Success>) : (<Danger> {pwChkMessage} </Danger>))}

                                    <CustomInput
                                        labelText="Password 재입력"
                                        id="joining_re_password"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "password",
                                            onChange: handleRePwChange,
                                            autoComplete: "off"
                                        }}
                                    />          
                                    {isPwChked && isRePwChkInit && (isRePwChked ? (<Success> {rePwChkMessage} </Success>) : (<Danger> {rePwChkMessage} </Danger>))}

                                    <CustomInput
                                        labelText="Email"
                                        id="joining_email"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "text",
                                            onChange: handleEmailChange,
                                          
                                        }}
                                    />
                                    {isEmailChkInit && (isEmailChked ? (<Success> {emailChkMessage} </Success>) : (<Danger> {emailChkMessage}</Danger>))}            

                                    <CustomInput
                                        labelText="Nickname"
                                        id="joining_nickname"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "text",
                                            onChange: handleNicknameChange,
                                        }}
                                    />
                                    {isNicknameChkInit && (isNicknameChked ? (<Success> {nicknameChkMessage} </Success>) : (<Danger> {nicknameChkMessage}</Danger>))}   
                                </CardBody>
                                <CardFooter className={classes.cardFooter}>
                                    <Button simple color="primary" size="lg" onClick={userJoin}>
                                        가입 완료
                                    </Button>
                                </CardFooter>

                                <CardFooter className={classes.cardFooter}>
                                    {!canJoin && (<Danger> 회원 정보를 모두 올바르게 입력하세요. </Danger>)}
                                </CardFooter>
                            </form>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    );


}