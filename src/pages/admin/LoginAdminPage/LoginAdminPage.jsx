import React from "react";
import '../../../public/admin/css/bootstrap.css'
import '../../../public/admin/css/styles.css'
import '../../../public/admin/css/datepicker3.css'
import '../../../public/admin/css/bootstrap-table.css'
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LoginAdminPage = () => {
    const [formData, setFormData] = useState({
		email: "",
		pass: ""
	})
	const [status, setStatus] = useState()
	const [error, setError] = useState()
	const navigate = useNavigate()

	function handleSubmit(event) {
		event.preventDefault()
		if (formData.email && formData.pass) {
			axios.post('http://localhost:3000/api/admin/login', formData).then((res) => {
			  // handle response
                navigate('/admin/dashboard')
                localStorage.setItem('access_admin_token', res.data?.access_token)
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

    return(
        <div className="row">
            <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
                <div className="login-panel panel panel-default">
                    <div className="panel-heading">Tech Shop - Administrator</div>
                    {status === 401 && <div id="errr-ad">{error}</div>}
                    <div className="panel-body">
                        <form method="post" onSubmit={handleSubmit}>
                            <fieldset>
                                <div className="form-group">
                                    <input 
                                        className="form-control" 
                                        placeholder="E-mail" 
                                        name="email" 
                                        type="email" 
                                        autoFocus
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
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
                                        required 
                                    />
                                </div>
                                <div className="checkbox">
                                    <label>
                                        <input name="remember" type="checkbox" value="Remember Me" /> Nhớ tài khoản
                                    </label>
                                </div>
                                <button type="submit" className="custom-btn btn-7">Đăng nhập</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
	    </div>
)
}

export default LoginAdminPage