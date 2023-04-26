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
import { Buffer } from "buffer";
import PaginationComponent from "../../../components/PaginationComponent/PaginationComponent";
const CategoryPage = () => {
    const [products, setProducts] = useState([])
    const [data, setData] = useState([])
	const { id } = useParams()
    const [currentPage, setCurrentPage] = useState(1);
	
	useEffect(() => {

		const fetchData = async () => {
			try {
			  const { data } = await axios.get(`http://localhost:3000/api/local/category/${id}`);
			  setProducts(data.products)
              setData(data)
			} catch (error) {
			  console.log(error);
			}
		  };
          
		  fetchData();
	}, [id])
    const totalProducts = products.length
    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
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
                                                <Link to={`/product/${product._id}`} className="button four">
                                                <img src={`data:${product.thumbnail.contentType};base64,${Buffer.from(product.thumbnail.data).toString('base64')}`} alt={product.name}/>
                                                </Link>
                                                <h4>
                                                    <Link to={`/product/${product._id}`} id="no-deco" className="button four">
                                                        {product.name}
                                                    </Link>
                                                </h4>
                                                <p>Giá Bán: <span>{product.price.toLocaleString()}đ</span></p>
                                            </div>
                                        )
                                    })}
							    </div>
						    </div>

                            <PaginationComponent
                                totalItems={totalProducts}
                                itemsPerPage={10}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
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