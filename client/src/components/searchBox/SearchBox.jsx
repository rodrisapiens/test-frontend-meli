import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "../../QueryContext";
import searchIcon from "../../../images/ic_Search.png";
import meliIcon from "../../../images/Logo_ML_Big.png";
import "./searchBox.css";
function SearchBox(id) {
  const { query, setQuery } = useQuery();
  let navigate = useNavigate();
  useEffect(() => {
    const searchInput = document.querySelector(".searchInput");
    const button = document.querySelector(".searchBtn");
    searchInput.focus();
    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        button.click();
      }
    });
  }, []);
  async function handleSearch() {
    const inputValue = document.querySelector(".searchInput").value;
    if (inputValue !== "") {
      setQuery(inputValue);
      if (!location.href.includes("/items")) {
        navigate("/items", { replace: true });
      } else if (id.id) {
        navigate("/items", { replace: true });
      }
    }
  }

  return (
    <div className="SearchBox">
      <img
        src={meliIcon}
        alt="Meli Icon"
        className="meliIcon"
        onClick={() => {
          navigate("/", { replace: true });
        }}
      />
      <div className="inputAndButton">
        <input
          className="searchInput"
          placeholder="Nunca dejes de buscar"
          defaultValue={query}
        />
        <button onClick={handleSearch} className="searchBtn">
          <img src={searchIcon} atl="search icon" />
        </button>
      </div>
    </div>
  );
}

export default SearchBox;
