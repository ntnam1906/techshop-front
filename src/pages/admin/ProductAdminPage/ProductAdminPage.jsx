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
const ProductAdminPage = () => {
    return(
        <body>
            <NavbarAdminPage />
                
            <SideBarAdminComponent />
            
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">			
                <div className="row">
                    <ol className="breadcrumb">
                        <li><a href="#"><BsHouseDoor /></a></li>
                        <li className="active">Danh sách sản phẩm</li>
                    </ol>
                </div>
                
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Danh sách sản phẩm</h1>
                    </div>
                </div>
                
                <div id="toolbar" class="btn-group">
				<Link to="/admin/product/add" class="btn btn-success">
					<i class="glyphicon glyphicon-plus"></i> Thêm sản phẩm
				</Link>
			</div>
            <Table striped bordered hover size="sm" className="tbl">
                <thead>
                    <tr>
                        <th data-field="id" data-sortable="true">STT</th>
                        <th data-field="name" data-sortable="true">Tên sản phẩm</th>
                        <th data-field="price" data-sortable="true">Giá</th>
                        <th>Ảnh sản phẩm</th>
                        <th>Trạng thái</th>
                        <th>Danh mục</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>iphone XS max</td>
                        <td>100000</td>
                        <td>Ảnh</td>
                        <td>Còn hàng</td>
                        <td>Iphone</td>
                        <td class="form-group">
                            <Link
                                to="/admin/product/edit/<%=product._id%>"
                                class="btn btn-primary btn1"
                                ><i class="glyphicon glyphicon-pencil"></i
                            >  </Link>
                            <Link
                                to="/admin/product/delete/<%=product._id%>"
                                class="btn btn-danger btn1"
                                ><i class="glyphicon glyphicon-remove"></i
                            ></Link>
						</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>iphone XS max</td>
                        <td>100000</td>
                        <td>Ảnh</td>
                        <td>Còn hàng</td>
                        <td>Iphone</td>
                        <td class="form-group">
                            <Link
                                to="/admin/product/edit/<%=product._id%>"
                                class="btn btn-primary btn1"
                                ><i class="glyphicon glyphicon-pencil"></i
                            >  </Link>
                            <Link
                                to="/admin/product/delete/<%=product._id%>"
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

export default ProductAdminPage