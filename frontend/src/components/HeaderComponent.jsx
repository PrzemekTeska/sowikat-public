import React, { Component } from 'react';
import AuthButton from './AuthButton';
import logo from '../navbarlogo.png'; // with import
import { NavLink } from 'react-router-dom'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div id="header-container">
                <nav id="navbar" className="navbar navbar-expand-sm bg-dark navbar-dark">

                    <a className="navbar-brand" href="/">
                        <img id="logo" src={logo} alt="logo" />
                    </a>


                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink
                                exact={true}
                                to="/"
                                activeClassName="active"
                                activeStyle={{
                                    fontWeight: "bold",
                                    color:"white",
                                    paddingBottom:"6px",
                                    borderBottom:"3px solid white"
                                  }}
                            >Strona główna</NavLink></li>
                        <li className="nav-item">
                            <NavLink
                                to="/rezerwacje"
                                activeClassName="active"
                                activeStyle={{
                                    fontWeight: "bold",
                                    color:"white",
                                    paddingBottom:"6px",
                                    borderBottom:"3px solid white"
                                  }}
                            >Rezerwacje</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink
                                to="/galeria"
                                activeClassName="active"
                                activeStyle={{
                                    fontWeight: "bold",
                                    color:"white",
                                    paddingBottom:"6px",
                                    borderBottom:"3px solid white"
                                  }}
                            >Galeria</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink
                                to="/cennik"
                                activeClassName="active"
                                activeStyle={{
                                    fontWeight: "bold",
                                    color:"white",
                                    paddingBottom:"6px",
                                    borderBottom:"3px solid white"
                                  }}
                            >Cennik</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink
                                to="/kontakt"
                                activeClassName="active"
                                activeStyle={{
                                    fontWeight: "bold",
                                    color:"white",
                                    paddingBottom:"6px",
                                    borderBottom:"3px solid white"
                                  }}
                            >Kontakt</NavLink>
                        </li>
                    </ul>
                    <div id="logout-button"><AuthButton /></div>

                </nav>

            </div>
        );
    }
}

export default HeaderComponent;