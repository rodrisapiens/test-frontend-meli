import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchBox from "../components/searchBox/SearchBox";
import Categories from "../components/Categories";
import "../styles/item.css";
import { useQuery } from "../QueryContext";
function Item() {
  let { id } = useParams();
  let { query, setQuery } = useQuery;
  const [data, setData] = useState();
  useEffect(() => {
    fetch(`http://localhost:8080/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setData(res);
      });
  }, []);
  function dataSlice(num) {
    const number = num * 100;
    console.log(number, "number");
    if (number <= 0) {
      return "00";
    }
    if (number > 0 && number < 10) {
      return `0${Math.floor(number)}`;
    }
    if (number >= 10) {
      return `${Math.floor(number)}`;
    }
  }
  return (
    <div className="itemPage">
      <SearchBox defaultValue={query} id={id} />
      <Categories categories={[]} />
      <div className="itemConteiner">
        <div className="itemBlank">
          <div className="left">
            <div className="topLeft">
              <img
                src={data?.item.picture}
                alt="bigProductImage"
                className="bigProductImage"
              />
            </div>
            <div className="bottomLeft">
              <h2 className="descriptionTitle">Descripción del producto</h2>
              <p className="description">{data?.item.description}</p>
            </div>
          </div>
          <div className="rigth">
            <p>
              {data?.item.condition === "new" ? "Nuevo" : "Usado"}-
              {data?.item.sold_quantity} Vendidos
            </p>
            <h1 className="productTitle">{data?.item.title}</h1>
            <div className="priceAndDecimals">
              <h1 className="bigProductPrice">
                ${" "}
                {Intl.NumberFormat()
                  .format(Math.floor(data?.item.price.amount))
                  .replace(/,/g, ".")}
              </h1>
              <p className="decimals">{dataSlice(data?.item.price.decimals)}</p>
            </div>
            <button
              className="buyBtn"
              onClick={() => {
                alert("gracias por comprar!! :)");
              }}
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
