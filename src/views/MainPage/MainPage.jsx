import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

// nodejs library that concatenates classes
import classNames from "classnames";



// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";


// sections for this page
import SectionBasics from "./Sections/SectionBasics.js";
import SectionNavbars from "./Sections/SectionNavbars.js";
import SectionTabs from "./Sections/SectionTabs.js";
import SectionPills from "./Sections/SectionPills.js";
import SectionNotifications from "./Sections/SectionNotifications.js";
import SectionTypography from "./Sections/SectionTypography.js";
import SectionJavascript from "./Sections/SectionJavascript.js";

import styles from "assets/jss/material-kit-react/views/components.js";

//modal
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";

//로그인 후 탭 및 아이콘

import CustomTabs from "components/CustomTabs/CustomTabs.js";
import RouterIcon from '@material-ui/icons/Router';
import AddIcon from '@material-ui/icons/Add';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });


const useStyles = makeStyles(styles);

export default function MainPage(props) {

    const classes = useStyles();
    const { ...rest } = props;
    const [ isModalUp, setModalUp ] = useState(true);

    return (
        <div>
            {(window.localStorage.getItem('hnh-id') === null) ?
                (<Parallax image={require("assets/img/bg4.jpg")}>
                    <div className={classes.container}>
                        <GridContainer>
                            <GridItem>
                                <div className={classes.brand}>
                                    <h1 className={classes.title}>Home in Hand</h1>
                                    <h3 className={classes.subtitle}>
                                        우리 집 가전제품을 어디서든 내 손에서
                                    </h3>
                                    <Button type="button" color="primary" size='large' href="/login">로그인</Button>
                                </div>
                            </GridItem>
                        </GridContainer>
                    </div>
                </Parallax>)
                :
                (<div>
                    <Header
                        brand="Home in Hand"
                        rightLinks={<HeaderLinks />}
                        fixed
                        color="transparent"
                        changeColorOnScroll={{
                            height: 400,
                            color: "white"
                        }}
                        {...rest}
                        
                    />

                    <Parallax image={require("assets/img/bg4.jpg")}>
                        <div className={classes.container}>
                            <GridContainer>
                                <GridItem>
                                    <div className={classes.brand}>
                                        <h1 className={classes.title}>Home in Hand</h1>
                                        <h3 className={classes.subtitle}>
                                            우리 집 가전제품을 어디서든 내 손에서
                                        </h3>
                                    </div>
                                </GridItem>
                            </GridContainer>
                        </div>
                    </Parallax>

                    <div className={classNames(classes.main, classes.mainRaised)}>
                    <CustomTabs
                            headerColor="primary"
                            tabs={[
                            {
                                tabName: "나의 기기",
                                tabIcon: RouterIcon,
                                tabContent: (
                                <p className={classes.textCenter}>
                                    I think that’s a responsibility that I have, to push
                                    possibilities, to show people, this is the level that
                                    things could be at. So when you get something that has
                                    the name Kanye West on it, it’s supposed to be pushing
                                    the furthest possibilities. I will be the leader of a
                                    company that ends up being worth billions of dollars,
                                    because I got the answers. I understand culture. I am
                                    the nucleus.
                                </p>
                                )
                            },
                            {
                                tabName: "기기 등록",
                                tabIcon: AddIcon,
                                tabContent: (
                                <p className={classes.textCenter}>
                                    I think that’s a responsibility that I have, to push
                                    possibilities, to show people, this is the level that
                                    things could be at. I will be the leader of a company
                                    that ends up being worth billions of dollars, because
                                    I got the answers. I understand culture. I am the
                                    nucleus. I think that’s a responsibility that I have,
                                    to push possibilities, to show people, this is the
                                    level that things could be at.
                                </p>
                                )
                            }
                            ]}
                        />
                    </div>

                    { // 모달 표시
                        ((typeof(props.location.state) !== 'undefined' &&  props.location.state.from === 'join-complete') &&
                        <Dialog
                            classes={{
                                root: classes.center,
                                paper: classes.modal
                            }}
                            open={isModalUp}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={() => setModalUp(false)}
                            aria-labelledby="modal-slide-title"
                            aria-describedby="modal-slide-description"
                        >
                            <DialogTitle
                                id="classic-modal-slide-title"
                                disableTypography
                                className={classes.modalHeader}
                            >
                                <IconButton
                                    className={classes.modalCloseButton}
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    onClick={() => setModalUp(false)}
                                >
                                    <Close className={classes.modalClose} />
                                </IconButton>
                              
                            </DialogTitle>
                            <DialogContent
                                id="modal-slide-description"
                                className={classes.modalBody}
                            >
                                <h5>회원가입을 축하합니다</h5>
                            </DialogContent>
                            <DialogActions
                                className={classes.modalFooter + " " + classes.modalFooterCenter}
                            >
                                <Button onClick={() => setModalUp(false)} color="success">
                                    확인
                                </Button>
                            </DialogActions>
                        </Dialog>)
                    }

                    <Footer />
                </div>)}
        </div>
    );
}
