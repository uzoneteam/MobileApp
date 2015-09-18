/**
 * Signup view model
 */
var app = app || {};

app.Signup = (function () {
    'use strict';

    var singupViewModel = (function () {

        var dataSource;
        var schoolDataSource;
        var $signUpForm;
        var $formFields;
        var $signupBtnWrp;
        var validator;
        var userAvatarUri;

        var signup = function () {
            var errorCount = 0;

            validator = $('#signupFields').kendoValidator({
                validateOnBlur: false
            }).data('kendoValidator');

            $('#signupFields input,select').each(function () {
                console.log(validator.validateInput($(this)));
                if (validator.validateInput($(this)) === false) {
                    errorCount = errorCount + 1;
                    $(this).siblings('.km-icon').addClass('invalid');
                    return false;
                }
            })

            if (errorCount === 0) {
                dataSource.AvatarUri = userAvatarUri;
                Everlive.$.Users.register(
                        dataSource.Username,
                        dataSource.Password,
                        dataSource)
                    .then(function () {
                            app.showAlert("Registration successful");
                            app.mobileApp.navigate('views/moduleView.html');
                        },
                        function (err) {
                            app.showError(err.message);
                        });
            }
        };

        var addAvatar = function () {
            var success = function (data) {
                Everlive.$.Files.create({
                    Filename: Math.random().toString(36).substring(2, 15) + ".jpg",
                    ContentType: "image/jpeg",
                    base64: data
                }).then(loadPhotos);
            };
            var error = function () {
                navigator.notification.alert("Unfortunately we could not add the image");
            };
            var config = {
                destinationType: Camera.DestinationType.DATA_URL,
                targetHeight: 400,
                targetWidth: 400
            };
            navigator.camera.getPicture(success, error, config);
        }
        
        var init = function () {

        };

        var show = function () {

            dataSource = kendo.observable({
                Username: '',
                Password: '',
                DisplayName: '',
                Email: '',
                School: '0',
                Major: '',
                BirthDate: '',
                Frat_Soro: '',
                Graduation_Year: '',
                AvatarUri: userAvatarUri
            });
            kendo.bind($('#signup-form'), dataSource, kendo.mobile.ui);
        };

        function loadPhotos() {
            Everlive.$.Files.get().then(function (data) {
                var files = [];
                files.push(data.result[data.count - 1].Uri)
                userAvatarUri = data.result[data.count - 1].Uri;
                console.log(userAvatarUri);
                $("#avatarImage").kendoMobileListView({
                    dataSource: files,
                    template: "<img src='#: data #'>"
                });
            });
        }

        return {
            init: init,
            show: show,
            signup: signup,
            addAvatar: addAvatar
        };

    }());

    return singupViewModel;

}());