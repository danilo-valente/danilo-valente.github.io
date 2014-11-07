(function (angular) {

    'use strict';

    var filters = angular.module('app.filters', []);

    filters.filter('age', function () {
        return function (date) {
            return new Date(new Date() - date).getUTCFullYear() - 1970;
        };
    });

    filters.filter('level', function () {

        return function (level, max) {
            var i, arr = [];

            for (i = 0; i < Math.floor(level); i++) {
                arr.push(1);
            }
            if (level % 1 !== 0) {
                arr.push(0.5);
            }
            for (i = Math.ceil(level); i < max; i++) {
                arr.push(0);
            }

            return arr;
        };
    });

})(window.angular);