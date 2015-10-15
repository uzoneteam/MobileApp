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
        var avatarFilename = Math.random().toString(36).substring(2, 15) + ".jpg";

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
                if (app.Users.currentUser.get('data')) {
                    console.log(dataSource);
                    Everlive.$.Users.updateSingle(
                            dataSource)
                        .then(function () {
                                app.showAlert("User updated successful");
                                app.mobileApp.navigate('views/welcome.html');
                            },
                            function (err) {
                                app.showError(err.message);
                            });
                } else {
                    dataSource.AvatarUri = userAvatarUri;
                    Everlive.$.Users.register(
                            dataSource.Username,
                            dataSource.Password,
                            dataSource)
                        .then(function () {
                                app.showAlert("Registration successful");
                                app.mobileApp.navigate('index.html');
                            },
                            function (err) {
                                app.showError(err.message);
                            });
                }

            }
        };

        var addAvatar = function () {
            var success = function (data) {
                Everlive.$.Files.create({
                    Filename: avatarFilename,
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
            if (app.Users.currentUser.get('data')) {
                console.log(app.Users.currentUser.get('data'));
                dataSource = kendo.observable({
                    Username: app.Users.currentUser.get('data').Username,
                    Password: '',
                    DisplayName: app.Users.currentUser.get('data').DisplayName,
                    Email: app.Users.currentUser.get('data').Email,
                    School: app.Users.currentUser.get('data').School,
                    Major: app.Users.currentUser.get('data').Major,
                    BirthDate: app.Users.currentUser.get('data').BirthDate,
                    Frat_Soro: app.Users.currentUser.get('data').Frat_Soro,
                    Graduation_Year: app.Users.currentUser.get('data').Graduation_Year,
                    AvatarUri: app.Users.currentUser.get('data').AvatarUri,
                    Id: app.Users.currentUser.get('data').Id
                });

                var loadImage = [];
                loadImage.push(app.Users.currentUser.get('data').AvatarUri);
                $("#avatarImage").kendoMobileListView({
                    dataSource: loadImage,
                    template: "<img src='#: data #'>"
                });
            } else {
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
            }
            kendo.bind($('#signup-form'), dataSource, kendo.mobile.ui);
        };

        function loadPhotos() {
            var query = new Everlive.Query();
            var now = new Date();
            var queryTime = now.getMinutes() - 1;
            now.setMinutes(queryTime);
            query.where().gt('CreatedAt', now);
            Everlive.$.Files.get(query).then(function (data) {
                var files = [];
                console.log(data.result);
                userAvatarUri = data.result[data.count - 1].Uri;
                files.push(data.result[data.count - 1].Uri);
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