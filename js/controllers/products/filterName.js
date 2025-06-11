app.filter("filterName", function () {
  return function (products, name) {
    if (!name) return products;
    return products.filter(function (product) {
      return product.nome.toLowerCase().includes(name.toLowerCase());
    });
  };
});
