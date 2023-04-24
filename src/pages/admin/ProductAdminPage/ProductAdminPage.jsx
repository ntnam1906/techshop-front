import React, { useEffect, useState } from "react";
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
import { Buffer } from "buffer";
import PaginationComponent from "../../../components/PaginationComponent/PaginationComponent";
const ProductAdminPage = () => {
    const [products, setProducts] = useState([])
    const [status, setStatus] = useState()
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const addProductSuccess = localStorage.getItem('addProductSuccess')
    const editProductSuccess = localStorage.getItem('editProductSuccess')

    const navigate = useNavigate();
    const access_token = localStorage.getItem('access_admin_token')

    useEffect(() => {
        axios.get('http://localhost:3000/api/admin/product', {
            headers: {
                'token': `Beare ${access_token}`
            }
        })
        .then(response => setProducts(response.data.products))
        .catch(error => navigate('/admin/login'))
    }, [shouldUpdate])

    setTimeout(function() {
        if(addProductSuccess) localStorage.setItem('addProductSuccess', "false")
    },2000)
    setTimeout(function() {
        if(editProductSuccess) localStorage.setItem('editProductSuccess', "false")
    },2000)

    const totalProducts = products.length
    function handleRemove(id) {
        axios.post(`http://localhost:3000/api/admin/product/delete/${id}`, {
            headers: {
                'token': `Beare ${access_token}`
            }
        })
        .then(response => {
            setShouldUpdate(true);
            setStatus(response.status)
        })
        .catch(error => console.log(error))
    }
    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    return(
        <React.Fragment>
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
                
                <div id="toolbar" className="btn-group">
				<Link to="/admin/product/add" className="btn btn-success">
					<i className="glyphicon glyphicon-plus"></i> Thêm sản phẩm
				</Link>
			</div>
            {addProductSuccess==="true" && <div id="success-admin">Thêm sản phẩm thành công</div> }
            {editProductSuccess==="true" && <div id="success-admin">Cập nhật sản phẩm thành công</div> }
            {status===200 && <div id="success-admin">Xóa sản phẩm thành công</div> }
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
                    {products && products.map((product, index) => {
                        return(
                            <tr key={product._id}>
                                <td>{index}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td><img src={`data:${product.thumbnail.contentType};base64,${Buffer.from(product.thumbnail.data).toString('base64')}`} alt={product.name} id="img-admin"/></td>
                                <td>{product.is_stock === true ? "Còn hàng" : "Hết Hàng"}</td>
                                <td>{product.cat_id && product.cat_id.title}</td>
                                <td className="form-group">
                                    <Link
                                        to={`/admin/product/edit/${product._id}`}
                                        className="btn btn-primary btn1"
                                        ><i className="glyphicon glyphicon-pencil"></i
                                    >  </Link>
                                    <button
                                        className="btn btn-danger btn1"
                                        ><i className="glyphicon glyphicon-remove" onClick={() => handleRemove(product._id)}></i
                                    ></button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>
            <PaginationComponent
            totalItems={totalProducts}
            itemsPerPage={10}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
    </React.Fragment>
)
}

export default ProductAdminPage