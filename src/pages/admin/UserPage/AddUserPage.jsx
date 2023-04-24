import React, { useEffect, useState } from "react";
import '../../../public/admin/css/bootstrap.css'
import '../../../public/admin/css/styles.css'
import '../../../public/admin/css/datepicker3.css'
import '../../../public/admin/css/bootstrap-table.css'
import NavbarAdminPage from "../../../components/NavbarAdminComponent/NavbarAdminComponent";
import SideBarAdminComponent from "../../../components/SideBarAdminComponent/SideBarAdminComponent";
import './user.css'
import {BsHouseDoor} from 'react-icons/bs'
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate  } from 'react-router-dom'
const AddUserPage = () => {
    const [formData, setFormData] = useState({
        full_name: "",
		email: "",
		pass: "",
        role: ""
	})
	const [status, setStatus] = useState()
	const [error, setError] = useState()
    const navigate = useNavigate()
    const access_token = localStorage.getItem('access_admin_token')

	function handleSubmit(event) {
		event.preventDefault()
		if (formData.email && formData.pass && formData.role && formData.full_name) {
			axios.post('http://localhost:3000/api/admin/user/add', formData, {
                headers: {
                    'token': `Beare ${access_token}`
                }
            }).then((res) => {
			  // handle response
                if(res.status === 201) {
                    localStorage.setItem('addUserSuccess', true)
                    navigate('/admin/user')
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
            <NavbarAdminPage />
                
            <SideBarAdminComponent />
            
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">			
                <div className="row">
                    <ol className="breadcrumb">
                        <li><a href="#"><BsHouseDoor /></a></li>
                        <Link to="/admin/user" id="nav-prev">/ Danh sách thành viên </Link>
                        <li className="active">/ Thêm thành viên</li>

                    </ol>
                </div>
                
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Thêm thành viên</h1>
                    </div>
                </div>
                {status === 404 && <div id="errr">{error}</div>}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="col-md-8">
                                    <form role="form" method="post" onSubmit={handleSubmit} encType="multipart/form-data">
                                        <div className="form-group">
                                            <label>Họ & Tên</label>
                                            <input 
                                                name="full_name"
                                                required className="form-control" 
                                                placeholder=""
                                                onChange={handleChange}
                                                value={formData.full_name}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input 
                                                name="email" 
                                                required
                                                type="text" 
                                                className="form-control"
                                                onChange={handleChange}
                                                value={formData.email}
                                            />
                                        </div>                       
                                        <div className="form-group">
                                            <label>Mật khẩu</label>
                                            <input 
                                                name="pass" 
                                                required 
                                                type="password"  
                                                className="form-control"
                                                onChange={handleChange}
                                                value={formData.pass}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Quyền</label>
                                            <input 
                                                name="role" 
                                                required 
                                                type="text"  
                                                className="form-control"
                                                onChange={handleChange}
                                                value={formData.role}
                                            />
                                        </div>
                                        <button name="sbm" type="submit" className="btn btn-success">Thêm mới</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
			</div>

            
        
    </React.Fragment>
)
}

export default AddUserPage