import React from "react";
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
const UserPage = () => {
    return(
        <body>
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
                
                <div id="toolbar" class="btn-group">
				<Link to="/admin/user/add" class="btn btn-success">
					<i class="glyphicon glyphicon-plus"></i> Thêm thành viên
				</Link>
			</div>
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
                    <tr>
                        <td>1</td>
                        <td>Nguyễn Thế Nam</td>
                        <td>Mark</td>
                        <td><span class="label label-danger">admin</span></td>
                        <td class="form-group">
                            <Link
                                to="/admin/user/edit/<%=user._id%>"
                                class="btn btn-primary btn1"
                                ><i class="glyphicon glyphicon-pencil"></i
                            >  </Link>
                            <Link
                                to="/admin/user/delete/<%=user._id%>"
                                class="btn btn-danger btn1"
                                ><i class="glyphicon glyphicon-remove"></i
                            ></Link>
						</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Nguyễn Văn B</td>
                        <td>Mark@gmail.com</td>
                        <td><span class="label label-warning">member</span></td>
                        <td class="form-group">
                            <Link
                                to="/admin/user/edit/<%=user._id%>"
                                class="btn btn-primary btn1"
                                ><i class="glyphicon glyphicon-pencil"></i
                            >  </Link>
                            <Link
                                to="/admin/user/delete/<%=user._id%>"
                                class="btn btn-danger btn1"
                                ><i class="glyphicon glyphicon-remove"></i
                            ></Link>
						</td>
                    </tr>
                    
                </tbody>
            </Table>
        </div>
    </body>
)
}

export default UserPage