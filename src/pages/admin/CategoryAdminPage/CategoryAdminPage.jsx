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
const CategoryAdminPage = () => {
    const [categories, setCategories] = useState([])
    const [status, setStatus] = useState()
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const addCategorySuccess = localStorage.getItem('addCategorySuccess')
    const editCategorySuccess = localStorage.getItem('editCategorySuccess')

    const navigate = useNavigate()
    const access_token = localStorage.getItem('access_admin_token')
    useEffect(() => {
        axios.get('http://localhost:3000/api/admin/category' , {
            headers: {
                'token': `Beare ${access_token}`
            }
        })
        .then(response => setCategories(response.data.categories))
        .catch(error => navigate('/admin/login'))
    }, [shouldUpdate])
    setTimeout(function() {
        if(addCategorySuccess) localStorage.setItem('addCategorySuccess', "false")
    },2000)
    setTimeout(function() {
        if(editCategorySuccess) localStorage.setItem('editCategorySuccess', "false")
    },2000)
    const totalCategories = categories.length
    function handleRemove(id) {
        axios.post(`http://localhost:3000/api/admin/category/delete/${id}`, {
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
                        <li className="active">Quản lý danh mục</li>
                    </ol>
                </div>
                
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Quản lý danh mục</h1>
                    </div>
                </div>
                
                <div id="toolbar" className="btn-group">
				<Link to="/admin/category/add" className="btn btn-success">
					<i className="glyphicon glyphicon-plus"></i> Thêm danh mục
				</Link>
			</div>
            {addCategorySuccess==="true" && <div id="success-admin">Thêm tài khoản thành công</div> }
            {editCategorySuccess==="true" && <div id="success-admin">Sửa tài khoản thành công</div> }
            {status===200 && <div id="success-admin">Xóa tài khoản thành công</div> }

            <Table striped bordered hover size="sm" className="tbl">
                <thead>
                    <tr>
                        <th data-field="id" data-sortable="true">ID</th>
                        <th>Tên danh mục</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {categories && categories.map(category => {
                        return(
                            <tr key={category._id}>
                                <td>{category._id}</td>
                                <td>{category.title}</td>
                                <td className="form-group">
                                    <Link
                                        to={`/admin/category/edit/${category._id}`}
                                        className="btn btn-primary btn1"
                                        ><i className="glyphicon glyphicon-pencil"></i
                                    >  </Link>
                                    <button
                                        className="btn btn-danger btn1"
                                        ><i className="glyphicon glyphicon-remove" onClick={() => handleRemove(category._id)}></i
                                    ></button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>
            <PaginationComponent
            totalItems={totalCategories}
            itemsPerPage={10}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
    </React.Fragment>
)
}

export default CategoryAdminPage