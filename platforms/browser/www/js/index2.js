var app = (function(global) {
    "use strict";
    var test = {};
    var _dashboard = {};
    var _home = {};
    var state = 0;
    var geolocation = {};

    var firstTime = true;
    var watchID;

    function eventBind() {

        $("#loginLink").click(function() {
            var menu = $('#menu-button');
            var mainmenu = $(menu).next('ul');
            if (mainmenu.hasClass('open')) {
                mainmenu.hide().removeClass('open');
            }
            $("#content").empty();
            $("#content").load("html/login.html", function() {
                console.log("Login page loaded.");
            });
            state = 1;
        });
        $("#dashBoardLink").click(function() {
            var menu = $('#menu-button');
            var mainmenu = $(menu).next('ul');
            if (mainmenu.hasClass('open')) {
                mainmenu.hide().removeClass('open');
            }
            _dashboard.show($("#content"));

            state = 2;
        });
        $("#homeLink").click(function() {
            var menu = $('#menu-button');
            var mainmenu = $(menu).next('ul');
            if (mainmenu.hasClass('open')) {
                mainmenu.hide().removeClass('open');
            }
            $("#content").empty();
            $("#content").load("html/homepage.html", function() {
                console.log("Home page loaded.");

            });

            state = 3;
        });

        $("#sqlTest").click(function() {
            var menu = $('#menu-button');
            var mainmenu = $(menu).next('ul');
            if (mainmenu.hasClass('open')) {
                mainmenu.hide().removeClass('open');
            }
            $("#content").empty();
            $("#content").load("html/dashboard.html", function() {
                //testing($("#dashboardView"))
            });


            state = 4;
            //alert('sqlTest clicked.');
        });
        $('#forma').submit(function() {
            var postTo = 'https://emergencyshouter.herokuapp.com/';
            $.ajax({
                type: 'POST',
                data: 'test',
                url: 'https://emergencyshouter.herokuapp.com/',
                success: function(data) {
                    console.log(data);
                    alert('Server sent: ' + data);
                },
                error: function(data) {
                    console.log(data);
                    alert('There was an error adding your comment');
                }
            });
            return false;
        });
        $("#sndMsg").click(function() {

            var number = '+381637446277';
            var message = 'Test from the Cordova app';
            console.log("number=" + number + ", message= " + message);

            //CONFIGURATION
            var options = {
                replaceLineBreaks: false, // true to replace \n by a new line, false by default
                android: {
                    intent: 'INTENT' // send SMS with the native android SMS messaging
                        //intent: '' // send SMS without open any other app
                }
            };

            var success = function() { alert('Message sent successfully'); };
            var error = function(e) { alert('Message Failed:' + e); };
            sms.send(number, message, options, success, error);
        });
    }

    function refreshLocation() {

    }

    function onDeviceReady() {
        console.log("On device ready triggered.");
        var options = { timeout: 30000, enableHighAccuracy: true };
        watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

        document.addEventListener("online", onOnline, false);
        document.addEventListener("resume", onResume, false);

        //ApplicationModule.init('content');
        _dashboard = new dashboard(0);

        eventBind();


        //refreshLocation();
        //loadMapsApi();


    }

    function onSuccess(position) {
        geolocation = position;
        console.log(geolocation);
        if (firstTime) {
            firstTime = false;
            loadMapsApi();
        } else {
            _dashboard.mapUpdate(position);
        }

    }

    // onError Callback receives a [PositionError](PositionError/positionError.html) object
    //
    function onError(error) {
        console.log(error);
        alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
        loadMapsApi();
    }

    function onOnline() {
        console.log("Device is online.");
        loadMapsApi();
    }

    function onResume() {
        console.log("Device is resumed.");
        loadMapsApi();
    }

    function loadMapsApi() {


        _dashboard.mapLoad(geolocation);



        /*if (navigator.connection.type === Connection.NONE || (global.google !== undefined && global.google.maps)) {
            return;
        }

        //TODO: Add your own Google maps API key to the URL below.
        $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDiTpGOYpsxSsT2ku_NHGooQilONWiOs8k&callback=onMapsApiLoaded');*/
    }

    global.onMapsApiLoaded = function() {
        // Maps API loaded and ready to be used.
        /*test.map = new google.maps.Map(document.getElementById("map"), {
            zoom: 8,
            center: new google.maps.LatLng(-34.397, 150.644)
        });*/
        console.log("onMapAPiLoaded triggered.");

    };




    document.addEventListener("deviceready", onDeviceReady, false);

    // return test;

})(window);
