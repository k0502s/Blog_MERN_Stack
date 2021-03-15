import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Form, FormGroup, Label, Input, Button, NavLink } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_REQUEST, LOGOUT_REQUEST } from '../../redux/types';

const Login = () => {
    const [localMsg, setLocalMsg] = useState('');
    const [form, setValues] = useState({
        email: '',
        password: '',
    });

    const { isAuthenticated, user, errorMsg } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        dispatch({
            type: LOGOUT_REQUEST,
        });
    }, [dispatch]);

    useEffect(() => {
        try {
            setLocalMsg(errorMsg);
        } catch (e) {
            console.log(e);
        }
    }, [errorMsg]);

    const onChange = (e) => {
        setValues({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = form;
        const user = { email, password };
        console.log(user);
        dispatch({
            type: LOGIN_REQUEST,
            payload: user,
        });
    };

    const guestLink = (
        <Fragment>
            {localMsg ? <Alert color="danger">{localMsg}</Alert> : null}
            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Label style={{ marginLeft: '1.5rem' }} for="email">
                        Email
                    </Label>
                    <Input style={{ width: '80%', marginLeft: '1.5rem' }} type="email" name="email" id="email" placeholder="Email" onChange={onChange} />
                    <Label style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }} for="password">
                        Password
                    </Label>
                    <Input style={{ width: '80%', marginLeft: '1.5rem' }} type="password" name="password" id="password" placeholder="Password" onChange={onChange} />
                    <Button color="dark" style={{ marginTop: '1rem', marginLeft: '2rem', width: '70%' }} block>
                        Login
                    </Button>
                </FormGroup>
            </Form>
        </Fragment>
    );

    const authLink = (
        <Fragment>
            <Form className="col mt-2">
                {user && user.name ? (
                    <NavLink style={{ marginLeft: '2rem' }}>{user ? `Welcome ${user.name}` : ''}</NavLink>
                ) : (
                    <NavLink>
                        <strong>No User</strong>
                    </NavLink>
                )}
            </Form>
            <Form className="col">
                <Link onClick={onLogout} to="/">
                    <Button color="dark" style={{ marginTop: '1rem', marginLeft: '2rem', width: '70%' }} block>
                        Logout
                    </Button>
                </Link>
            </Form>
        </Fragment>
    );

    return <div>{isAuthenticated ? authLink : guestLink}</div>;
};

export default Login;
