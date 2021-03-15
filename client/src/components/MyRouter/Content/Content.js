import React, { Fragment } from 'react';
import classNames from 'classnames';
import { Container } from 'reactstrap';
import { Switch, Route, Redirect } from 'react-router-dom';
import LandingPage from '../../LandingPage/LandingPage';
import MenmberList from '../../MemberList/MemberList';
import WarnMemberList from '../../WarnMemberList/WarnMemberList';
import AddMemberPage from '../../AddMemberPage/AddMemberPage';
import MemberInquiries from '../../MemberInquiries/MemberInquiries';
import EditMember from '../../EditMember/EditMember';
import Profile from '../../EditMember/Section/Profile';

import Topbar from './Topbar';

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
    <Container fluid className={classNames('content', { 'is-open': sidebarIsOpen })}>
        <Topbar toggleSidebar={toggleSidebar} />
        <Fragment>
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/list" component={MenmberList} />
                <Route exact path="/warnlist" component={WarnMemberList} />
                <Route exact path="/addmember" component={AddMemberPage} />
                <Route exact path="/inquiries" component={MemberInquiries} />
                <Route exact path="/edit/:id" component={EditMember} />
                <Route exact path="/editprofile/:id" component={Profile} />
                <Redirect from="*" to="/" />
            </Switch>
        </Fragment>
    </Container>
);

export default Content;
