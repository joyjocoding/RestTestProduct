var app = angular.module("myModule", ['ngResource']);

app.factory('Products', ['$resource', function($resource) {
    return $resource('http://localhost:8000/app_dev.php/product/posts/:id',
	{id:'@id'},
	{
		update: { method:'PUT' }
	}
	);
}]);

app.controller("myController", ['$scope','Products', function($scope,Products){

	$scope.doSubmit = function(){
        if($scope.myform.$pristine){}
    }
  
	//$scope.addProduct = {};
	$scope.clickedProducts = [];
    var queryParams = { method:'GET', isArray: true };
	
	$scope.products = Products.query(queryParams,{},function() {
		console.log($scope.products);
	  }); //query() returns all the products

	$scope.newProduct=new Products();
	$scope.saveProduct = function(){
		$scope.products.push($scope.newProduct);
		$scope.newProduct.$save(function(){ 				           
			$scope.newProduct = new Products();
        });		
			
	};		

	$scope.selectProduct =  function(product){
		$scope.selectedProduct = product;
	};

	$scope.updateProduct = function(selectedProduct){
		Products.update(selectedProduct);		
	};

	$scope.deleteProduct = function(){		
		$scope.products.splice($scope.products.indexOf($scope.selectedProduct), 1);
        console.log($scope.selectedProduct);		
		$scope.selectedProduct.$delete(function() {});		
	};

	$scope.orderProp = 'SKU';
	$scope.direction = false;

	$scope.sort = function(column) {
	  if ($scope.orderProp === column) {
		$scope.direction = !$scope.direction;
	  } else {
		$scope.orderProp = column;
		$scope.direction = false;
	  }
	}

}]);