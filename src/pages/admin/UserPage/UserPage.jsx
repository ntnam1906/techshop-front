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
import { Link } from "react-router-dom";
import axios from "axios";
import PaginationComponent from "../../../components/PaginationComponent/PaginationComponent";
import jwt_decode from "jwt-decode"
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const UserPage = () => {
    const [users, setUsers] = useState([])
    const [status, setStatus] = useState()
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const addUserSuccess = localStorage.getItem('addUserSuccess')
    const editUserSuccess = localStorage.getItem('editUserSuccess')
    const access_token = localStorage.getItem('access_admin_token')
    let decoded = []
    if(access_token) {
        decoded = jwt_decode(access_token)
    }
    useEffect(() => {
        async function fetchData() {
          const response = await axios.get(`https://techshop-backend-0cyn.onrender.com/api/admin/user?page=${currentPage}`, {
            headers: {
                'token': `Beare ${access_token}`
            }
        });
          setUsers(response.data.users);
          setShouldUpdate(false)
        }
        fetchData();
      }, [currentPage, shouldUpdate]);
      const totalUsers = users.length


    function handleRemove(id) {
        axios.post(`https://techshop-backend-0cyn.onrender.com/api/admin/user/delete/${id}`, {
            headers: {
                'token': `Beare ${access_token}`
            }
        })
        .then(response => {
            const notificationId = NotificationManager.success("", "Xóa tài khoản thành công",1000);
            setTimeout(() => {
                const notification = NotificationManager.notifications
                if (notification && notification.length > 0) {
                  NotificationManager.remove(notificationId);
                }
              }, 1000);
            setShouldUpdate(true);
            setStatus(response.status)
        })
        .catch(error => {
            const notificationId = NotificationManager.error("", "Không thể tự xóa chính mình",1000);
            setTimeout(() => {
                const notification = NotificationManager.notifications
                if (notification && notification.length > 0) {
                  NotificationManager.remove(notificationId);
                }
              }, 1000);
            setShouldUpdate(true);
            console.log(error)})
    }
    const handlePageChange = (page) => {
        setCurrentPage(page);
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
                        <li className="active">Danh sách thành viên</li>
                    </ol>
                </div>
                
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Danh sách thành viên</h1>
                    </div>
                </div>
                
                <div id="toolbar" className="btn-group">
                    <Link to="/admin/user/add" className="btn btn-success">
                        <i className="glyphicon glyphicon-plus"></i> Thêm thành viên
                    </Link>
			    </div>
                {addUserSuccess==="true" && <div id="success-admin">Thêm tài khoản thành công</div> }
                {editUserSuccess==="true" && <div id="success-admin">Sửa tài khoản thành công</div> }

                <Table striped bordered hover size="sm" className="tbl">
                    <thead>
                        <tr>
                            <th data-field="id" data-sortable="true">ID</th>
                            <th data-field="name" data-sortable="true">Họ và Tên</th>
                            <th data-field="price" data-sortable="true">Email</th>
                            <th>Quyền</th>
                            <th>Kích hoạt</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => {
                            return (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.full_name}</td>
                                <td>{user.email}</td>
                                <td>{user.role === 'admin' ? <span className="label label-danger">{user.role}</span> : <span className="label label-warning">{user.role}</span>}</td>
                                <td>{user.isActivated === true ? "Đã kích hoạt": "Chưa kích hoạt"}</td>
                                <td className="form-group">
                                    <Link
                                        to={`/admin/user/edit/${user._id}`}
                                        className="btn btn-primary btn1"
                                        ><i className="glyphicon glyphicon-pencil"></i
                                    >  </Link>
                                    <button
                                        className="btn btn-danger btn1"
                                        ><i className="glyphicon glyphicon-remove" onClick={() => handleRemove(user._id)}></i
                                    ></button>
                                </td>
                            </tr>
                            )
                        })}
                        
                    </tbody>
                </Table>
                <PaginationComponent
                totalItems={totalUsers}
                itemsPerPage={10}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
    </React.Fragment>
)
}

export default UserPage