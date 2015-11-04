bitbucketAPIApp.factory('movieStubFactory', function ($resource) {
    return $resource('http://moviestub.cloudno.de/movies');
});

bitbucketAPIApp.factory('movieStubBookingsFactory', function ($resource) {
    return $resource('http://moviestub.cloudno.de/bookings');
});