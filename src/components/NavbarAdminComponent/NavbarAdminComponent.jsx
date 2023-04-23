import React from "react";
import '../../public/admin/css/bootstrap.css'
import '../../public/admin/css/styles.css'
import './navbar.css'
import {Link} from 'react-router-dom'
import {BsFillAirplaneEnginesFill} from 'react-icons/bs'
const NavbarAdminPage = () => {
    return(
    <nav className="navbar navbar-inverse navbar-fixed-top nav" role="navigation">
        <div className="container-fluid">
            <div className="navbar-header">
                <button
                    type="button"
                    className="navbar-toggle collapsed"
                    data-toggle="collapse"
                    data-target="#sidebar-collapse"
                >
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <Link to="/admin/dashboard" className="navbar-brand" >
                    <span>Tech </span>Shop
                </Link>
                <ul className="user-menu">
                    <li className="pull-right">
                        <Link to="logout">Đăng xuất</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

)
}

export default React.memo(NavbarAdminPage)