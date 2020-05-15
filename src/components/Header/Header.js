import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import styles from "assets/jss/material-kit-react/components/headerStyle.js";

//http connection
import HttpRequest from '../../utils/UseFetch.js';

//login valid chk meterial
import getDeviceInfo from '../../utils/GetDeviceInfo.js'

require('dotenv').config();

const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();
  const [isDrawerOpened, setDrawerOpened] = useState(false);
  const [isLoginValid, setLoginValid] = useState(true);

  React.useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  });

  //로그인 유효성 체크
  const checkLoginValidation = () => {
    window.localStorage.getItem('hnh-id')
    HttpRequest(`${process.env.REACT_APP_RESTAPI_SERVER}/login_valid_check`, 'POST', JSON.stringify({
      id: window.localStorage.getItem('hnh-id'),
      deviceInfo: getDeviceInfo(),
      provider: window.localStorage.getItem('hnh-provider'),
      token: window.localStorage.getItem('hnh-token')
    }),
      (res) => {
        if (res.response === "NO-TOKEN" || res.response === "INVALID-TOKEN") {
          setLoginValid(false);
        } else if (res.response === "OK") {
          setLoginValid(true);
        } else {
          //
        }
      }
    );
  }

  const handleDrawerToggle = () => {
    setDrawerOpened(!isDrawerOpened);
  };


  const headerColorChange = () => {
    const { color, changeColorOnScroll } = props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  };
  const { color, deviceLinks, rightLinks, leftLinks, brand, fixed, absolute } = props;
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed
  });
  const brandComponent = <Button className={classes.title}>{brand}</Button>;

  useEffect(() => {
    checkLoginValidation();
  });

  return (
    <div>
      {(!isLoginValid && <Redirect to="/logout" />)}
      <AppBar className={appBarClasses}>
        {/*  */}

        <div className={classes.menuButton}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>

        </div>


        <Drawer
          variant="temporary"
          anchor={"left"}
          open={isDrawerOpened}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={handleDrawerToggle}
        >

          <div>
            Home in Hand

            {leftLinks}
            {deviceLinks}
            <Hidden mdUp implementation="css">
              {rightLinks}
            </Hidden>

          </div>
        </Drawer>


        <Toolbar className={classes.container}>
          {leftLinks !== undefined ? brandComponent : null}
          <div className={classes.flex}>
            {leftLinks !== undefined ? (
              <Hidden mdDown implementation="css">
                {leftLinks}
              </Hidden>
            ) : (
                brandComponent
              )}
          </div>

          <Hidden smDown implementation="css">
            {rightLinks}
          </Hidden>


        </Toolbar>


      </AppBar>
    </div>

  );
}

Header.defaultProp = {
  color: "white"
};

Header.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark"
  ]),
  rightLinks: PropTypes.node,
  leftLinks: PropTypes.node,
  deviceLinks: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark"
    ]).isRequired
  })
};
