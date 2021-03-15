import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Register from '../auth/RegisterModal';

function LandingPage() {
    const { isAuthenticated } = useSelector((state) => state.auth);

    const guestLink = (
        <Fragment>
            <h3>안녕하세요. 동호회 회원 관리 사이트 입니다.</h3>
            <br />
            <br />
            <label>ID: k7111s@naver.com</label>
            <br />
            <label>PW: 123</label>
            <br />
            <br />
            <h4>위의 관리자 아이디로 로그인 해주세요!</h4>
            <Register />
        </Fragment>
    );

    const authLink = <div>로그인 완료!</div>;

    return <div>{isAuthenticated ? authLink : guestLink}</div>;
}

export default LandingPage;
