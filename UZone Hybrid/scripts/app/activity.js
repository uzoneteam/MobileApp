/**
 * Activity view model
 */

var app = app || {};

app.Activity = (function () {
    'use strict'

    var $commentsContainer,
        listScroller;

    var activityViewModel = (function () {

        var activityUid,
            activity,
            $activityPicture;

        var init = function () {
            $commentsContainer = $('#comments-listview');
            $activityPicture = $('#picture');
        };

        var show = function (e) {

            $commentsContainer.empty();

            listScroller = e.view.scroller;
            listScroller.reset();

            activityUid = e.view.params.uid;
            activity = app.Activities.activities.getByUid(activityUid);
            $activityPicture[0].style.display = activity.Picture ? 'block' : 'none';

            app.Comments.comments.filter({
                field: 'ActivityId',
                operator: 'eq',
                value: activity.Id
            });

            kendo.bind(e.view.element, activity, kendo.mobile.ui);                       
        };

        var removeActivity = function () {

            var activities = app.Activities.activities;
            var activity = activities.getByUid(activityUid);

            app.showConfirm(
                appSettings.messages.removeActivityConfirm,
                'Delete Activity',
                function (confirmed) {
                    if (confirmed === true || confirmed === 1) {
                        app.mobileApp.showLoading();
                        activities.remove(activity);
                        activities.sync();
                        app.mobileApp.hideLoading();
                        app.mobileApp.navigate('views/activitiesView.html');
                    }
                }
            );
        };

        return {
            init: init,
            show: show,
            remove: removeActivity,
            activity: function () {
                return activity;
            }
        };

    }());

    return activityViewModel;

}());