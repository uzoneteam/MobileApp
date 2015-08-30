/**
 * Events view model
 */

var app = app || {};

app.Events = (function () {
    'use strict';

    var eventViewModel = (function () {
		
       
        var isInMistSimulator = (location.host.indexOf('icenium.com') > -1);

        var isAnalytics = analytics.isAnalytics();

        var init = function () {

            if (!isAnalytics) {
                console.log('EQATEC product key is not set. You cannot use EQATEC Analytics service.');
            } else if (isAnalytics) {
                analytics.TrackFeature('Events');
            }                       
        };

        var displayName = function () {
            return app.Users.currentUser.get('data').DisplayName;
        }
        
        var show = function (e) {
            
            
            console.log(e.view.params.month);
            
            var events = new kendo.data.DataSource({
        transport: {
            read: {
                url: "http://localhost:52534/api/1/events/7?callback=?",
                dataType: "jsonp"
            }
        }
    });
            
        };
        
        
        
       /* var testing = function () {
            console.log('here');
            return month;
        }

        var monthSelection = function () {
            month = $newMonth.val();
            console.log('here');
        };*/

        return {
            init: init,
            displayName: displayName,
            show: show
            //testing: testing,
            //monthSelection: monthSelection
        };
    }());

    return eventViewModel;

}());