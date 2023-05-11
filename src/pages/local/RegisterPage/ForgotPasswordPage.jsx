import React, { useEffect, useState } from "react";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import NavbarComponent from "../../../components/NavbarComponent/NavbarComponent";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import SideBarComponent from "../../../components/SideBarComponent/SideBarComponent";
import FooterComponent from "../../../components/FooterComponent/FooterComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const ForgotPasswordPage = () => {
	const [formData, setFormData] = useState({
		newPassword: "",
        token: "",
        email: ""
	})
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
	const [status, setStatus] = useState()
	const [error, setError] = useState()
    const [success, setSuccess] = useState("")
    const navigate = useNavigate()
	function handleSubmit(event) {
        event.preventDefault()
        if (!validateEmail(formData.email)) {
            NotificationManager.error('Email không đúng định dạng. Vui lòng nhập lại');
            return;
          }
		axios.post('https://techshop-backend-0cyn.onrender.com/api/local/forgot-password', formData)
        .then(response => {
            const notificationId = NotificationManager.success("", "Đổi mật khẩu thành công. Vui lòng đăng nhập",700);
            setTimeout(() => {
                const notification = NotificationManager.notifications
                if (notification && notification.length > 0) {
                  NotificationManager.remove(notificationId);
                }
              }, 700);
            setTimeout(() => navigate('/login'), 1000)
        })
        .catch(error => {
            setStatus(error.response.status)
			setError(error.response.data.message)
        })
    }
    function handleSubmitToken(event) {
		event.preventDefault()
        if (!validateEmail(formData.email)) {
            NotificationManager.error('Email không đúng định dạng. Vui lòng nhập lại');
            return;
        }
        axios.post('https://techshop-backend-0cyn.onrender.com/api/local/send-mail', {
            email: formData.email
        })
        .then(response => {
            setStatus(response.status)
            setSuccess(response.data.message)  
        })
        .catch(error => {
            setStatus(error.response.status)
			setError(error.response.data.message)
        })
    }
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	  };

    if(status === 404) {
        NotificationManager.error(error);
        setStatus(null)
    } 
    if(status === 201) {
        NotificationManager.success(success);
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
                            <h1>Quên mật khẩu</h1>

                            <div className="panel-body">
                                <form role="form" method="post" onSubmit={handleSubmit}>
                                    <fieldset>
                                        <div className="form-group">
                                            <label>Email của bạn</label>
                                            <div className="form-contain">
                                                <input
                                                    name="email"
                                                    className="form-control"
                                                    type="email"
                                                    id="inpt"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    autoFocus
                                                    required
                                                />
                                                <button className="btn btn-danger ml-2 btn-search" onClick={handleSubmitToken}><span style={{color: "white"}}>Gửi mã xác minh</span></button>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Mã xác minh</label>
                                            <input
                                                name="token"
                                                type="text"
                                                className="form-control"
                                                value={formData.token}
                                                onChange={handleChange}
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
                                        
                                        <button type="submit" className="custom-btn btn-7">Đổi mật khẩu</button>
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

export default ForgotPasswordPage