const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
async function getItemsByQuery(query) {
  return fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
}
const getItemById = async (id) => {
  return fetch(`https://api.mercadolibre.com/items/${id}`);
};

const getItemDescriptionById = async (id) => {
  return fetch(`https://api.mercadolibre.com/items/${id}/description`);
};

const getItemCategoryById = async (id) => {
  return fetch(`https://api.mercadolibre.com/categories/${id}`);
};
module.exports = {
  getItemsByQuery,
  getItemById,
  getItemDescriptionById,
  getItemCategoryById,
};
