import React, {useState} from "react";
import BookingService from "../services/BookingService";

import LogoutButton from "./LogoutButton";

const AuthButton = () => {

    const [isAuthenticated, setAuthentication] = useState(false);

    BookingService.checkAuth().then((res) => {
        if(res.status===200) setAuthentication(true);
        else setAuthentication(false);
    })

    return isAuthenticated ? <LogoutButton /> : <div />;
  };
  
  export default AuthButton;