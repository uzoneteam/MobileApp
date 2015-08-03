/**
 * Events view model
 */

var app = app || {};

app.Event = (function () {
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

            var foo = new kendo.data.DataSource({
                data: [{
                    name: "foo"
                }]
            });
            var bar = new kendo.data.DataSource({
                data: [{
                    name: "bar"
                }]
            });

            function rebindListView() {
                $("#listView").data("kendoMobileListView").setDataSource(bar);
            }

            //$("#activities-listview").kendoListView({
            //    dataSource: dataSource,
            //    template: kendo.template($("#eventsTemplate").html())
            //});
        };

        var displayName = function () {
            return app.Users.currentUser.get('data').DisplayName;
        }

        return {
            init: init,
            displayName: displayName
        };
    }());

    return eventViewModel;

}());