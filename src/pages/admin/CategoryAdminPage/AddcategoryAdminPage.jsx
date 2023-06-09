import React, { useEffect, useState } from "react";
import '../../../public/admin/css/bootstrap.css'
import '../../../public/admin/css/styles.css'
import '../../../public/admin/css/datepicker3.css'
import '../../../public/admin/css/bootstrap-table.css'
import NavbarAdminPage from "../../../components/NavbarAdminComponent/NavbarAdminComponent";
import SideBarAdminComponent from "../../../components/SideBarAdminComponent/SideBarAdminComponent";
import {BsHouseDoor} from 'react-icons/bs'
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate  } from 'react-router-dom'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const AddCategoryPage = () => {
    const [formData, setFormData] = useState({
        cat_name: "",
	})
	const [status, setStatus] = useState()
	const [error, setError] = useState()
    const navigate = useNavigate()
    const access_token = localStorage.getItem('access_admin_token')
	function handleSubmit(event) {
		event.preventDefault()
		if (formData.cat_name) {
			axios.post('http://localhost:3000/api/admin/category/add', formData, {
                headers: {
                    'token': `Beare ${access_token}`
                }
            }).then((res) => {
			  // handle response
              const notificationId = NotificationManager.success("", "Thêm danh mục thành công", 700);
              setTimeout(() => {
                  const notification = NotificationManager.notifications
                  if (notification && notification.length > 0) {
                    NotificationManager.remove(notificationId);
                  }
                }, 700);
              setTimeout(() => navigate('/admin/category'), 1000)
			})
			.catch((error) => {
				setStatus(error.response.status)
				setError(error.response.data.message)
			})
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
                        <Link to="/admin/category" id="nav-prev">/ Quản lý danh mục </Link>
                        <li className="active">/ Thêm danh mục</li>

                    </ol>
                </div>
                
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Thêm danh mục</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="col-md-8">
                                    <form role="form" method="post" onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <label>Tên danh mục:</label>
                                            <input 
                                                required 
                                                type="text" 
                                                name="cat_name" 
                                                class="form-control" 
                                                placeholder="Tên danh mục..."
                                                onChange={handleChange}
                                                value={formData.cat_name}
                                            />
                                        </div>
                                        <button type="submit" name="sbm" class="btn btn-success">Thêm mới</button>
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

export default AddCategoryPage