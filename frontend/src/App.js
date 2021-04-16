import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import LoginComponent from './components/LoginComponent';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import BookingService from './services/BookingService';
import ProtectedRoutes from './components/ProtectedRoutes';
import ContactComponent from './components/ContactComponent';
import BookingComponent from './components/BookingComponent';
import InfoComponent from './components/InfoComponent';
import InfoConfirmedComponent from './components/InfoConfirmedComponent';
import MainPageComponent from './components/MainPageComponent';
import GalleryComponent from './components/GalleryComponent';
import PriceListComponent from './components/PriceListComponent';
import BookingRegulations from './components/BookingRegulations';
import HouseRegulations from './components/HouseRegulations';
import CookieConsent from "react-cookie-consent";
import PriceListExtraComponent from './components/PriceListExtraComponent';


axios.interceptors.request.use(
  config => {
    if (localStorage.getItem("authorization") !== null) {
      config.headers.authorization = `Bearer ${localStorage.getItem("authorization")}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

const history = createBrowserHistory();
BookingService.setupInterceptors(history);


function App() {
  return (
    <div id="app-wrapper">
      <Router>
        <HeaderComponent />
        <div className="container">
          <Route exact path="/admin" component={LoginComponent} />
          <Route component={ProtectedRoutes} />
          <Route path="/kontakt" exact component={ContactComponent}/>
          <Route path="/rezerwacje" exact component={BookingComponent}/>
          <Route path="/rezerwacje/info" exact component={InfoComponent}/>
          <Route path="/rezerwacje/potwierdzenie" exact component={InfoConfirmedComponent}/>
          <Route path="/" exact component={MainPageComponent}/>
          <Route path="/galeria" exact component={GalleryComponent}/>
          <Route path="/cennik" exact component={PriceListComponent}/>
          <Route path="/cennik-dodatkowy" exact component={PriceListExtraComponent}/>
          <Route path="/regulamin-rezerwacji" exact component={BookingRegulations}/>
          <Route path="/regulamin-domkow" exact component={HouseRegulations}/>

        </div>
      </Router>
      <CookieConsent buttonText="Rozumiem" buttonStyle={{ backgroundColor: "white" }}>Ta strona korzysta z ciasteczek, aby świadczyć usługi na najwyższym poziomie. Dalsze korzystanie ze strony oznacza, że zgadzasz się na ich użycie.</CookieConsent>
    </div>


  );
}

export default App;
