import React from "react";
import '../../public/local/css/home.css'
import '../../public/local/css/bootstrap.css'
import logo from '../../public/local/images/Tech-Shop-Logo.png'
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"
import Dropdown from 'react-bootstrap/Dropdown';
import axios from "axios";
const HeaderComponent = () => {
  const navigate = useNavigate()
  const access_token = localStorage.getItem('access_token')
  let decoded = []
  if(access_token) {
    decoded = jwt_decode(access_token)
  }
function handleLogOut() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('tokenExpiration')
  axios.post('http://localhost:3000/api/local/logout')
  .then(response => {
    navigate('/login')
  })
  .catch(error => console.log(error))
}
////// Check token hết hạn

setInterval(() => {
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const isTokenExpired = Date.now() > (tokenExpiration - 60000);
  
    if (isTokenExpired) {
        handleLogOut()
        localStorage.removeItem('access_token')
        localStorage.removeItem('tokenExpiration')
        navigate('/login')
    } else {
      // Token còn hạn, tiếp tục truy cập vào các trang cần xác thực
    }
  }, 7180000); 
  function handleLogOut() {
    localStorage.removeItem('access_token')
    axios.post('http://localhost:3000/api/local/logout')
    .then(response => {
      navigate('/login')
    })
    .catch(error => console.log(error))
  }

  return (
    <React.Fragment>
      <div id="header">
        <div className="container">
          <div className="row">
            <div id="logo" className="col-lg-3 col-md-3 col-sm-12">
              <h1>
                <Link to="/">
                  <img
                    className="logo-header"
                    src={logo}
                  />
                </Link>
              </h1>
            </div>
            <div id="search" className="col-lg-6 col-md-6 col-sm-12">
              <form className="form-inline" action="/search" method="GET">
                <input
                  className="form-control mt-4"
                  type="search"
                  name="keyword"
                  placeholder="Tìm kiếm"
                  aria-label="Search"
                />
                <button className="btn btn-danger mt-4 ml-2 btn-search" type="submit">
                  Tìm kiếm
                </button>
              </form>
            </div>
            
              {decoded.isActivated === true ? 
              (<div className="col-lg-3 col-md-3 col-sm-12">
                <Dropdown id="drd-token">
                  <Dropdown.Toggle variant="success" id="dropdown-basic" className="bg-transparent border-0">
                    Xin chào, {decoded.full_name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/change-password">Đổi mật khẩu</Dropdown.Item>
                    <Dropdown.Item href="/cart">Giỏ hàng</Dropdown.Item>
                    <Dropdown.Item href="/order">Lịch sử đơn hàng</Dropdown.Item>
                    <Dropdown.Item href="" onClick={handleLogOut}>Đăng xuất</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                </div>
              )
              :
              (<div id="cart" className="col-lg-3 col-md-3 col-sm-12">
                <button className="btn-log btn-danger">
                    <Link to="/login" className="mt-4 mr-2 login" >Đăng nhập</Link>
                </button>
                <button className="btn-register">
                    <Link to="/register" className="mt-4 mr-2 register" >Đăng ký</Link>
                </button>
                </div>)
              }
            
          </div>
        </div>
        
        <button
          className="navbar-toggler navbar-light"
          type="button"
          data-toggle="collapse"
          data-target="#menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </React.Fragment>
  );
};

export default React.memo(HeaderComponent);
