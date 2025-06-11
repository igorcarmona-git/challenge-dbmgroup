$scope.pagination = function () {
  const start = ($scope.currentPage - 1) * $scope.itemsPerPage;
  const end = start + $scope.itemsPerPage;
  return $scope.products.slice(start, end);
};
