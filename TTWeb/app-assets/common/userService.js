(function () {
    "use strict";
    angular
    .module("common.services")
    .factory("usersResource", ["$resource", usersResource]);

    function usersResource($resource) {
        return $resource("/api/users");
    }
}());