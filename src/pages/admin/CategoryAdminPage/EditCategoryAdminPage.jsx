import React, { useEffect, useState } from "react";
import '../../../public/admin/css/bootstrap.css'
import '../../../public/admin/css/styles.css'
import '../../../public/admin/css/datepicker3.css'
import '../../../public/admin/css/bootstrap-table.css'
import NavbarAdminPage from "../../../components/NavbarAdminComponent/NavbarAdminComponent";
import SideBarAdminComponent from "../../../components/SideBarAdminComponent/SideBarAdminComponent";
import {BsHouseDoor} from 'react-icons/bs'
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate  } from 'react-router-dom'
import _ from 'lodash'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css'; 
const EditCategoryPage = () => {
    const [formData, setFormData] = useState({
        cat_name: "",
	})
	const [status, setStatus] = useState()
	const [error, setError] = useState()
    const { id } = useParams()
    const [data, setData] = useState({})
    const access_token = localStorage.getItem('access_admin_token')

    useEffect(() => {
        axios.get('http://localhost:3000/api/admin/category', {
            headers: {
                'token': `Beare ${access_token}`
            }
        })
        .then(response => {
            setData(response.data.categories)
        })
        .catch(error => console.log(error))
    }, [])
    const category = _.find(data, {_id: id})
    const navigate = useNavigate()
	function handleSubmit(event) {
		event.preventDefault()
		if (formData.cat_name) {
			axios.post(`http://localhost:3000/api/admin/category/edit/${id}`, formData, {
                headers: {
                    'token': `Beare ${access_token}`
                }
            }).then((res) => {
                const notificationId = NotificationManager.success("", "Sửa danh mục thành công.", 700);
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
                        <li className="active">/ {category && category.title}</li>

                    </ol>
                </div>
                
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Danh mục: {category && category.title}</h1>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="col-md-8">
                                    <form role="form" method="post" onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label>Tên danh mục:</label>
                                            <input 
                                                type="text" 
                                                name="cat_name" 
                                                required 
                                                className="form-control" 
                                                placeholder="Tên danh mục..."
                                                onChange={handleChange}
                                                value={formData.cat_name}
                                                />
                                        </div>
                                        <button type="submit" name="sbm" className="btn btn-primary">Cập nhật</button>
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

export default EditCategoryPage