app.controller("ProductCtrl", function ($scope, $http) {
  const BASEURL = "http://localhost:3000";
  $scope.products = [];
  $scope.filterName = "";
  $scope.categoryFilter = "";
  $scope.currentPage = 1;
  $scope.itemsPerPage = 4;

  $http.get(`${BASEURL}/produtos`).then(function (response) {
    $scope.products = response.data;
    $scope.categories = [...new Set($scope.products.map((p) => p.categoria))];
    $scope.totalPages = Math.ceil($scope.products.length / $scope.itemsPerPage);
    $scope.pagination();
  });

  $scope.pagination = function () {
    const start = ($scope.currentPage - 1) * $scope.itemsPerPage;
    const end = start + $scope.itemsPerPage;
    $scope.paginatedProducts = $scope.products.slice(start, end);
  };

  $scope.changePage = function (direction) {
    if (direction === "next" && $scope.currentPage < $scope.totalPages) {
      $scope.currentPage++;
    } else if (direction === "prev" && $scope.currentPage > 1) {
      $scope.currentPage--;
    }
    $scope.pagination();
  };
});
