import React, { useState, useEffect, useMemo } from 'react';
import { Button } from 'react-bootstrap';
const ProductCartComponent = ({ product }) => {
    const imageUrl = useMemo(() => {
        if (!product.items.image) return '';
    
        const blob = new Blob([atob(product.items.image)], { type: 'image/png' });
        return URL.createObjectURL(blob);
      }, [product]);
    
      useEffect(() => {
        return () => URL.revokeObjectURL(imageUrl);
      }, [imageUrl]);
    
      return (
        <div className="cart-item row" key={product._id}>
            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                <img src={imageUrl} alt={product.items.name} />
                <h4>{product.items.name}</h4>
            </div>

            <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                <Button id="del-btn">Xóa</Button>

            </div>
            <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                <b>{Number.isInteger(product.items.price) && product.items.price.toLocaleString()} đ</b>
            </div>
        </div>
      );
}

export default ProductCartComponent;
