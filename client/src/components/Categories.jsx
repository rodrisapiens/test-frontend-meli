import React from "react";

function Categories({ categories }) {
  return (
    <div className="categoriesConteiner">
      {categories &&
        categories
          .filter((element, index) => {
            return categories.indexOf(element) === index;
          })
          .map((element, index) => {
            return (
              <p className="categorie" key={index}>
                {element}
              </p>
            );
          })}
    </div>
  );
}

export default Categories;
