/*eslint-disable*/
import React, { useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from "@material-ui/core/Tooltip";
import Divider from '@material-ui/core/Divider';
import Hidden from "@material-ui/core/Hidden";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// http request
import HttpRequest from "../../utils/UseFetch.js";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

const checkLoginValidation = () => {

}




  // HttpRequest('http://13.124.29.106:8080/login/validation', 'POST', JSON.stringify({ id: loginId, password: loginPw }),
  //       (res) => {
  //         console.log(`Response from server...: ${res}`);
  //         if (res.response === "OK") {
  //           setLoginSucceed(true);
  //           responseDirectLogin(res.data);
  //         } else if (res.response === "FAILED-ID" || res.response === "FAILED-PW") {
  //           setLoginSucceed(false);
  //         }
  //       }
  // );



export default function HeaderLinks(props) {
  const classes = useStyles();
  return (

    
    <List className={classes.list}>



      <ListItem button component="a" href="/mypage" className={classes.listItem}>
        <div className={classes.drawerMenuPadding} ><h5>{window.localStorage.getItem('hnh-nickname')}님</h5></div>
      </ListItem>

     

      <ListItem button component="a" href="/inquiry" className={classes.listItem}>
      <div className={classes.drawerMenuPadding} ><h5>1:1 문의</h5></div>
      </ListItem>

    

      <ListItem button component="a" href="/logout" className={classes.listItem}>
        <div className={classes.drawerMenuPadding} ><h5>로그아웃</h5></div>
      </ListItem>

     
      
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Components"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/" className={classes.dropdownLink}>
              All components
            </Link>,
            <a
              href="https://creativetimofficial.github.io/material-kit-react/#/documentation?ref=mkr-navbar"
              target="_blank"
              className={classes.dropdownLink}
            >
              Documentation
            </a>
          ]}
        />
      </ListItem>
    </List>
  );
}
