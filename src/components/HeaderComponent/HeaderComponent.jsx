import React from "react";
import '../../public/local/css/home.css'
import '../../public/local/css/bootstrap.css'
import logo from '../../public/local/images/Tech-Shop-Logo.png'
import { Link } from "react-router-dom";
const HeaderComponent = () => {
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
                <button className="btn btn-danger mt-4 ml-1" type="submit">
                  Tìm kiếm
                </button>
              </form>
            </div>
            <div id="cart" className="col-lg-3 col-md-3 col-sm-12">
              {/* <% if(!loggedIn) { %> */}
              <button className="btn-log btn-danger">
                <Link to="/login" className="mt-4 mr-2 login" >Đăng nhập</Link>
              </button>
              <button className="btn-register">
                <Link to="/register" className="mt-4 mr-2 register" >Đăng ký</Link>
              </button>
              {/* <%} else if(loggedIn) {%>
              <a className="mt-4 mr-2 hv" href="/logout">Đăng xuất</a>
              <a className="mt-4 hv" href="/cart">Giỏ hàng</a>
              <span className="mt-3 mr-3"><%= cartPrds%></span> */}
				
            </div>
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

export default HeaderComponent;
