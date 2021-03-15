import React, { useState, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Button, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const Topbar = ({ toggleSidebar }) => {
    const [topbarIsOpen, setTopbarOpen] = useState(true);
    const { isAuthenticated, user, userRole } = useSelector((state) => state.auth);

    const toggleTopbar = () => setTopbarOpen(!topbarIsOpen);

    const guestLink = <div className="ml-auto">로그인 인증이 필요합니다.</div>;

    const authLink = (
        <Fragment>
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink tag={Link} to={'#'}>
                        page 1
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to={'#'}>
                        page 2
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to={'#'}>
                        page 3
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to={'#'}>
                        page 4
                    </NavLink>
                </NavItem>
            </Nav>
        </Fragment>
    );

    return (
        <Navbar color="light" light className="navbar shadow-sm p-3 mb-5 bg-white rounded" expand="md">
            <Button color="info" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faAlignLeft} />
            </Button>
            <NavbarToggler onClick={toggleTopbar} />
            <Collapse isOpen={topbarIsOpen} navbar>
                {isAuthenticated ? authLink : guestLink}
            </Collapse>
        </Navbar>
    );
};

export default Topbar;
