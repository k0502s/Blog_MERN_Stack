import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { Navbar, Container, NavbarToggler, Collapse, Nav, NavItem, Form, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LOGOUT_REQUEST } from '../redux/types';
import LoginModal from './auth/Login';
import RegisterModal from '../components/auth/RegisterModal';

const AppNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, user, userRole } = useSelector((state) => state.auth);
    console.log(userRole, 'UserRole');

    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        dispatch({
            type: LOGOUT_REQUEST,
        });
    }, [dispatch]);

    useEffect(() => {
        setIsOpen(false);
    }, [user]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const authLink = (
        <Fragment>
            <NavItem>
                {userRole === 'MainJuin' ? (
                    <Form className="col mt-2">
                        <Link to="/post" className="btn btn-success block text-white px-3">
                            Add Post
                        </Link>
                    </Form>
                ) : (
                    ''
                )}
            </NavItem>
            <NavItem className="d-flex justify-content-center">
                <Form className="col mt-2">
                    {user && user.name ? (
                        <Link to={`/user/${user.name}/profile`}>
                            <Button outline color="light" className="px-3" block>
                                <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                            </Button>
                        </Link>
                    ) : (
                        <Button outline color="light" className="px-3" block>
                            <strong>No User</strong>
                        </Button>
                    )}
                </Form>
            </NavItem>
            <NavItem>
                <Form className="col">
                    <Link onClick={onLogout} to="/">
                        <Button outline color="light" className="mt-2" block>
                            Logout
                        </Button>
                    </Link>
                </Form>
            </NavItem>
        </Fragment>
    );

    return (
        <Fragment>
            <Navbar color="dark" dark expand="lg" className="sticky-top">
                <Container>
                    <Link to="/" className="text-white text-decoration-none">
                        회원 관리 시스템
                    </Link>
                    <NavbarToggler onClick={handleToggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto d-felx justify-content-around" navbar>
                            {/* {isAuthenticated ? authLink : guestLink} */}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </Fragment>
    );
};

export default AppNavbar;
