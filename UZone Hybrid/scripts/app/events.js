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

            $("#scheduleList").kendoMobileListView({
                pullToRefresh: true,
                dataSource: new kendo.data.DataSource({
                    transport: {
                        read: {
                            // change to be the inital endpoint by school
                            url: "http://localhost:52534/api/events/1?callback=?",
                            dataType: "jsonp"
                        }
                    }
                }),
                template: $("#eventsTemplate").html()
            });
        };

        var displayName = function () {
            return app.Users.currentUser.get('data').DisplayName;
        }

        var show = function (e) {

            if (e.view.params.month != undefined) {
                console.log('got params');

                $("#scheduleList").kendoMobileListView({
                    pullToRefresh: true,
                    dataSource: new kendo.data.DataSource({
                        transport: {
                            read: {
                                // change to get school id
                                url: "http://localhost:52534/api/1/events/" + e.view.params.month + "?callback=?",
                                dataType: "jsonp"
                            }
                        }
                    }),
                    template: $("#eventsTemplate").html()
                });

            }
        };

        return {
            init: init,
            displayName: displayName,
            show: show               
        };
    }());

    return eventViewModel;

}());