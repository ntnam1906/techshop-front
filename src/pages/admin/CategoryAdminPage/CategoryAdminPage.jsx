import React from "react";
import '../../../public/admin/css/bootstrap.css'
import '../../../public/admin/css/styles.css'
import '../../../public/admin/css/datepicker3.css'
import '../../../public/admin/css/bootstrap-table.css'
import Table from 'react-bootstrap/Table';
import NavbarAdminPage from "../../../components/NavbarAdminComponent/NavbarAdminComponent";
import SideBarAdminComponent from "../../../components/SideBarAdminComponent/SideBarAdminComponent";
import {BsHouseDoor} from 'react-icons/bs'
import { Link } from "react-router-dom";
const CategoryAdminPage = () => {
    return(
        <body>
            <NavbarAdminPage />
                
            <SideBarAdminComponent />
            
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">			
                <div className="row">
                    <ol className="breadcrumb">
                        <li><a href="#"><BsHouseDoor /></a></li>
                        <li className="active">Quản lý danh mục</li>
                    </ol>
                </div>
                
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Quản lý danh mục</h1>
                    </div>
                </div>
                
                <div id="toolbar" class="btn-group">
				<Link to="/admin/category/add" class="btn btn-success">
					<i class="glyphicon glyphicon-plus"></i> Thêm danh mục
				</Link>
			</div>
            <Table striped bordered hover size="sm" className="tbl">
                <thead>
                    <tr>
                        <th data-field="id" data-sortable="true">ID</th>
                        <th>Tên danh mục</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>iphone</td>
                        <td class="form-group">
                            <Link
                                to="/admin/category/edit/<%=category._id%>"
                                class="btn btn-primary btn1"
                                ><i class="glyphicon glyphicon-pencil"></i
                            >  </Link>
                            <Link
                                to="/admin/category/delete/<%=category._id%>"
                                class="btn btn-danger btn1"
                                ><i class="glyphicon glyphicon-remove"></i
                            ></Link>
						</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Sam Sung</td>
                        <td class="form-group">
                            <Link
                                to="/admin/category/edit/<%=category._id%>"
                                class="btn btn-primary btn1"
                                ><i class="glyphicon glyphicon-pencil"></i
                            >  </Link>
                            <Link
                                to="/admin/category/delete/<%=category._id%>"
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

export default CategoryAdminPage