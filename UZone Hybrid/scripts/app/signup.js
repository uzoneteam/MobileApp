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
        //var $signupInfo;
        var $signupBtnWrp;
        var validator;
        var userAvatarUri;

        // Register user after required fields (username and password) are validated in Backend Services
        var signup = function () {

            //dataSource.Gender = parseInt(dataSource.Gender);
            //var birthDate = new Date(dataSource.BirthDate);

            //if (birthDate.toJSON() === null) {
            //    birthDate = new Date();
            //}

            //dataSource.BirthDate = birthDate;
            console.log(dataSource);
            dataSource.AvatarUri = userAvatarUri;
            console.log(dataSource);
            Everlive.$.Users.register(
                    dataSource.Username,
                    dataSource.Password,
                    dataSource)
                .then(function () {
                        app.showAlert("Registration successful");
                        app.mobileApp.navigate('#welcome');
                    },
                    function (err) {
                        app.showError(err.message);
                    });
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

        // Executed after Signup view initialization
        // init form validator
        var init = function () {

            $signUpForm = $('#signUp');
            $formFields = $signUpForm.find('input, textarea, select');
            //$signupInfo = $('#signupInfo');
            $signupBtnWrp = $('#signupBtnWrp');
            validator = $signUpForm.kendoValidator({
                validateOnBlur: false
            }).data('kendoValidator');

            $formFields.on('keyup keypress blur change input', function () {
                if (validator.validate()) {
                    $signupBtnWrp.removeClass('disabled');
                } else {
                    $signupBtnWrp.addClass('disabled');
                }
            });
        };

        // Executed after show of the Signup view
        var show = function () {
            //$signupInfo.prop('rows', 1);

            dataSource = kendo.observable({
                Username: '',
                Password: '',
                DisplayName: '',
                Email: '',
                School: '0',
                Major: '',
                BirthDate: '',
                AvatarUri: userAvatarUri
                    //About: '',
                    //Friends: [],
                    // BirthDate: new Date()
            });
            kendo.bind($('#signup-form'), dataSource, kendo.mobile.ui);
        };

        // Executed after hide of the Signup view
        // disable signup button
        var hide = function () {
            $signupBtnWrp.addClass('disabled');
        };

        var onSelectChange = function (sel) {
            var selected = sel.options[sel.selectedIndex].value;
            sel.style.color = (selected === 0) ? '#b6c5c6' : '#34495e';
        }

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
            hide: hide,
            onSelectChange: onSelectChange,
            signup: signup,
            addAvatar: addAvatar
        };

    }());

    return singupViewModel;

}());