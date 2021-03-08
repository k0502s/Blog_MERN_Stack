import React, { Fragment } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AppNavbar from '../components/AppNavbar'
import { Container } from "reactstrap";
import { Switch, Route, Redirect } from "react-router-dom";
import Profile from "./normalRoute/Profile" 
import {
    ProfileProtectedRoute,
  } from "./productedRoute/ProtectedRoute";


const MyRouter = () => {
    return (
       <Fragment>
           <AppNavbar />
           <Header />
           <Container id="main-body">
             <Switch>
                  <Route path='/' />
                  <ProfileProtectedRoute
                    path="/user/:userName/profile"
                    exact
                    component={Profile}
                    />
                  <Redirect from="*" to='/' />
             </Switch>
            </Container>
           <Footer />
       </Fragment>
    )
}

export default MyRouter
