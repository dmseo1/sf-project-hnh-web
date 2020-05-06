import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

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
// @material-ui/icons
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";
// core components
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Clearfix from "components/Clearfix/Clearfix.js";


//http connection을 위함
import HttpRequest from "../../utils/UseFetch.js"

//Typography
import Info from "components/Typography/Info.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";
import naverIcon from "assets/img/icons/naver.png";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 500);
  const classes = useStyles();
  const { ...rest } = props;

  //아이디/비밀번호 입력 여부 저장
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [isIdEmpty, setIdEmpty] = useState(false);
  const [isPwEmpty, setPwEmpty] = useState(false);

  const [redirectURL, setRedirectURL] = useState('/');
  const [canRedirect, setCanRedirect] = useState(false);

  //로그인 성공 여부 저장 - 로그인 실패 메시지를 출력 여부를 결정하기 위함
  const [isLoginSucceed, setLoginSucceed] = useState(true);



  const handleIdChange = (e) => {
    setLoginId(e.target.value);
  }

  const handlePwChange = (e) => {
    setLoginPw(e.target.value);
  }

  //메인 페이지 로드 완료시 변수 설정
  useEffect(() => {

  });


  //직접 로그인 함수
  const webLogin = (e) => {
    //e.preventDefault(); //태그의 고유의 기능이 작동하는 것을 중단시킨다.
    console.log(`ID: ${loginId}, PW: ${loginPw}`);

    if (loginId === '') {
      setIdEmpty(true);
      setPwEmpty(false);
      setLoginSucceed(true);
    } else if (loginPw === '') {
      setIdEmpty(false);
      setPwEmpty(true);
      setLoginSucceed(true);
    } else {
      setIdEmpty(false);
      setPwEmpty(false);
      HttpRequest('http://13.124.29.106:8080/login', 'POST', JSON.stringify({ id: loginId, password: loginPw }),
        (res) => {
          console.log(`Response from server...: ${res}`);
          if (res.response === "OK") {
            setLoginSucceed(true);
            responseDirectLogin(res.data);
          } else if (res.response === "FAILED-ID" || res.response === "FAILED-PW") {
            setLoginSucceed(false);
          }
        }
      );
    }
  }


  //구글 로그인
  const responseGoogleLogin = (res) => {

  }

  //네이버 로그인
  const responseNaverLogin = (res) => {

  }

  //직접 로그인
  const responseDirectLogin = (res) => {
    //정보 구성
    const token = {
      id: res.id,
      nickname: res.nickname,
      email: res.email,
      provider: 'direct'
    };
    doSignIn(token);
  }

  //localStorage에 토큰 저장
  const doSignIn = (token) => {
    const { id, nickname, email, provider } = token;
    window.localStorage.setItem('hnh-id', id);
    window.localStorage.setItem('hnh-nickname', nickname);
    window.localStorage.setItem('hnh-email', email);
    window.localStorage.setItem('hnh-provider', provider);
    console.log("정보가 저장되었습니다");
    console.log(`저장 정보: ${window.localStorage.getItem('hnh-id')}`);
    setCanRedirect(true);
  }

  return (
    <div>

      {canRedirect ? <Redirect to={redirectURL} /> :
        <div>
          {/* <Header
            absolute
            color="transparent"
            brand="Home in Hand"
            rightLinks={<HeaderLinks />}
            {...rest}
          /> */}
          <div
            className={classes.pageHeader}
            style={{
              backgroundImage: "url(" + image + ")",
              backgroundSize: "cover",
              backgroundPosition: "top center"
            }}
          >
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={4}>
                  <Card className={classes[cardAnimaton]}>
                    <form className={classes.form} method="POST">
                      <CardHeader color="primary" className={classes.cardHeader}>
                        <h4>Home in Hand에 로그인</h4>
                        <div className={classes.socialLine}>
                          <Button
                            justIcon
                            href="#pablo"
                            target="_blank"
                            color="transparent"
                            onClick={e => e.preventDefault()}
                          >
                            <i className={"fab fa-google"} />
                          </Button>

                          <Button
                            justIcon
                            href="#pablo"
                            target="_blank"
                            color="transparent"
                            onClick={e => e.preventDefault()}
                          >
                            <div
                              className={classes.pageHeader}
                              style={{
                                backgroundImage: "url(" + naverIcon + ")",
                                backgroundSize: "cover",
                              }}
                            />
                          </Button>

                        </div>
                      </CardHeader>
                      <p className={classes.divider}>또는 직접 로그인</p>
                      <CardBody>
                        {(isIdEmpty && <SnackbarContent
                          message={
                            <span>
                              아이디 또는 이메일을 입력하세요.
                        </span>
                          }
                          color="warning"
                          icon={Warning}
                        />)}

                        {(isPwEmpty && <SnackbarContent
                          message={
                            <span>
                              비밀번호를 입력하세요.
                        </span>
                          }
                          color="warning"
                          icon={Warning}
                        />)}

                        {(!isLoginSucceed && <SnackbarContent
                          message={
                            <span>
                              아이디/이메일 또는 비밀번호를 다시 확인해주세요.
                        </span>
                          }
                          color="danger"
                          icon="info_outline"
                        />)}

                        <CustomInput
                          labelText="ID or Email"
                          id="id"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "text",
                            onChange: handleIdChange,
                            endAdornment: (
                              <InputAdornment position="end">
                                <People className={classes.inputIconsColor} />
                              </InputAdornment>
                            )
                          }}
                        />
                        <CustomInput
                          labelText="Password"
                          id="password"

                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            type: "password",
                            onChange: handlePwChange,
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon className={classes.inputIconsColor}>
                                  lock_outline
                            </Icon>
                              </InputAdornment>
                            ),
                            autoComplete: "off"
                          }}
                        />
                      </CardBody>
                      <CardFooter className={classes.cardFooter}>
                        <Button simple color="primary" size="lg" onClick={webLogin}>
                          LOGIN
                    </Button>
                      </CardFooter>
                      <CardFooter className={classes.cardFooter}>
                        <Info>아직 회원이 아니신가요? </Info> <Button simple color="primary" size="lg" href='/join'>
                          회원가입
                    </Button>
                      </CardFooter>
                    </form>
                  </Card>
                </GridItem>
              </GridContainer>
            </div>
            <Footer whiteFont />
          </div>
        </div>
      }


    </div>
  );
}
