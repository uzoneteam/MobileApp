/**
 * Module view model
 */

var app = app || {};

app.Module = (function () {
    'use strict';

    var moduleViewModel = (function () {

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
            app.mobileApp.navigate('views/activityView.html');            
        };

        var profile = function () {
            app.mobileApp.showLoading();
            if (isAnalytics) {
                analytics.TrackFeature('Profile');
            }
            app.mobileApp.hideLoading();
            app.mobileApp.navigate('views/moduleView.html');
        };
        
        var chat = function () {
            app.mobileApp.showLoading();
            if (isAnalytics) {
                analytics.TrackFeature('Chat');
            }
            app.mobileApp.hideLoading();
            app.mobileApp.navigate('views/moduleView.html');
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

        return {
            init: init,
            scheduler: scheduler,
            profile: profile,
            chat: chat,
            favorites: favorites,
            settings: settings,
            displayName: displayName
        };
    }());

    return moduleViewModel;

}());