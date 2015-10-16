/**
 * AddActivity view model
 */

var app = app || {};

app.AddActivity = (function () {
    'use strict'

    var addActivityViewModel = (function () {

        var $newStatus;
        var validator;

        var init = function () {

            validator = $('#enterStatus').kendoValidator().data('kendoValidator');
            $newStatus = $('#newStatus');

            $newStatus.on('keydown', app.helper.autoSizeTextarea);
        };

        var show = function () {

            // Clear field on view show
            $newStatus.val('');
            validator.hideMessages();
            $newStatus.prop('rows', 1);
        };

        var displayName = function () {
            return app.Users.currentUser.get('data').DisplayName;
        };

        var avatarUri = function () {
            if (app.Users.currentUser.get('data').AvatarUri)
                return app.Users.currentUser.get('data').AvatarUri;
            else
                return "styles/images/avatar.png";
        };

        var saveActivity = function () {

            if (validator.validate()) {
                app.mobileApp.showLoading();
                var activities = app.Activities.activities;
                var activity = activities.add();

                activity.Text = $newStatus.val();
                activity.UserId = app.Users.currentUser.get('data').Id;

                activities.sync();
                app.mobileApp.hideLoading();
                app.mobileApp.navigate('views/activitiesView.html');
            }
        };

        return {
            init: init,
            show: show,
            displayName: displayName,
            avatarUri: avatarUri,
            me: app.Users.currentUser,
            saveActivity: saveActivity
        };

    }());

    return addActivityViewModel;

}());