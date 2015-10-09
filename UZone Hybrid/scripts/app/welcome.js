/**
 * Welcome view model
 */

var app = app || {};

app.Welcome = (function () {
    'use strict';

    var welcomeViewModel = (function () {

        var isInMistSimulator = (location.host.indexOf('icenium.com') > -1);

        var isAnalytics = analytics.isAnalytics();

        var init = function () {

            if (!isAnalytics) {
                console.log('EQATEC product key is not set. You cannot use EQATEC Analytics service.');
            } else if (isAnalytics) {
                analytics.TrackFeature('Module');
            }
        };

        var scheduler = function () {
            app.mobileApp.showLoading();
            if (isAnalytics) {
                analytics.TrackFeature('Module.Scheduler');
            }
            app.mobileApp.hideLoading();
            app.mobileApp.navigate('views/moduleScheduler.html');
        };

        var profile = function () {
            app.mobileApp.showLoading();
            if (isAnalytics) {
                analytics.TrackFeature('Profile');
            }
            app.mobileApp.hideLoading();
            app.mobileApp.navigate('views/signupView.html');
        };

        var chat = function () {
            app.mobileApp.showLoading();
            if (isAnalytics) {
                analytics.TrackFeature('Chat');
            }
            app.mobileApp.hideLoading();
            app.mobileApp.navigate('views/activitiesView.html');
        };

        var favorites = function () {
            app.mobileApp.showLoading();
            if (isAnalytics) {
                analytics.TrackFeature('Favorites');
            }
            app.mobileApp.hideLoading();
            app.mobileApp.navigate('views/moduleView.html');
        };

        var settings = function () {
            app.mobileApp.showLoading();
            if (isAnalytics) {
                analytics.TrackFeature('Setting');
            }
            app.mobileApp.hideLoading();
            app.mobileApp.navigate('views/moduleView.html');
        };

        var displayName = function () {
            return app.Users.currentUser.get('data').DisplayName;
        }

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
            scheduler: scheduler,
            profile: profile,
            chat: chat,
            favorites: favorites,
            settings: settings,
            displayName: displayName,
            avatarUri: avatarUri,
            signOut: signOut
        };
    }());

    return welcomeViewModel;

}());