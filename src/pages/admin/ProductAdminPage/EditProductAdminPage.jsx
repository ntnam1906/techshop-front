import React, { useEffect, useState } from "react";
import '../../../public/admin/css/bootstrap.css'
import '../../../public/admin/css/styles.css'
import '../../../public/admin/css/datepicker3.css'
import '../../../public/admin/css/bootstrap-table.css'
import NavbarAdminPage from "../../../components/NavbarAdminComponent/NavbarAdminComponent";
import SideBarAdminComponent from "../../../components/SideBarAdminComponent/SideBarAdminComponent";
import {BsHouseDoor} from 'react-icons/bs'
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate  } from 'react-router-dom'
import _ from "lodash";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const AddProductAdminPage = () => {
    const [formData, setFormData] = useState({
        name: "",
		price: "",
		warranty: "",
        accessories: "",
        promotion: "",
        status: "",
        thumbnail: null,
        cat_id: "",
        is_stock: "1",
        features: "0",
        description: ""
	})
	const [status, setStatus] = useState()
	const [error, setError] = useState()
    const [products, setProducts] = useState()
    const [categories, setCategories] = useState()
	const [file, setFile] = useState(null)
	const [previewImage, setPreviewImage] = useState(null);
    const { id } = useParams()

    const navigate = useNavigate()
    const access_token = localStorage.getItem('access_admin_token')

    useEffect(() => {
        axios.get('http://localhost:3000/api/admin/product', {
            headers: {
                'token': `Beare ${access_token}`
            }
        })
        .then(response => {
			setProducts(response.data.products)
			setFormData(_.find(response.data.products, {_id: id}))
		})
        .catch(error => console.log(error))
    }, [])
    const product = _.find(products, {_id: id})
    useEffect(() => {
        axios.get('http://localhost:3000/api/admin/category', {
            headers: {
                'token': `Beare ${access_token}`
            }
        })
        .then(response => setCategories(response.data.categories))
        .catch(error => console.log(error))
    }, [])

	function handleSubmit(event) {
		event.preventDefault()
        const formdata = new FormData();
        formdata.append("name", formData.name);
        formdata.append("price", formData.price);
        formdata.append("warranty", formData.warranty);
        formdata.append("accessories", formData.accessories);
        formdata.append("promotion", formData.promotion);
        formdata.append("status", formData.status);
        formdata.append("thumbnail", formData.thumbnail); // Thêm ảnh vào FormData
        formdata.append("cat_id", formData.cat_id);
        formdata.append("is_stock", formData.is_stock);
        formdata.append("features", formData.features);
        formdata.append("description", formData.description);
        // console.log(formData)
        axios.post(`http://localhost:3000/api/admin/product/edit/${id}`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				'token': `Beare ${access_token}`
			}
		}).then((res) => {
            const notificationId = NotificationManager.success("", "Sửa sản phẩm thành công", 700);
              setTimeout(() => {
                  const notification = NotificationManager.notifications
                  if (notification && notification.length > 0) {
                    NotificationManager.remove(notificationId);
                  }
                }, 700);
              setTimeout(() => navigate('/admin/product'), 1000)
        })
        .catch((error) => {
            setStatus(error.response.status)
            console.log(error)
            setError(error.response.data.message)
        })
		
	}
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	  };

    const handleFileChange = (event) => {
		const selectedFile = event.target.files[0];
		setFile(selectedFile);
		if (!selectedFile) {
			setPreviewImage(null);
			return;
		  }
		  const reader = new FileReader();
		  reader.onload = () => {
			setPreviewImage(reader.result);
		  };
		  reader.readAsDataURL(selectedFile);
		setFormData({
			...formData,
			thumbnail: event.target.files[0] // Lấy file ảnh từ input
		});
    }
	if(status === 404) {
        NotificationManager.error(error);
        setStatus(null)
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
                        <Link to="/admin/product" id="nav-prev">/ Danh sách sản phẩm </Link>
                        <li className="active">/ {product && product.name}</li>

                    </ol>
                </div>
                
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">{product && product.name}</h1>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="col-md-8">
                                <form role="form" method="post" onSubmit={handleSubmit} encType="multipart/form-data">
								<div className="col-md-6">
									<div className="form-group">
										<label>Tên sản phẩm</label>
										<input
											name="name"
											required
											className="form-control"
											placeholder=""
                                            onChange={handleChange}
                                            value={formData.name}
										/>
									</div>

									<div className="form-group">
										<label>Giá sản phẩm</label>
										<input
											name="price"
											required
											type="number"
											min="0"
											className="form-control"
                                            onChange={handleChange}
                                            value={formData.price}
										/>
									</div>
									<div className="form-group">
										<label>Bảo hành</label>
										<input
											name="warranty"
											required
											type="text"
											className="form-control" 
                                            onChange={handleChange}
                                            value={formData.warranty}
										/>
									</div>
									<div className="form-group">
										<label>Phụ kiện</label>
										<input
											name="accessories"
											required
											type="text"
											className="form-control"
                                            onChange={handleChange}
                                            value={formData.accessories}
										/>
									</div>
									<div className="form-group">
										<label>Khuyến mãi</label>
										<input
											name="promotion"
											required
											type="text"
											className="form-control" 
                                            onChange={handleChange}
                                            value={formData.promotion}
										/>
									</div>
									<div className="form-group">
										<label>Tình trạng</label>
										<input
											name="status"
											required
											type="text"
											className="form-control"
                                            onChange={handleChange}
                                            value={formData.status}
										/>
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<label>Ảnh sản phẩm</label>

										<input name="thumbnail" required type="file"  onChange={handleFileChange} />
										<br />
										{previewImage && <img src={previewImage} alt="Preview" id="img-admin" />}
									</div>
									<div className="form-group">
										<label>Danh mục</label>
										<select name="cat_id" className="form-control" value={formData.cat_id} onChange={handleChange} required>
											<option value="" disabled selected>Chọn một danh mục</option>
                                            {categories && categories.map(category => {
                                                return(
                                                    <option value={category._id} key={category._id}>
                                                        {category.title}
                                                    </option>
                                                )
                                            })}
										</select>
									</div>

									<div className="form-group">
										<label>Trạng thái</label>
										<select name="is_stock" className="form-control" onChange={handleChange} value={formData.is_stock}>
											<option value="1">Còn hàng</option>
											<option value="0">Hết hàng</option>
										</select>
									</div>

									<div className="form-group">
										<label>Sản phẩm nổi bật</label>
										<div className="checkbox">
											<label>
												<input
													name="features"
													type="checkbox"
													value="1" 
                                                    onChange={handleChange}
												/>Nổi bật
											</label>
										</div>
									</div>
									<div className="form-group">
										<label>Mô tả sản phẩm</label>
										<textarea
											name="description"
											required
											className="form-control"
											rows="3" 
                                            onChange={handleChange}
                                            value={formData.description}
										></textarea>
									</div>
									<button name="sbm" type="submit" className="btn btn-success">
										Cập nhật
									</button>
								</div>
							</form>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
			</div>

            
        
    </React.Fragment>
)
}

export default AddProductAdminPage