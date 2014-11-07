(function (angular) {

    'use strict';

    var services = angular.module('app.services', []);

    /*
     * GitHub
     */
    services.value('GITHUB_API', 'https://api.github.com');

    services.service('github', ['$http', 'GITHUB_API', function ($http, GITHUB_API) {

        this.repos = function (username) {
            return $http.get(GITHUB_API + '/users/' + username + '/repos').then(function (response) {
                return response.data;
            });
        };
    }]);

    /*
     * Myself
     */
    services.provider('myself', function () {

        this.dataUrl = null;

        this.$get = ['$q', '$http', 'github', function ($q, $http, github) {
            var self = this;

            return function () {
                return $http.get(self.dataUrl).then(function (response) {
                    var my = response.data;

                    return github.repos(my.github.username)
                        .then(function (repos) {
                            my.github.repos = repos;
                            return my;
                        });
                });
            };
        }];
    });

})(window.angular);