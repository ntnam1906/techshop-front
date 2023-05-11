import React from "react";
import '../../public/admin/css/bootstrap.css'
import '../../public/admin/css/styles.css'
import './navbar.css'
import {Link, useNavigate} from 'react-router-dom'
import {BsFillAirplaneEnginesFill} from 'react-icons/bs'
import axios from "axios";
const NavbarAdminPage = () => {
    const navigate = useNavigate()
    setInterval(() => {
        const tokenExpiration = localStorage.getItem('tokenExpiration');
        const isTokenExpired = Date.now() > (tokenExpiration - 60000);
      
        if (isTokenExpired) {
            handleLogOut()
            localStorage.removeItem('access_admin_token')
            localStorage.removeItem('tokenExpiration')
            navigate('/admin/login')
        } else {
          // Token còn hạn, tiếp tục truy cập vào các trang cần xác thực
        }
      }, 7180000); 
    function handleLogOut() {
        localStorage.removeItem('access_admin_token')

        axios.post('https://localhost:3000/api/admin/logout')
        .then(response => {
          navigate('/admin/login')
        })
        .catch(error => console.log(error))
      }
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
                        <Link to="" onClick={handleLogOut}>Đăng xuất</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

)
}

export default React.memo(NavbarAdminPage)