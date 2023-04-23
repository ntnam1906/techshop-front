import React, { useEffect, useState } from "react";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import NavbarComponent from "../../../components/NavbarComponent/NavbarComponent";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import SideBarComponent from "../../../components/SideBarComponent/SideBarComponent";
import FooterComponent from "../../../components/FooterComponent/FooterComponent";
import axios from "axios";
import "./loginpage.css"
import { Link } from "react-router-dom";



const LoginPage = () => {
	const [formData, setFormData] = useState({
		email: "",
		pass: ""
	})
	const [status, setStatus] = useState()
	const [error, setError] = useState()

	function handleSubmit(event) {
		event.preventDefault()
		if (formData.email && formData.pass) {
			axios.post('http://localhost:3000/api/local/login', formData).then((res) => {
			  // handle response
			  	setStatus(res.status)
			})
			.catch((error) => {
				setStatus(error.response.status)
				setError(error.response.data.message)
			})
		  } else {
			console.log("Please enter a username and password");
		  } 
		
	}
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	  };
	
	// useEffect(() => {
		
	// }, [])
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
									<Link to="/register"> đăng ký</Link> tại đây
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