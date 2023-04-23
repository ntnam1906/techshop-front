import React from "react";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import NavbarComponent from "../../../components/NavbarComponent/NavbarComponent";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import SideBarComponent from "../../../components/SideBarComponent/SideBarComponent";
import FooterComponent from "../../../components/FooterComponent/FooterComponent";
import '../../../public/local/css/category.css'
import '../../../public/local/css/bootstrap.css'
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const CategoryPage = () => {
    const [data, setData] = useState({})
	const { id } = useParams()
	
	useEffect(() => {

		const fetchData = async () => {
			try {
			  const { data } = await axios.get(`http://localhost:3000/api/local/category/${id}`);
			  setData(data);
			} catch (error) {
			  console.log(error);
			}
		  };
		
		  fetchData();
	}, [id])
	const products = data.products

    return(
        <React.Fragment>
            <HeaderComponent />
		
            <div id="body">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <NavbarComponent />
                        </div>
                    </div>
                    <div className="row">
                        <div id="main" className="col-lg-8 col-md-12 col-sm-12">
                            <SliderComponent />

                            <div className="products">
                                <h3>{data && data.title} (Tổng sản phẩm hiện có {data && data.total})</h3>
                                <div className="product-list card-deck">
                                    {products && products.map(product =>{
                                        return(
                                            <div className="product-item card text-center" key={product._id}>
                                                <Link to={`/product/${product._id}`}
                                                    ><img src="" alt="UET"/>
                                                </Link>
                                                <h4>
                                                    <Link to={`/product/${product._id}`}>
                                                        {product.name}
                                                    </Link>
                                                </h4>
                                                <p>Giá Bán: <span>{product.price}đ</span></p>
                                            </div>
                                        )
                                    })}
							    </div>
						    </div>

                        {   /* Pagination */}
                        </div>

                        <SideBarComponent />
                    </div>
                </div>
            </div>
            <FooterComponent />
	    </React.Fragment>
    )
}

export default CategoryPage