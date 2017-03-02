/**
 * Created by BenYin on 3/1/17.
 */
(function () {
    angular
        .module("WbdvDirective", [])
        .directive("file", uploadDirective);

    function uploadDirective() {
        return {
            scope: {
                file: '='

            },
            link: function (scope, el, attrs) {
                el.bind('change', function (event) {
                    console.log("file!!!");
                    var files = event.target.files;
                    var file = files[0];
                    scope.file = file ? file.name : undefined;
                    scope.$apply();
                });
            }
        };
    }
})();