import React, { useState, useEffect } from "react";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import NavbarComponent from "../../../components/NavbarComponent/NavbarComponent";
import SliderComponent from "../../../components/SliderComponent/SliderComponent";
import SideBarComponent from "../../../components/SideBarComponent/SideBarComponent";
import FooterComponent from "../../../components/FooterComponent/FooterComponent";
import '../../../public/local/css/search.css'
import '../../../public/local/css/bootstrap.css'
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const SearchPage = () => {
    const[data, setData] = useState({})
    const localtion = useLocation()
    const keyword = new URLSearchParams(localtion.search).get('keyword')

    useEffect(() =>{
        axios.get(`http://localhost:3000/api/local/search?keyword=${keyword}`)
        .then(response => setData(response.data))
        .catch(error => console.log(error))
    }, [])
    const dataPrd = data.dataPrd


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
                                <div id="search-result">
                                    Kết quả tìm kiếm với sản phẩm:
                                    <span>  {keyword} ({data && data.length})</span>
                                </div>
                                <div className="product-list card-deck">
                                   {data.length !== 0 ? dataPrd && dataPrd.map(product => {
                                    return (
                                        <div className="product-item card text-center" key={product._id}>
                                            <Link to={`/product/${product._id}`}>
                                                <img src="" alt="UET"
                                            /></Link>
                                            <h4>
                                                <Link to={`/product/${product._id}`}>{product.name}</Link>
                                            </h4>
                                            <p>Giá Bán: <span>{product.price}</span></p>
                                        </div>
                                    )
                                   })
                                   :
                                   <div className="text-center not-found">
									    <p>Không tìm thấy sản phẩm này !!</p>
								    </div>
                                   }
                                </div>
                            </div>
                            {/* Pagination */}
                        </div>

                        <SideBarComponent />
                    </div>
                </div>
            </div>
            <FooterComponent />
	    </React.Fragment>
    )
}

export default SearchPage