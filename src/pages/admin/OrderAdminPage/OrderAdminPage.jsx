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
const OrderAdminPage = () => {
    const [orders, setOrders] = useState([])
    const [status, setStatus] = useState()
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate()
    const access_token = localStorage.getItem('access_admin_token')
    useEffect(() => {
        axios.get('https://techshop-backend-0cyn.onrender.com/api/admin/order' , {
            headers: {
                'token': `Beare ${access_token}`
            }
        })
        .then(response => {
            setOrders(response.data.orders)
            setShouldUpdate(false)
        })
        .catch(error => navigate('/admin/login'))
    }, [shouldUpdate])
    const totalOrders = orders.length
    function handleCancle(id) {
        axios.post(`https://techshop-backend-0cyn.onrender.com/api/admin/order/cancle/${id}`)
        .then(response => {
            setShouldUpdate(true);
            setStatus(response.status)
        })
        .catch(error => console.log(error))
    }
    function handleConfirm(id) {
        axios.post(`https://techshop-backend-0cyn.onrender.com/api/admin/order/confirm/${id}`)
        .then(response => {
            setShouldUpdate(true);
            setStatus(response.status)
        })
        .catch(error => console.log(error))
    }
    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    if(status === 202) {
		NotificationManager.success('Hủy đơn hàng thành công');
        setStatus(null);
        setShouldUpdate(true);
        
	}
    if(status === 201) {
		NotificationManager.success('Xác nhận đơn hàng thành công');
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
                        <li className="active">Quản lý đơn hàng</li>
                    </ol>
                </div>
                
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Quản lý đơn hàng</h1>
                    </div>
                </div>

            <Table striped bordered hover size="sm" className="tbl">
                <thead>
                    <tr>
                        <th data-field="id" data-sortable="true">Mã đơn hàng</th>
                        <th>Tên người nhận</th>
                        <th>SĐT</th>
                        <th>Địa chỉ</th>
                        <th>Email</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map(order => {
                        return (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.shippingAddress.fullName}</td>
                                <td>{order.shippingAddress.phone}</td>
                                <td>{order.shippingAddress.address}</td>
                                <td>{order.shippingAddress.email}</td>
                                {order.isPaid === false && order.isCancle === false && order.isComfirmed === false && <td style={{color: "#ffc107"}}>Chưa thanh toán</td>}
                                {order.isPaid === true && order.isCancle === false && order.isComfirmed === false && <td style={{color: "#ffc107"}}>Chờ xác nhận</td>}
                                {order.isCancle === true && <td style={{color: "#dc3545"}}>Đã hủy</td>}
                                {order.isPaid === true && order.isCancle === false && order.isComfirmed === true && <td style={{color: "#28a745"}}>Đã xác nhận</td>}
                                <td className="form-group">
                                    {order.isCancle === false && order.isPaid === true && order.isComfirmed === false  && (
                                        <React.Fragment>
                                            <button
                                                className="btn btn-danger btn1"
                                                ><i className="glyphicon glyphicon-remove"  onClick={() => handleCancle(order._id)}></i
                                            ></button>
                                            <button
                                                className="btn btn-primary btn1"
                                                style={{backgroundColor: "green"}}
                                                ><i className="glyphicon glyphicon-ok"  onClick={() => handleConfirm(order._id)}></i
                                            ></button>
                                        </React.Fragment>
                                    )}
                                    {order.isCancle === false && order.isPaid === false  && (
                                        <React.Fragment>
                                            <button
                                                className="btn btn-danger btn1"
                                                ><i className="glyphicon glyphicon-remove" onClick={() => handleCancle(order._id)} ></i
                                            ></button>
                                        </React.Fragment>
                                    )}
                                </td>

                            </tr>
                        )
                    })}

                </tbody>
            </Table>
            <PaginationComponent
            totalItems={totalOrders}
            itemsPerPage={10}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
    </React.Fragment>
)
}

export default OrderAdminPage