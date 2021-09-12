import React, { Fragment, useState, useEffect } from 'react'
import { allClass } from 'src/helper/customHooks/customModuleClassMethod'
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { useHistory, Link, NavLink } from "react-router-dom"
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import mdl from './NavbarMenu.module.css'

function NavBarHookBootstrap(props) {
    // // ----------Localization hooks & Router Hooks-------------
    const { t, i18n } = useTranslation('common');
    let history = useHistory()

    // // ----------Props & context & ref ------------------------------
    let isAuthenticated = props.isAuthenticated


    const changi18nextLanguage = () => {
    }

    const handleSignOut = () => {
        Cookies.remove('reduxToolkitToken')
        history.push(`/`)
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand exact to="#home">NextJs</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink exact to='/' >
                            <div className={allClass("", "link", mdl)}>
                                {t("Home")}
                            </div>
                        </NavLink>
                        <NavLink exact to='/about'>
                            <div className={allClass("", "link", mdl)}>
                                <div className={allClass("", "link", mdl)}>{t("About")}</div>
                            </div>
                        </NavLink>
                        {isAuthenticated &&
                            <NavLink exact to='/images'>
                                <div className={allClass("", "link", mdl)}>
                                    <div className={allClass("", "link", mdl)}>{t("Images")}</div>
                                </div>
                            </NavLink>
                        }

                    </Nav>
                    <Nav>
                        <NavDropdown title={t("languages")} id="collasible-nav-dropdown">
                            <NavDropdown.Item>
                                <div onClick={() => changi18nextLanguage("en")} >
                                    <img src={"united_states"} alt='English' height={30} width={50} />
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <div onClick={() => changi18nextLanguage("hi")} >
                                    <img src="/flag/india.svg" alt='हिंदी' height={30} width={50} />
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <div onClick={() => changi18nextLanguage("chi")} >
                                    <img src="/flag/china.svg" alt='中国人' height={30} width={50} />
                                </div>
                            </NavDropdown.Item>
                        </NavDropdown>
                        {isAuthenticated &&
                            <NavDropdown title={t("Task")} className={allClass("", "nav_dropdown", mdl)} id="collasible-nav-dropdown">
                                <NavDropdown.Item>
                                    <NavLink exact to='/task/retrieve'>
                                        <div className={allClass("", "linkBlack", mdl)}>
                                            {t("Retrieve task")}
                                        </div>
                                    </NavLink>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item>
                                    <NavLink exact to='/task/create'>
                                        <div className={allClass("", "linkBlack", mdl)}>
                                            {t("Create task")}
                                        </div>
                                    </NavLink>
                                </NavDropdown.Item>
                            </NavDropdown>
                        }
                        <NavDropdown title={t("Users")} className={allClass("", "nav_dropdown", mdl)} id="collasible-nav-dropdown">
                            {isAuthenticated ?
                                (<Fragment>
                                    <NavDropdown.Item>
                                        <NavLink exact to='/user/profile'>
                                            <div className={allClass("", "linkBlack", mdl)}>
                                                {t("User Profile")}
                                            </div>
                                        </NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <NavLink exact to='/user/update'>
                                            <div onClick={() => handleSignOut()} className={allClass("", "linkBlack", mdl)}>
                                                {t("Log Out")}
                                            </div>
                                        </NavLink>
                                    </NavDropdown.Item>
                                </Fragment>)
                                :
                                (<Fragment>
                                    <NavDropdown.Item>
                                        <NavLink exact to='/user/login'>
                                            <div className={allClass("", "linkBlack", mdl)}>
                                                {t("Login")}
                                            </div>
                                        </NavLink>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <NavLink exact to='/user/register'>
                                            <div className={allClass("", "linkBlack", mdl)}>
                                                {t("Register User")}
                                            </div>
                                        </NavLink>
                                    </NavDropdown.Item>
                                </Fragment>)
                            }
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavBarHookBootstrap
