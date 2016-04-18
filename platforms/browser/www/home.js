var app = (function(global) {
    "use strict";
    var test = {};

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
        });
        $("#dashBoardLink").click(function() {
            var menu = $('#menu-button');
            var mainmenu = $(menu).next('ul');
            if (mainmenu.hasClass('open')) {
                mainmenu.hide().removeClass('open');
            }

            //$("#content").empty();
            $("#content").load("html/dashboard.html", function() {

            });
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

    function onDeviceReady() {
        document.addEventListener("online", onOnline, false);
        document.addEventListener("resume", onResume, false);

        //ApplicationModule.init('content');
        eventBind();
        loadMapsApi();
    }

    function onOnline() {
        loadMapsApi();
    }

    function onResume() {
        loadMapsApi();
    }

    function loadMapsApi() {
        if (navigator.connection.type === Connection.NONE || (global.google !== undefined && global.google.maps)) {
            return;
        }

        //TODO: Add your own Google maps API key to the URL below.
        $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDiTpGOYpsxSsT2ku_NHGooQilONWiOs8k&callback=onMapsApiLoaded');
    }

    global.onMapsApiLoaded = function() {
        // Maps API loaded and ready to be used.
        test.map = new google.maps.Map(document.getElementById("map"), {
            zoom: 8,
            center: new google.maps.LatLng(-34.397, 150.644)
        });
        console.log(test);
    };

    document.addEventListener("deviceready", onDeviceReady, false);

    // return test;

})(window);
