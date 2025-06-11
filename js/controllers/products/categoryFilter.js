app.filter("categoryFilter", function () {
  return function (products, category) {
    if (!category) return products;
    return products.filter(function (product) {
      return product.categoria === category;
    });
  };
});
