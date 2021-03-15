import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faPaperPlane, faQuestion, faImage } from '@fortawesome/free-solid-svg-icons';
import { NavItem, NavLink, Nav, Badge } from 'reactstrap';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Login from '../../../components/auth/Login';

const SideBar = ({ isOpen, toggle }) => {
    const { isAuthenticated, warnlistDetail, user } = useSelector((state) => state.auth);
    // const [usercart, setusercart] = useState('');

    // useEffect(() => {
    //     setusercart(user.cart);
    // }, [user]);

    const guestLink = <div></div>;

    const authLink = (
        <Fragment>
            <NavItem>
                <NavLink tag={Link} to={'/'}>
                    <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                    HOME
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to={'/addmember'}>
                    <FontAwesomeIcon icon={faImage} className="mr-2" />
                    ADD MEMBER
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to={'/list'}>
                    <FontAwesomeIcon icon={faImage} className="mr-2" />
                    MEMBER LIST
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to={'/warnlist'}>
                    <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                    WARN MEMBER LIST 
                    {/* <Badge color="secondary">{usercart.length}</Badge> */}
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to={'/inquiries'}>
                    <FontAwesomeIcon icon={faQuestion} className="mr-2" />
                    MEMBER INQIRIES
                </NavLink>
            </NavItem>
        </Fragment>
    );

    return (
        <div className={classNames('sidebar', { 'is-open': isOpen })}>
            <div className="sidebar-header">
                <span color="info" onClick={toggle} style={{ color: '#fff' }}>
                    &times;
                </span>
                <h3>Member Management System</h3>
            </div>
            <Nav vertical className="list-unstyled pb-3">
                <Login />
            </Nav>
            <div className="side-menu">
                <Nav vertical className="list-unstyled pb-3">
                    {isAuthenticated ? authLink : guestLink}
                </Nav>
            </div>
        </div>
    );
};

export default SideBar;
