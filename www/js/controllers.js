angular.module('yibook.controllers', [])

.factory('socket', function (socketFactory) {
	  return socketFactory({
	    url: 'http://localhost:8000/sock'
	  });
	})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, socket) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    socket.send('{"command":"login","username":"'+$scope.loginData.username+'","password":"'+$scope.loginData.password+'"}');
    socket.setHandler('error', function(e) {
		$ionicLoading.show({
		    template: '无法访问服务器,部分功能无法使用!'
		});
		$timeout(function() {
			$ionicLoading.hide();
		}, 2000);
	});
    socket.setHandler('message', function(e) {
    	var result = JSON.parse(e.data);
    	if (result.result == 'success') {
    		$scope.closeLogin();
    	}
    });
  };
  
})

.controller('MainCtrl', function($scope, $timeout, $ionicLoading, socket) {
	$ionicLoading.show({
	    template: '加载中...'
	});
	socket.setHandler('open', function(e) {
		socket.send('{"command":"getbooks"}');
	});
	socket.setHandler('close', function(e) {
		$ionicLoading.hide();
		$ionicLoading.show({
		    template: '无法访问网络,部分功能无法使用!'
		});
		$timeout(function() {
			$ionicLoading.hide();
		}, 2000);
	});
    socket.setHandler('message', function(e) {
    	$ionicLoading.hide();
    	var result = JSON.parse(e.data);
    	if (result.result == 'success') {
    		$scope.booklists = JSON.parse(result.message);
    	}
    	
    });
    $scope.searchKey = function() {
        alert('search ');
    };
    $scope.favorite = function(item) {
        alert('Editing ' + item.id);
    };
})

.controller('BookCtrl', function($scope, $stateParams, socket) {
	console.log('Doing BookCtrl');
	socket.send('{"command":"getbookbyid","bookid":'+$stateParams.bookId+'}');
	socket.setHandler('message', function(e) {
    	var result = JSON.parse(e.data);
    	if (result.result == 'success') {
    		$scope.book = JSON.parse(result.message);
    	}
	});
});
