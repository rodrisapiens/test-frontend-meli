const services = require("./services.js");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
const PORT = 8080;
function fetchData(req, res, next) {
  if (req.query && req.query.q) {
    services
      .getItemsByQuery(req.query.q)
      .then((data) => {
        return data.json();
      })
      .then((datita) => {
        res.data = datita;
        next();
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  } else if (req.params && req.params.id) {
    services
      .getItemById(req.params.id)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        res.data = data;
        next();
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  }
}
function filterData(req, res, next) {
  if (req.query && req.query.q) {
    const mydata = res.data;
    let categoiesID = [];
    let categories = [];
    const items = mydata.results
      .map((values, index) => {
        if (index < 4) {
          categoiesID[index] = values.category_id;
          return {
            id: values.id,
            title: values.title,
            price: {
              currency: values.currency_id,
              amount: values.price,
              decimals: values.price % 1,
            },
            picture: values.thumbnail,
            condition: values.condition,
            free_shipping: values.shipping.free_shipping,
          };
        } else {
          return 0;
        }
      })
      .slice(0, 4);
    res.items = [...items];
    categoiesID.forEach((element, index) => {
      services
        .getItemCategoryById(element)
        .then((resp) => {
          return resp.json();
        })
        .then((category) => {
          categories[index] = category.name;
          if (
            categories[0] &&
            categories[1] &&
            categories[2] &&
            categories[3]
          ) {
            res.categories = categories;
            next();
          }
        });
    });
  } else if (req.params && req.params.id) {
    services
      .getItemDescriptionById(res.data.id)
      .then((resp) => {
        return resp.json();
      })
      .then((description) => {
        res.item = {
          id: res.data.id,
          title: res.data.title,
          price: {
            currency: res.data.currency_id,
            amount: res.data.price,
            decimals: res.data.price % 1,
          },
          picture: res.data.pictures[0].url,
          condition: res.data.condition,
          free_shipping: res.data.shipping.free_shipping,
          sold_quantity: res.data.sold_quantity,
          description: description.plain_text,
        };
        next();
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  }
}
function OrderAndSend(req, res) {
  if (req.query && req.query.q) {
    const sendingObject = {
      author: {
        name: "Rodrigo",
        lastname: "Niveyro Reguero",
      },
      categories: [...res.categories],
      items: [...res.items],
    };
    res.send(sendingObject);
  } else if (req.params && req.params.id) {
    const sendingObject = {
      author: {
        name: "Rodrigo",
        lastname: "Niveyro Reguero",
      },
      item: res.item,
    };
    res.send(sendingObject);
  }
}
app.get("/", fetchData, filterData, OrderAndSend);
app.get("/:id", fetchData, filterData, OrderAndSend);
app.listen(PORT, () => {
  console.log(`listening to port: ${PORT}!`);
});
