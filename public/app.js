angular.module('RedisGUI', [])
    .controller('MainCtrl', MainCtrl)
    .service('$RedisServices', ServiceModule);

function ServiceModule($http) {
    var service = this;

    // Create new key
    service.createKey = function(keyData) {
        return $http({
            url: '/api/keys',
            method: 'POST',
            dataType: "json",
            async: "true",
            data: JSON.stringify({
                keyId: keyData.keyId,
                keyValue: keyData.keyValue
            }),
            headers: {
                "Accept": "application/json"
            }
        });
    };

    // Delete key
    service.deleteKey = function(keyId) {
        return $http({
            url: '/api/keys/delete/' + keyId,
            method: 'GET',
            dataType: "json",
            async: "true",
            headers: {
                "Accept": "application/json"
            }
        });
    };

    // Get key
    service.getKey = function(keyId) {
        return $http({
            url: '/api/keys/get/' + keyId,
            method: 'GET',
            dataType: "json",
            async: "true",
            headers: {
                "Accept": "application/json"
            }
        });
    };

    // Load all keys
    service.loadKeys = function() {
        return $http({
            url: '/api/keys/list',
            method: 'GET',
            dataType: "json",
            async: "true",
            headers: {
                "Accept": "application/json"
            }
        });
    };
}

function MainCtrl($scope, $RedisServices) {
    $scope.currentKey = {};
    $scope.keys = [];
    $scope.loading = false;
    $scope.newKey = {};

    function init() {
        $scope.loadKeys();
    };

    // Create key
    $scope.createKey = function(keyData) {
        $scope.loading = true;
        var createKey = $RedisServices.createKey(keyData);
        createKey.then(function() {
            var loadKeys = $RedisServices.loadKeys();
            loadKeys.then(function(response) {
                $scope.keys = response.data;
                $scope.newKey = {};
                $scope.loading = false;
            });
        });
    };

    // Delete key
    $scope.deleteKey = function(keyId) {
        $scope.loading = true;
        var deleteKey = $RedisServices.deleteKey(keyId);
        deleteKey.then(function() {
            var loadKeys = $RedisServices.loadKeys();
            loadKeys.then(function(response) {
                $scope.keys = response.data;
                $scope.loading = false;
            });
        });
    };

    // Get key
    $scope.getKey = function(keyId) {
        $scope.loading = true;
        var getKey = $RedisServices.getKey(keyId);
        getKey.then(function(response) {
            console.log(response.data);
        });
    }

    // Load all keys
    $scope.loadKeys = function() {
        $scope.loading = true;
        var loadKeys = $RedisServices.loadKeys();
        loadKeys.then(function(response) {
            $scope.keys = response.data;
            $scope.loading = false;
        });
    };

    init();
}