(function (angular) {

    'use strict';

    var app = angular.module('app', [
        'ui.gravatar',
        'app.services',
        'app.filters',
        'app.directives'
    ]);

    app.controller('mainController', ['$scope', '$document', 'myself', function ($scope, $document, myself) {

        $scope.contentFolder = 'content';

        $scope.fetching = true;

        myself()
            .then(function (my) {
                $scope.my = my;
                $document.prop('title', my.name);
            })
            .finally(function () {
                $scope.fetching = false;
            });
    }]);

    /*
     * Config
     */
    app.config(['myselfProvider', function (myselfProvider) {
        myselfProvider.dataUrl = 'content/myself.json';
    }]);

})(window.angular);