import React, {useState, useEffect} from "react";
import '../../../public/admin/css/bootstrap.css'
import '../../../public/admin/css/styles.css'
import '../../../public/admin/css/datepicker3.css'
import '../../../public/admin/css/bootstrap-table.css'
import Table from 'react-bootstrap/Table';
import NavbarAdminPage from "../../../components/NavbarAdminComponent/NavbarAdminComponent";
import SideBarAdminComponent from "../../../components/SideBarAdminComponent/SideBarAdminComponent";
import {BsHouseDoor} from 'react-icons/bs'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PaginationComponent from "../../../components/PaginationComponent/PaginationComponent";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const CommentAdminPage = () => {
    const [data, setData] = useState([])
    const [status, setStatus] = useState()
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate()
    const access_token = localStorage.getItem('access_admin_token')
    useEffect(() => {
        axios.get('https://techshop-backend-0cyn.onrender.com/api/admin/comment' , {
            headers: {
                'token': `Beare ${access_token}`
            }
        })
        .then(response => {
            setData(response.data)
            setShouldUpdate(false)
        })
        .catch(error => navigate('/admin/login'))
    }, [shouldUpdate])
    const comments = data.comments
    function handleCancle(id) {
        axios.post(`https://techshop-backend-0cyn.onrender.com/api/admin/comment/delete/${id}`)
        .then(response => {
            setShouldUpdate(true);
            setStatus(response.status)
        })
        .catch(error => console.log(error))
    }
 
    if(status === 202) {
		NotificationManager.success('Xóa bình luận thành công');
        setStatus(null);
        setShouldUpdate(true);
        
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
                        <li className="active">Quản lý bình luận</li>
                    </ol>
                </div>
                
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Quản lý bình luận</h1>
                    </div>
                </div>

            <Table striped bordered hover size="sm" className="tbl">
                <thead>
                    <tr>
                        <th data-field="id" data-sortable="true">Mã bình luận</th>
                        <th>Tên tài khoản</th>
                        <th>Sản phẩm</th>
                        <th>Nội dung bình luận</th>
                        <th>Hành động</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {comments && comments.map(comment => {
                        return (
                            <tr key={comment._id}>
                                <td>{comment._id}</td>
                                <td>{comment.user_id && comment.user_id.full_name}</td>
                                <td>{comment.prd_id.name}</td>
                                <td>{comment.body}</td>
                                
                                <td>
                                    <button
                                        className="btn btn-danger btn1"
                                        ><i className="glyphicon glyphicon-remove" onClick={() => handleCancle(comment._id)} ></i
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

export default CommentAdminPage