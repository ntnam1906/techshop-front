import React, { useEffect, useState } from "react";
import '../../../public/admin/css/bootstrap.css'
import '../../../public/admin/css/styles.css'
import '../../../public/admin/css/datepicker3.css'
import '../../../public/admin/css/bootstrap-table.css'
import Table from 'react-bootstrap/Table';
import NavbarAdminPage from "../../../components/NavbarAdminComponent/NavbarAdminComponent";
import SideBarAdminComponent from "../../../components/SideBarAdminComponent/SideBarAdminComponent";
import './user.css'
import {BsHouseDoor} from 'react-icons/bs'
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate  } from 'react-router-dom'
import _ from 'lodash'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const EditUserPage = () => {
    const [formData, setFormData] = useState({
        full_name: "",
		email: "",
		pass: "",
        role: ""
	})
	const [status, setStatus] = useState()
	const [error, setError] = useState()
    const { id } = useParams()
    const [data, setData] = useState({})
    const access_token = localStorage.getItem('access_admin_token')
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
    useEffect(() => {
        axios.get('http://localhost:3000/api/admin/user', {
            headers: {
                'token': `Beare ${access_token}`
            }
        })
        .then(response => {
            setData(response.data.users)
        })
        .catch(error => console.log(error))
    }, [])
    const user = _.find(data, {_id: id})
    const navigate = useNavigate()

	function handleSubmit(event) {
		event.preventDefault()
		if (formData.email && formData.pass && formData.role && formData.full_name) {
            if (!validateEmail(formData.email)) {
                NotificationManager.error('Email không đúng định dạng. Vui lòng nhập lại');
                return;
              }
            if(formData.role !== "member" && formData.role !== "admin") {
                NotificationManager.error('Vai trò phải là member hoặc admin. Vui lòng nhập lại');
                return;
            }
			axios.post(`http://localhost:3000/api/admin/user/edit/${id}`, formData, {
                headers: {
                    'token': `Beare ${access_token}`
                }
            }).then((res) => {
			  // handle response
              const notificationId = NotificationManager.success("", "Sửa tài khoản thành công", 700);
              setTimeout(() => {
                  const notification = NotificationManager.notifications
                  if (notification && notification.length > 0) {
                    NotificationManager.remove(notificationId);
                  }
                }, 700);
              setTimeout(() => navigate('/admin/user'), 1000)
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
      if(status === 404) {
        NotificationManager.error(error);
        setStatus(null)
      }
    return(

        <React.Fragment>
			<NotificationContainer />

            <NavbarAdminPage />
                
            <SideBarAdminComponent />
            
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">			
                <div className="row">
                    <ol className="breadcrumb">
                        <li><a href="#"><BsHouseDoor /></a></li>
                        <Link to="/admin/user" id="nav-prev">/ Danh sách thành viên </Link>
                        <li className="active">/ {user && user.full_name}</li>

                    </ol>
                </div>
                
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Thành viên: {user && user.full_name}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="col-md-8">
                                    <form role="form" method="post" onSubmit={handleSubmit}>
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
                                        <button name="sbm" type="submit" className="btn btn-success">Cập nhật</button>
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

export default EditUserPage