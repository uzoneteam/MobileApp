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
            
            console.log(e.view.params);
        };

        var displayName = function () {
            return app.Users.currentUser.get('data').DisplayName;
        }
        
        
        
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
            displayName: displayName
            //testing: testing,
            //monthSelection: monthSelection
        };
    }());

    return eventViewModel;

}());