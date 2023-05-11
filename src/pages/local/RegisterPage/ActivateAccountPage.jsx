import React, { useEffect, useState } from "react";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import NavbarComponent from "../../../components/NavbarComponent/NavbarComponent";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import SideBarComponent from "../../../components/SideBarComponent/SideBarComponent";
import FooterComponent from "../../../components/FooterComponent/FooterComponent";
import axios from "axios";
import { useNavigate  } from 'react-router-dom'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const ActivateAccountPage = () => {
	const [token, setToken] = useState('');


    const navigate = useNavigate()
    const access_token = localStorage.getItem('access_token')
	function handleSubmit(event) {
		event.preventDefault()
		if (token) {
			axios.post('https://techshop-backend-0cyn.onrender.com/api/local/active', {token: token}, {
                headers: {
                    'token': `Beare ${access_token}`
                }
            }).then((res) => {
			  // handle response
              localStorage.removeItem('access_token')
              const notificationId = NotificationManager.success("", "Kích hoạt tài khoản thành công", 700);
                setTimeout(() => {
                    const notification = NotificationManager.notifications
                    if (notification && notification.length > 0) {
                      NotificationManager.remove(notificationId);
                    }
                  }, 700);
                localStorage.setItem('access_token', res.data?.access_token)
                localStorage.setItem('tokenExpiration', Date.now() + 7200000);
                setTimeout(() => navigate('/'), 1000)
			})
			.catch((error) => {
				const notificationId = NotificationManager.error("", "Mã xác minh không chính xác", 1000);
                setTimeout(() => {
                    const notification = NotificationManager.notifications
                    if (notification && notification.length > 0) {
                      NotificationManager.remove(notificationId);
                    }
                  }, 1000);
			})
		  } else {
			console.log("Please enter a username and pass");
		  } 
		
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
                            <h1>Kích hoạt tài khoản</h1>
                            <br/>
                            <h4>Mã xác minh đã được gửi đến Email của bạn. Vui lòng kiểm tra Email và nhập mã xác minh tại đây: </h4>

                            
                            <Form onSubmit={handleSubmit} style={{marginTop: 14 + 'px'}}>
                                <FormGroup controlId="formToken">
                                    <FormControl
                                    type="text"
                                    placeholder="Nhập mã token"
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                    />
                                </FormGroup>
                                <br></br>
                                <button type="submit" className="custom-btn btn-7">Xác minh tài khoản</button>
                            </Form>
                            
                        </div>

                        <SideBarComponent />
                    </div>
                </div>
            </div>
            
            <FooterComponent />
        </React.Fragment>
    )
}

export default ActivateAccountPage