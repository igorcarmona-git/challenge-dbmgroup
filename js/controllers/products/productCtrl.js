const BASEURL_API = `http://localhost:8080`;

app.controller("ProductCtrl", function ($scope, $http) {
  $scope.products = [];
  $scope.filteredProducts = [];
  $scope.filterName = "";
  $scope.categoryFilter = "";
  $scope.currentPage = 1;
  $scope.itemsPerPage = 4;

  $scope.formatPrice = function (price) {
    const priceNumber = parseFloat(price);

    if (isNaN(priceNumber)) {
      return "Preço inválido";
    }
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(priceNumber);
  };

  function loadProducts() {
    $http.get(`${BASEURL_API}/produtos`).then(function (response) {
      if (!response.data) return "Nenhum produto encontrado";
      $scope.products = response.data;
      $scope.categories = [...new Set($scope.products.map((p) => p.categoria))];

      $scope.filterProducts();
    });
  }

  $scope.filterProducts = function () {
    $scope.filteredProducts = $scope.products.filter((product) => {
      const matchesName = product.nome
        .toLowerCase()
        .includes($scope.filterName.toLowerCase());
      const matchesCategory =
        !$scope.categoryFilter || product.categoria === $scope.categoryFilter;
      return matchesName && matchesCategory;
    });

    $scope.totalPages = Math.ceil(
      $scope.filteredProducts.length / $scope.itemsPerPage
    );
    $scope.pagination();
  };

  $scope.pagination = function () {
    const start = ($scope.currentPage - 1) * $scope.itemsPerPage;
    const end = start + $scope.itemsPerPage;
    $scope.paginatedProducts = $scope.filteredProducts.slice(start, end);
  };

  $scope.changePage = function (direction) {
    if (direction === "next" && $scope.currentPage < $scope.totalPages) {
      $scope.currentPage++;
    } else if (direction === "prev" && $scope.currentPage > 1) {
      $scope.currentPage--;
    }
    $scope.pagination();
  };

  loadProducts();
});
