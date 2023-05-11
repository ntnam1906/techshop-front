import React, { useEffect, useState } from "react";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import NavbarComponent from "../../../components/NavbarComponent/NavbarComponent";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import SideBarComponent from "../../../components/SideBarComponent/SideBarComponent";
import FooterComponent from "../../../components/FooterComponent/FooterComponent";
import axios from "axios";
import { useNavigate  } from 'react-router-dom'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const RegisterPage = () => {

	const [formData, setFormData] = useState({
        full_name: "",
		email: "",
		pass: "",
        re_pass: ""
	})
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
	const [status, setStatus] = useState()
	const [error, setError] = useState()
    const navigate = useNavigate()

	function handleSubmit(event) {
		event.preventDefault()
        if (!validateEmail(formData.email)) {
            NotificationManager.error('Email không đúng định dạng. Vui lòng nhập lại');
            return;
          }
		if (formData.email && formData.pass && formData.re_pass && formData.full_name) {
			axios.post('https://localhost:3000/api/local/register', formData).then((res) => {
			  // handle response
                const notificationId = NotificationManager.success("", "Đăng kí thành công. Vui lòng đăng nhập", 700);
                setTimeout(() => {
                    const notification = NotificationManager.notifications
                    if (notification && notification.length > 0) {
                      NotificationManager.remove(notificationId);
                    }
                  }, 700);
                setTimeout(() => navigate('/login'), 1000)
            
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
	
    if(status === 401) {
        NotificationManager.error(error);
        setStatus(null)
    }
    
    return(
        <React.Fragment>
			<NotificationContainer />

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
                                        <button type="submit" className="custom-btn btn-7">Đăng ký</button>
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