import React, { useEffect, useState } from "react";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import NavbarComponent from "../../../components/NavbarComponent/NavbarComponent";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import SideBarComponent from "../../../components/SideBarComponent/SideBarComponent";
import FooterComponent from "../../../components/FooterComponent/FooterComponent";
import axios from "axios";
import { useNavigate  } from 'react-router-dom'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
const ActivateAccountPage = () => {
	const [token, setToken] = useState('');

	const [status, setStatus] = useState()
	const [error, setError] = useState()
    const navigate = useNavigate()
    const access_token = localStorage.getItem('access_token')
	function handleSubmit(event) {
		event.preventDefault()
		if (token) {
			axios.post('http://localhost:3000/api/local/active', {token: token}, {
                headers: {
                    'token': `Beare ${access_token}`
                }
            }).then((res) => {
			  // handle response
              if(res.status === 201) {
                localStorage.setItem('activeSuccess', true)
                navigate('/')
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
                            <h1>Kích hoạt tài khoản</h1>
                            <br/>
                            <h4>Mã xác minh đã được gửi đến Email của bạn. Vui lòng kiểm tra Email và nhập mã xác minh tại đây: </h4>

                            {status === 500 && <div id="errr">{error}</div>}
                            
                            <Form onSubmit={handleSubmit} style={{marginTop: 14 + 'px'}}>
                                <FormGroup controlId="formToken">
                                    <FormControl
                                    type="text"
                                    placeholder="Nhập mã token"
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                    />
                                </FormGroup>
                                <Button type="submit" id="sbm">Xác minh tài khoản</Button>
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