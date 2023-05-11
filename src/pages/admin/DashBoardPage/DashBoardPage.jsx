import React, { useEffect, useState } from "react";
import '../../../public/admin/css/bootstrap.css'
import '../../../public/admin/css/styles.css'
import '../../../public/admin/css/datepicker3.css'
import '../../../public/admin/css/bootstrap-table.css'
import './dashboard.css'
import jwt_decode from "jwt-decode"
import NavbarAdminPage from "../../../components/NavbarAdminComponent/NavbarAdminComponent";
import SideBarAdminComponent from "../../../components/SideBarAdminComponent/SideBarAdminComponent";
import {BsHouseDoor, BsBagDash, BsChatLeftText, BsFillPersonLinesFill, BsBadgeAdFill} from 'react-icons/bs'
import axios from "axios";
import { useNavigate } from "react-router-dom";
const DashBoardPage = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({})
    const access_token = localStorage.getItem('access_admin_token')
    useEffect(() => {
        axios.get('http://localhost:3000/api/admin/dashboard', {
            headers: {
                'token': `Beare ${access_token}`
            }
        })
        .then(response => setData(response.data))
        .catch(error => navigate('/admin/login'))
    }, [])

    const products = data.products
    const users = data.users
    const comments = data.comments
    return(
        <React.Fragment>
            <NavbarAdminPage />
                
            <SideBarAdminComponent />
            
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">			
                <div className="row">
                    <ol className="breadcrumb">
                        <li><a href="#"><BsHouseDoor /></a></li>
                        <li className="active">Trang chủ quản trị</li>
                    </ol>
                </div>
                
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Trang chủ quản trị</h1>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="panel panel-blue panel-widget ">
                            <div className="row no-padding">
                                <div className="col-sm-3 col-lg-5 widget-left">
                                    <BsBagDash className="icon"/>
                                </div>
                                <div className="col-sm-9 col-lg-7 widget-right">
                                    <div className="large">{products && products.length}</div>
                                    <div className="text-muted">Sản Phẩm</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="panel panel-orange panel-widget">
                            <div className="row no-padding">
                                <div className="col-sm-3 col-lg-5 widget-left">
                                    <BsChatLeftText className="icon"/>
                                </div>
                                <div className="col-sm-9 col-lg-7 widget-right">
                                    <div className="large">{comments && comments.length}</div>
                                    <div className="text-muted">Bình Luận</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="panel panel-teal panel-widget">
                            <div className="row no-padding">
                                <div className="col-sm-3 col-lg-5 widget-left">
                                    <BsFillPersonLinesFill className="icon" />
                                </div>
                                <div className="col-sm-9 col-lg-7 widget-right">
                                    <div className="large">{users && users.length}</div>
                                    <div className="text-muted">Thành Viên</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="panel panel-red panel-widget">
                            <div className="row no-padding">
                                <div className="col-sm-3 col-lg-5 widget-left">
                                    <BsBadgeAdFill className="icon" />
                                </div>
                                <div className="col-sm-9 col-lg-7 widget-right">
                                    <div className="large">25.2k</div>
                                    <div className="text-muted">Quảng Cáo</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>	

        </React.Fragment>
)
}

export default DashBoardPage