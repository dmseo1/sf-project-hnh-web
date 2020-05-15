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


export default function HeaderLinks(props) {
  const classes = useStyles();
  return (


    <List className={classes.list}>




      <ListItem button component="a" href="/device/list" className={classes.listItem}>
        <div className={classes.drawerMenuPadding}><h5>기기 조회</h5></div>

      </ListItem>



      <ListItem button component="a" href="/device/add" className={classes.listItem}>
        <div className={classes.drawerMenuPadding}><h5>기기 등록</h5></div>
      </ListItem>




    </List>
  );
}
