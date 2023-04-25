import React, { useEffect, useState } from "react";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import NavbarComponent from "../../../components/NavbarComponent/NavbarComponent";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import SideBarComponent from "../../../components/SideBarComponent/SideBarComponent";
import FooterComponent from "../../../components/FooterComponent/FooterComponent";
import axios from "axios";
import "./loginpage.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"

const LoginPage = () => {
	const [formData, setFormData] = useState({
		email: "",
		pass: ""
	})
	const [status, setStatus] = useState()
	const [error, setError] = useState()
	const navigate = useNavigate()
    const registerSuccess = localStorage.getItem('registerSuccess')
	const getForgotSuccess = localStorage.getItem('forgotPasswordSuccess')

	function handleSubmit(event) {
		event.preventDefault()
		if (formData.email && formData.pass) {
			axios.post('http://localhost:3000/api/local/login', formData).then((res) => {
				navigate('/')
				localStorage.setItem('access_token', res.data?.access_token)
				
			})
			.catch((error) => {
				setStatus(error.response.status)
				setError(error.response.data.message)
				if(error.response.data.message === "User is not activated") {
					localStorage.setItem('access_token', error.response.data?.access_token)
					navigate('/active')
				}
			})
		  } else {
			console.log("Please enter a username and password");
		  } 
		
	}
	setTimeout(function() {
        if(registerSuccess) localStorage.setItem('registerSuccess', "false")
    },1000)
	setTimeout(function() {
		if(getForgotSuccess) localStorage.setItem('forgotPasswordSuccess', "false")
	},1000)

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	  };

	
	
    return(
        <React.Fragment>
            <HeaderComponent />
            <div id="body">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <NavbarComponent />
                        </div>
                    </div>
                    <div className="row">
                        <div id="main" className="col-lg-8 col-md-12 col-sm-12">
                            <SliderComponent />
                            <br />
                            <h2>ĐĂNG NHẬP</h2>
							{status === 401 && <div id="errr">{error}</div>}
							{registerSuccess==="true" && <div id="success-admin">Đăng ký thành công. Vui lòng đăng nhập</div> }
							{getForgotSuccess==="true" && <div id="success-admin">Đổi mật khẩu thành công. Vui lòng đăng nhập</div> }
							<form role="form" method="post" onSubmit={handleSubmit}>
								<fieldset>
									<div className="form-group">
										<input
											className="form-control"
											placeholder="E-mail"
											name="email"
											type="email"
											value={formData.email}
											onChange={handleChange}
											autoFocus
										/>
									</div>
									<div className="form-group">
										<input
											className="form-control"
											placeholder="Mật khẩu"
											name="pass"
											type="password"
											value={formData.pass}
											onChange={handleChange}
										/>
									</div>
									<div className="checkbox">
										<label>
											<input
												name="remember"
												type="checkbox"
												value="Remember Me"
											/> Nhớ tài khoản
										</label>
									</div>
									<button type="submit" className="btn btn-primary">
										Đăng nhập
									</button>
								</fieldset>
								<br />
								<p>
									<span>Nếu chưa có tài khoản vui lòng </span>
									<Link to="/register" id="no-decoration"> đăng ký</Link> tại đây. <Link to="/forgot-password" id="no-decoration"> Quên mật khẩu</Link>
								</p>
							</form>
                        </div>

                        <SideBarComponent />
                    </div>
                </div>
            </div>
            
            <FooterComponent />
        </React.Fragment>
    )
}

export default LoginPage