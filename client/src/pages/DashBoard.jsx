import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "../QueryContext";
import SearchBox from "../components/searchBox/SearchBox.jsx";
import ItemBox from "../components/itemBox/ItemBox.jsx";
import Categories from "../components/Categories";
import "../styles/dashBoard.css";
function DashBoard() {
  const navigate = useNavigate();
  const { query, setQuery } = useQuery();
  const [data, setData] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const serchParamsQuery = searchParams.get("search");
    if (query !== "") {
      setSearchParams({ search: query });
    }
    fetch(`http://localhost:8080/?q=${query ? query : serchParamsQuery}`)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [query]);
  function handleClick(id) {
    navigate(`/items/${id}`, {
      replace: true,
      state: { categories: data.categories },
    });
  }
  return (
    <div className="dashBoardPage">
      <SearchBox />
      <Categories categories={data?.categories} />
      <div className="dashBoardConteiner">
        <div className="dashBoard">
          {data?.items.map((element) => {
            return (
              <button
                key={element.id}
                className="itemBoxBtn"
                onClick={() => {
                  handleClick(element.id);
                }}
              >
                <ItemBox
                  picture={element.picture}
                  price={element.price.amount}
                  decimals={element.price.decimals}
                  title={element.title}
                  free_shipping={element.free_shipping}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
