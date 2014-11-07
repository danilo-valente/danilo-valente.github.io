(function (angular, Showdown, hljs) {

    'use strict';

    var directives = angular.module('app.directives', []);

    directives.directive('dvFlair', function () {
        var template =
            '<a ng-href="http://stackexchange.com/users/{{ userId }}">' +
            '<img ng-src="http://stackexchange.com/users/flair/{{ userId }}.png?theme={{ theme || \'\' }}" width="208" height="58">' +
            '</a>';

        return {
            restrict: 'E',
            replace: true,
            template: template,
            scope: {
                userId: '=',
                theme: '@'
            }
        }
    });

    directives.directive('dvMarkdown', function () {
        var converter = new Showdown.converter({
            extensions: ['github']
        });

        return {
            restrict: 'EA',
            link: function (scope, element) {
                var html = angular.element(converter.makeHtml(element.text()));
                element.empty().append(html);

                angular.forEach(element[0].querySelectorAll('pre code'), function (block) {
                    hljs.highlightBlock(block);
                });
            }
        };
    });

})(window.angular, window.Showdown, window.hljs);