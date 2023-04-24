import React, { useEffect, useState } from "react";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import NavbarComponent from "../../../components/NavbarComponent/NavbarComponent";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import SideBarComponent from "../../../components/SideBarComponent/SideBarComponent";
import FooterComponent from "../../../components/FooterComponent/FooterComponent";
import axios from "axios";

const ChangePasswordPage = () => {

	const [formData, setFormData] = useState({
        currentPassword: "",
		newPassword: "",
	})
	const [status, setStatus] = useState()
	const [error, setError] = useState()
    const access_token = localStorage.getItem('access_token')

	function handleSubmit(event) {
		event.preventDefault()
		if (formData.currentPassword && formData.newPassword ) {
			axios.post('http://localhost:3000/api/local/change-password', formData, {
                headers: {
                    'token': `Beare ${access_token}`
                }
            }).then((res) => {
			  // handle response
			  	setStatus(res.status)
                if(res.status === 200) {
                    formData.currentPassword = ""
                    formData.newPassword = ""
                }
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
                            <h2>Đổi mật khẩu</h2>
                            {status === 200 && <div id="success-admin">Đổi mật khẩu thành công</div>}
                            {status === 400 && <div id="errr">{error}</div>}
                            <div className="panel-body">
                                <form role="form" method="post" onSubmit={handleSubmit}>
                                    <fieldset>
                                        <div className="form-group">
                                            <label>Mật khẩu cũ</label>
                                            <input
                                                name="currentPassword"
                                                className="form-control"
                                                type="password"
                                                value={formData.currentPassword}
											    onChange={handleChange}
                                                autoFocus
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Mật khẩu mới</label>
                                            <input
                                                name="newPassword"
                                                type="password"
                                                className="form-control"
                                                value={formData.newPassword}
											    onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Đổi mật khẩu</button>
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

export default ChangePasswordPage