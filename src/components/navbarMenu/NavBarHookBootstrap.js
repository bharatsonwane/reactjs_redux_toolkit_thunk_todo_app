import React, { Fragment, useState, useEffect } from 'react'
import { allClass } from 'src/helper/customHooks/customModuleClassMethod'
import { handleCleareLocalStorage } from 'src/helper/functions/localStorageHelper'
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
    let userRole = props.userRole

    console.log("userRole", userRole)
    const changi18nextLanguage = () => {
    }

    const handleSignOut = () => {
        Cookies.remove('reduxToolkitToken')
        handleCleareLocalStorage()
        history.push(`/`)
    }

    return (
        <Fragment>
            <div className={allClass("", "navbarMenue__container", mdl)}>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand exact to="#home">Redux Toolkit</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    {isAuthenticated && userRole === "owner" ?
                        (<Fragment>
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mr-auto">
                                    <NavLink exact to='/' >
                                        <div className={allClass("", "link", mdl)}>
                                            {t("Home")}
                                        </div>
                                    </NavLink>
                                    <NavLink exact to='/feedback/retrieve'>
                                        <div className={allClass("", "link", mdl)}>
                                            <div className={allClass("", "link", mdl)}>{t("Feedback List")}</div>
                                        </div>
                                    </NavLink>
                                    <NavLink exact to='/signalr' >
                                        <div className={allClass("", "link", mdl)}>
                                            {t("Signalr")}
                                        </div>
                                    </NavLink>
                                </Nav>
                                <Nav>
                                    <NavDropdown title={t("Task")} id="collasible-nav-dropdown">
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
                                    <NavDropdown title={t("Employee")} id="collasible-nav-dropdown">
                                        <NavDropdown.Item>
                                            <NavLink exact to='/employee/retrieve'>
                                                <div className={allClass("", "linkBlack", mdl)}>
                                                    {t("Retrieve employee")}
                                                </div>
                                            </NavLink>
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item>
                                            <NavLink exact to='/employee/create'>
                                                <div className={allClass("", "linkBlack", mdl)}>
                                                    {t("Create employee")}
                                                </div>
                                            </NavLink>
                                        </NavDropdown.Item>
                                    </NavDropdown>
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
                                    <NavDropdown title={t("Users")} id="collasible-nav-dropdown">
                                        <NavDropdown.Item>
                                            <NavLink exact to='/user/retrieveProfile'>
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
                                    </NavDropdown>
                                </Nav>
                                <Nav className="mr-auto">
                                    <NavLink exact to='/signalr' >
                                        <div className={allClass("", "link", mdl)}>
                                            {t("Signalr")}
                                        </div>
                                    </NavLink>
                                </Nav>
                            </Navbar.Collapse>
                        </Fragment>)
                        : isAuthenticated && userRole === "manager" ?
                            (<Fragment>
                                <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav className="mr-auto">
                                        <NavLink exact to='/' >
                                            <div className={allClass("", "link", mdl)}>
                                                {t("Home")}
                                            </div>
                                        </NavLink>
                                        <NavLink exact to='/images'>
                                            <div className={allClass("", "link", mdl)}>
                                                <div className={allClass("", "link", mdl)}>{t("Images")}</div>
                                            </div>
                                        </NavLink>
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
                                        <NavDropdown title={t("Task")} id="collasible-nav-dropdown">
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
                                        <NavDropdown title={t("Employee")} id="collasible-nav-dropdown">
                                            <NavDropdown.Item>
                                                <NavLink exact to='/employee/retrieve'>
                                                    <div className={allClass("", "linkBlack", mdl)}>
                                                        {t("Retrieve employee")}
                                                    </div>
                                                </NavLink>
                                            </NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item>
                                                <NavLink exact to='/employee/create'>
                                                    <div className={allClass("", "linkBlack", mdl)}>
                                                        {t("Create employee")}
                                                    </div>
                                                </NavLink>
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown title={t("Users")} id="collasible-nav-dropdown">
                                            <NavDropdown.Item>
                                                <NavLink exact to='/user/retrieveProfile'>
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
                                        </NavDropdown>
                                    </Nav>
                                    <Nav style={{ marginLeft: "20px" }}>
                                        <NavLink exact to='/feedback/retrieve'>
                                            <div className={allClass("", "link", mdl)}>
                                                <div className={allClass("", "link", mdl)}>{t("Feedback List")}</div>
                                            </div>
                                        </NavLink>

                                        <NavLink exact to='/signalr' >
                                            <div className={allClass("", "link", mdl)}>
                                                {t("Signalr")}
                                            </div>
                                        </NavLink>
                                    </Nav>
                                </Navbar.Collapse>
                            </Fragment>)
                            : isAuthenticated && (userRole === "developer" || userRole === "tester") ?
                                (<Fragment>
                                    <Navbar.Collapse id="responsive-navbar-nav">
                                        <Nav className="mr-auto">
                                            <NavLink exact to='/' >
                                                <div className={allClass("", "link", mdl)}>
                                                    {t("Home")}
                                                </div>
                                            </NavLink>
                                            <NavLink exact to='/images'>
                                                <div className={allClass("", "link", mdl)}>
                                                    <div className={allClass("", "link", mdl)}>{t("Images")}</div>
                                                </div>
                                            </NavLink>
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
                                            <NavDropdown title={t("Task")} id="collasible-nav-dropdown">
                                                <NavDropdown.Item>
                                                    <NavLink exact to='/task/retrieve'>
                                                        <div className={allClass("", "linkBlack", mdl)}>
                                                            {t("Retrieve task")}
                                                        </div>
                                                    </NavLink>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                            <NavDropdown title={t("Users")} id="collasible-nav-dropdown">
                                                <NavDropdown.Item>
                                                    <NavLink exact to='/user/retrieveProfile'>
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
                                            </NavDropdown>
                                        </Nav>
                                        <Nav style={{ marginLeft: "20px" }}>
                                            <NavLink exact to='/feedback/retrieve'>
                                                <div className={allClass("", "link", mdl)}>
                                                    <div className={allClass("", "link", mdl)}>{t("Feedback List")}</div>
                                                </div>
                                            </NavLink>

                                            <NavLink exact to='/signalr' >
                                                <div className={allClass("", "link", mdl)}>
                                                    {t("Signalr")}
                                                </div>
                                            </NavLink>
                                        </Nav>
                                    </Navbar.Collapse>
                                </Fragment>)
                                :
                                (<Fragment>
                                    <Navbar.Collapse id="responsive-navbar-nav">
                                        <Nav className="mr-auto">
                                            <NavLink exact to='/' >
                                                <div className={allClass("", "link", mdl)}>
                                                    {t("Home")}
                                                </div>
                                            </NavLink>
                                            <NavLink exact to='/about'>
                                                <div className={allClass("", "link", mdl)}>{t("About")}</div>
                                            </NavLink>
                                            <NavLink exact to='/images'>
                                                <div className={allClass("", "link", mdl)}>{t("Images")}</div>
                                            </NavLink>
                                            <NavLink exact to='/contactus'>
                                                <div className={allClass("", "link", mdl)}>{t("Contact Us")}</div>
                                            </NavLink>

                                            <NavLink exact to='/feedback/create'>
                                                <div className={allClass("", "link", mdl)}>{t("feedback")}</div>
                                            </NavLink>


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
                                            <NavDropdown title={t("Users")} id="collasible-nav-dropdown">
                                                <NavDropdown.Item>
                                                    <NavLink exact to='/user/login'>
                                                        <div className={allClass("", "linkBlack", mdl)}>
                                                            {t("User Login")}
                                                        </div>
                                                    </NavLink>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item>
                                                    <NavLink exact to='/user/register'>
                                                        <div className={allClass("", "linkBlack", mdl)}>
                                                            {t("Register Manager")}
                                                        </div>
                                                    </NavLink>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </Nav>
                                        <Nav className="mr-auto">
                                            <NavLink exact to='/signalr' >
                                                <div className={allClass("", "link", mdl)}>
                                                    {t("Signalr")}
                                                </div>
                                            </NavLink>
                                        </Nav>
                                    </Navbar.Collapse>
                                </Fragment>)
                    }

                </Navbar>
            </div>
        </Fragment>
    )
}

export default NavBarHookBootstrap
