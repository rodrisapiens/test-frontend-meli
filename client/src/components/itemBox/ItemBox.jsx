import React from "react";
import freeShipping from "../../../images/ic_shipping.png";
import "./itemBox.css";
function ItemBox({ picture, price, decimals, title, free_shipping }) {
  return (
    <div className="itemBox">
      <img src={picture} alt="item picture" className="itemPicture" />
      <div className="productInfo">
        <div className="priceAndShipping">
          <h1 className="price">
            $ {Intl.NumberFormat().format(Math.floor(price)).replace(/,/g, ".")}
          </h1>
          {free_shipping && <img src={freeShipping} alt="free shipping" />}
        </div>
        <h3 className="itemBoxTitle">{title}</h3>
      </div>
    </div>
  );
}

export default ItemBox;
