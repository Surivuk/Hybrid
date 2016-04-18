var dashboard = function(state) {
    var self = this;
    var view_state = state;

    var position = {};
    var mapPTR = {};
    var htmlLoaded = false;
    var flagForMapLoad = false;

    this.show = function(jqueryElement) {

        //self.getDeviceLocation();
        //jqueryElement.empty();
        jqueryElement.load("html/dashboard.html", function() {

            var h = window.screen.height * window.devicePixelRatio;
            $("#map").height(h * 0.85);
            $("#save").click(function() {

                if (typeof(Storage) !== "undefined") {
                    // Code for localStorage/sessionStorage.
                    var key = "hard"; //$("#key").attr('value');
                    var value = "coded"; //$("#value").attr('value');
                    localStorage.setItem(key, value);

                } else {
                    alert("No storage support!");
                }
            });
            $("#show").click(function() {
                if (typeof(Storage) !== "undefined") {
                    // Code for localStorage/sessionStorage.
                    alert(localStorage.getItem("hard"));

                } else {
                    alert("No storage support!");
                }
            });
            htmlLoaded = true;
            if (flagForMapLoad) {
                self.mapLoad(position);
            }
            console.log("dashboard loaded.");
        });

    }
    this.mapLoad = function(pos) {

        if (htmlLoaded) {


            var center = {};
            if (typeof pos != 'undefined' && typeof pos.coords != 'undefined') {

                center = { lat: pos.coords.latitude, lng: pos.coords.longitude };

            } else {

                center = { lat: 0.0, lng: 0.0 };
            }

            if (navigator.connection.type === Connection.NONE || (window.google !== undefined && window.google.maps)) {

                //re init for map
                mapPTR = new google.maps.Map(document.getElementById("map"), {
                    zoom: 8,
                    center: center
                });

                return;
            }

            //TODO: Add your own Google maps API key to the URL below.
            $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDiTpGOYpsxSsT2ku_NHGooQilONWiOs8k', function(data, textStatus, jqxhr) {
                console.log(data); // Data returned
                console.log(textStatus); // Success
                console.log(jqxhr.status); // 200
                mapPTR = new google.maps.Map(document.getElementById("map"), {
                    zoom: 8,
                    center: center
                });
            });
        } else {
            flagForMapLoad = true;
            position = pos;
        }

    }

    this.mapUpdate = function(position) {

            if (typeof google == 'undefined') {
                console.log("Map tried to update,but google wasnt loaded.");
                return;
            }
            var myLatLng = { lat: position.coords.latitude, lng: position.coords.longitude };

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: mapPTR,
                title: 'Your position -- lat: ' + myLatLng.lat + "  lng: " + myLatLng.lng
            });
            console.log("Map updated.");
        }
        /*this.getDeviceLocation = function() {
    }
    navigator.geolocation.getCurrentPosition(function(position) { self.deviceLocated(position); },
        function(error) { self.deviceLocationError; });
}
this.deviceLocated = function(position) {
    self.position = position;
    console.log(position);
}
this.deviceLocationError = function(error) {
    console.log(error);
    alert(error.message);
}
*/

}
