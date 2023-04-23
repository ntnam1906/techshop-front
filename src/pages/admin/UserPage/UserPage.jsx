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
import PaginationAdminComponent from "../../../components/PaginationAdminComponent/PaginationAdminComponent";
const UserPage = () => {
    const [data, setData] = useState({})
    const [status, setStatus] = useState()
    const [shouldUpdate, setShouldUpdate] = useState(false);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [pages, setPages] = useState(1);

    const addUserSuccess = localStorage.getItem('addUserSuccess')
    const editUserSuccess = localStorage.getItem('editUserSuccess')
    useEffect(() => {
        axios.get('http://localhost:3000/api/admin/user')
        .then(response => {
            setData(response.data)
            // setPages(response.data.pages)
        })
        .catch(error => console.log(error))
    }, [shouldUpdate])
    setTimeout(function() {
        if(addUserSuccess) localStorage.setItem('addUserSuccess', "false")
    },2000)
    setTimeout(function() {
        if(editUserSuccess) localStorage.setItem('editUserSuccess', "false")
    },2000)

    const users = data.users

    function handleRemove(id) {
        axios.post(`http://localhost:3000/api/admin/user/delete/${id}`)
        .then(response => {
            setShouldUpdate(true);
            setStatus(response.status)
        })
        .catch(error => console.log(error))
    }
    // const handlePageChange = (pageNumber) => {
    //     setCurrentPage(pageNumber)
    // }

    return(

        <React.Fragment>
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
                {status===200 && <div id="success-admin">Xóa tài khoản thành công</div> }

                <Table striped bordered hover size="sm" className="tbl">
                    <thead>
                        <tr>
                            <th data-field="id" data-sortable="true">ID</th>
                            <th data-field="name" data-sortable="true">Họ và Tên</th>
                            <th data-field="price" data-sortable="true">Email</th>
                            <th>Quyền</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map(user => {
                            return (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.full_name}</td>
                                <td>{user.email}</td>
                                <td>{user.role === 'admin' ? <span className="label label-danger">{user.role}</span> : <span className="label label-warning">{user.role}</span>}</td>
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
               
            </div>
    </React.Fragment>
)
}

export default UserPage