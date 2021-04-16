import React from 'react';
import { Switch, withRouter } from 'react-router-dom';
import CreateBookingComponent from './CreateBookingComponent';
import UpdateBookingModalComponent from './UpdateBookingModalComponent';
import ListBookingComponentTest from './ListBookingComponentTest';
import PrivateRoute from './PrivateRoute';



const ProtectedRoutes = () => {

    const checkToken = () => {
        if(localStorage.getItem("authorization") === null) return false;
        return true;
    }

return (

    <Switch>
        <PrivateRoute authed={checkToken()} path="/admin/bookings" exact component={ListBookingComponentTest} />
        <PrivateRoute authed={checkToken()} path="/admin/add-booking" component={CreateBookingComponent} />
        <PrivateRoute authed={checkToken()} path="/admin/update-booking" component={UpdateBookingModalComponent} />
    </Switch>

);
    
}
export default withRouter(ProtectedRoutes);