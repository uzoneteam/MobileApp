/**
 * Activities view model
 */

var app = app || {};

app.Activities = (function () {
    'use strict'

    // Activities model
    var activitiesModel = (function () {

        var activityModel = {

            id: 'Id',
            fields: {
                Text: {
                    field: 'Text',
                    defaultValue: ''
                },
                CreatedAt: {
                    field: 'CreatedAt',
                    defaultValue: new Date()
                },
                Picture: {
                    fields: 'Picture',
                    defaultValue: null
                },
                UserId: {
                    field: 'UserId',
                    defaultValue: null
                },
                Likes: {
                    field: 'Likes',
                    defaultValue: []
                },
                MediaUri: {
                    field: 'MediaUri',
                    defaultValue: null
                }
            },
            CreatedAtFormatted: function () {

                return app.helper.formatDate(this.get('CreatedAt'));
            },
            PictureUrl: function () {

                return app.helper.resolvePictureUrl(this.get('Picture'));
            },
            User: function () {

                var userId = this.get('UserId');

                var user = $.grep(app.Users.users(), function (e) {
                    return e.Id === userId;
                })[0];

                return user ? {
                    DisplayName: user.DisplayName,
                    PictureUrl: user.AvatarUri
                } : {
                    DisplayName: 'Anonymous',
                    PictureUrl: app.helper.resolveProfilePictureUrl()
                };
            },
            isVisible: function () {
                var currentUserId = app.Users.currentUser.data.Id;
                var userId = this.get('UserId');

                return currentUserId === userId;
            }
        };

        var activitiesDataSource = new kendo.data.DataSource({
            type: 'everlive',
            schema: {
                model: activityModel
            },
            transport: {
                typeName: 'Activities'
            },
            change: function (e) {

                if (e.items && e.items.length > 0) {
                    $('#no-activities-span').hide();
                } else {
                    $('#no-activities-span').show();
                }
            },
            sort: {
                field: 'CreatedAt',
                dir: 'desc'
            }
        });

        return {
            activities: activitiesDataSource
        };

    }());

    var displayName = function () {
        return app.Users.currentUser.get('data').DisplayName;
    }

    var avatarUri = function () {
        if (app.Users.currentUser.get('data').AvatarUri)
            return app.Users.currentUser.get('data').AvatarUri;
        else
            return "styles/images/avatar.png";
    }

    var activitiesViewModel = (function () {
        var activitySelected = function (e) {
            app.mobileApp.navigate('views/activityView.html?uid=' + e.data.uid);
        };

        var navigateHome = function () {
            app.mobileApp.navigate('#welcome');
        };

        // Logout user
        /*var logout = function () {

            app.helper.logout()
            .then(navigateHome, function (err) {
                app.showError(err.message);
                navigateHome();
            });
        };*/

        return {
            activities: activitiesModel.activities,
            activitySelected: activitySelected,
            displayName: displayName,
            avatarUri: avatarUri
        };

    }());

    return activitiesViewModel;

}());