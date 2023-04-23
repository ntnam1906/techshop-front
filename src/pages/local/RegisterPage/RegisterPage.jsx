import React, { useEffect, useState } from "react";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import NavbarComponent from "../../../components/NavbarComponent/NavbarComponent";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import SideBarComponent from "../../../components/SideBarComponent/SideBarComponent";
import FooterComponent from "../../../components/FooterComponent/FooterComponent";
import axios from "axios";

const RegisterPage = () => {

	const [formData, setFormData] = useState({
        full_name: "",
		email: "",
		pass: "",
        re_pass: ""
	})
	const [status, setStatus] = useState()
	const [error, setError] = useState()

	function handleSubmit(event) {
		event.preventDefault()
		if (formData.email && formData.pass && formData.re_pass && formData.full_name) {
			axios.post('http://localhost:3000/api/local/register', formData).then((res) => {
			  // handle response
			  	setStatus(res.status)
			})
			.catch((error) => {
				setStatus(error.response.status)
				setError(error.response.data.message)
			})
		  } else {
			console.log("Please enter a username and pass");
		  } 
		
	}
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
                            <h2>ĐĂNG KÝ</h2>
                            {status === 401 && <div id="errr">{error}</div>}
                            <div className="panel-body">
                                <form role="form" method="post" onSubmit={handleSubmit}>
                                    <fieldset>
                                        <div className="form-group">
                                            <label>Họ & Tên</label>
                                            <input
                                                name="full_name"
                                                className="form-control"
                                                placeholder="VD: Nguyen Van A"
                                                value={formData.full_name}
											    onChange={handleChange}
                                                autoFocus
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                name="email"
                                                type="text"
                                                className="form-control"
                                                placeholder="VD: exemple@gmail.com"
                                                value={formData.email}
											    onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Mật khẩu</label>
                                            <input 
                                                name="pass" 
                                                type="password" 
                                                className="form-control"
                                                value={formData.pass}
											    onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Nhập lại mật khẩu</label>
                                            <input
                                                name="re_pass"
                                                type="password"
                                                className="form-control"
                                                value={formData.re_pass}
											    onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Đăng ký</button>
                                    </fieldset>
                                </form>
                            </div>
                        </div>

                        <SideBarComponent />
                    </div>
                </div>
            </div>
            
            <FooterComponent />
        </React.Fragment>
    )
}

export default RegisterPage