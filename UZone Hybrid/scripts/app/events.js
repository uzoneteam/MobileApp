/**
 * Events view model
 */

var app = app || {};

app.Events = (function () {
    'use strict';

    var eventViewModel = (function () {
        var isInMistSimulator = (location.host.indexOf('icenium.com') > -1);

        var isAnalytics = analytics.isAnalytics();

        var currentSchool;

        var init = function () {

            if (!isAnalytics) {
                console.log('EQATEC product key is not set. You cannot use EQATEC Analytics service.');
            } else if (isAnalytics) {
                analytics.TrackFeature('Events');
            }

            if (app.Users.currentUser.get('data')) {
                currentSchool = app.Users.currentUser.get('data').School;
            } else {
                currentSchool = 0;
            }

            $("#scheduleList").kendoMobileListView({
                pullToRefresh: true,
                dataSource: new kendo.data.DataSource({
                    transport: {
                        read: {
                            url: "http://uzonewebapi.azurewebsites.net/api/events/" + currentSchool + "?callback=?",
                            dataType: "jsonp"
                        }
                    },
                    group: {
                        field: 'EventStartFormatted'
                    }
                }),
                template: $("#eventsTemplate").html(),
                headerTemplate: "<span class='header-font'>${value}</span><br/>"
            });
console.log( $("#scheduleList").data("kendoMobileListView").dataSource.total());
            if ($("#scheduleList").data() === null) {
                $("#scheduleList").append("<h1>No events available for this month</h1>");
            }

            function formatEventDate(eventdate) {
                console.log(eventdate);
                return moment().format('dddd');
            }
        };

        var displayName = function () {
            return app.Users.currentUser.get('data').DisplayName;
        }

        var show = function (e) {

            if (e.view.params.month != undefined) {

                $("#scheduleList").kendoMobileListView({
                    pullToRefresh: true,
                    dataSource: new kendo.data.DataSource({
                        transport: {
                            read: {
                                url: "http://uzonewebapi.azurewebsites.net/api/" + currentSchool + "/events/" + e.view.params.month + "?callback=?",
                                dataType: "jsonp"
                            }
                        },
                        group: {
                            field: 'EventStartFormatted'
                        },
                        dataBound: function() {
                            if (this.dataSource.total() == 0) {
                                
                                $("#scheduleList").html('<li>Nothing Found.</li>');
                            }
                        }
                    }),
                    template: $("#eventsTemplate").html()
                });
                //console.log( $("#scheduleList").empty());
                //console.log( $("#scheduleList").data("kendoMobileListView").dataSource('data'));
                //if ($("#scheduleList").data() === null) {
                    //$('#scheduleList').empty();
                    //$("#scheduleList").append("<h1>No events available for this month</h1>");
               // }

            }
        };

        var saveActivity = function () {
            console.log('here');
            app.mobileApp.navigate('views/activitiesView.html');
            // Validating of the required fields
            //if (validator.validate()) {

            // Adding new activity to Activities model
            /* var activities = app.Activities.activities;
             var activity = activities.add();
             
             activity.Text = 'test';
             activity.UserId = app.Users.currentUser.get('data').Id;
             
             activities.one('sync', function () {
                 app.mobileApp.navigate('views/activitiesView.html');
             });
             
             activities.sync();*/
            //}
        };

        var avatarUri = function () {
            if (app.Users.currentUser.get('data').AvatarUri)
                return app.Users.currentUser.get('data').AvatarUri;
            else
                return "styles/images/avatar.png";
        }

        var signOut = function () {
            app.mobileApp.showLoading();
            app.helper.logout();
            app.mobileApp.hideLoading();
            app.mobileApp.navigate('index.html');
        }

        return {
            init: init,
            displayName: displayName,
            show: show,
            saveActivity: saveActivity,
            avatarUri: avatarUri,
            signOut: signOut
        };
    }());

    return eventViewModel;

}());