/**
 * AddActivity view model
 */

var app = app || {};

app.AddComment = (function () {
    'use strict'

    var AddCommentViewModel = (function () {

        var $newComment;
        var validator;
        var commentImageFilename = Math.random().toString(36).substring(2, 15) + ".jpg";
        var commentImageUri;

        var init = function () {

            validator = $('#enterComment').kendoValidator().data('kendoValidator');
            $newComment = $('#newComment');

            $newComment.on('keydown', app.helper.autoSizeTextarea);
        };

        var show = function () {

            $newComment.val('');
            validator.hideMessages();
            $newComment.prop('rows', 1);
        };

        var saveComment = function () {

            if (validator.validate()) {
                app.mobileApp.showLoading();
                var comments = app.Comments.comments;
                var comment = comments.add();

                comment.Comment = $newComment.val();
                comment.UserId = app.Users.currentUser.get('data').Id;
                comment.ActivityId = app.Activity.activity().Id;
                if (commentImageUri) {
                    comment.MediaUri = commentImageUri;
                }

                comments.sync();
                app.mobileApp.hideLoading();
                app.mobileApp.navigate('views/activitiesView.html');
            }
        };

        var saveImage = function () {
            var success = function (data) {
                Everlive.$.Files.create({
                    Filename: commentImageFilename,
                    ContentType: "image/jpeg",
                    base64: data
                }).then(loadImage);
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
        };

        function loadImage() {
            var query = new Everlive.Query();
            var now = new Date();
            var queryTime = now.getMinutes() - 1;
            now.setMinutes(queryTime);
            query.where().gt('CreatedAt', now);
            Everlive.$.Files.get(query).then(function (data) {
                var files = [];
                commentImageUri = data.result[data.count - 1].Uri;
                files.push(data.result[data.count - 1].Uri);
                $("#postImage").kendoMobileListView({
                    dataSource: files,
                    template: "<img src='#: data #'>"
                });
            });

        }

        var displayName = function () {
            return app.Users.currentUser.get('data').DisplayName;
        };

        var avatarUri = function () {
            if (app.Users.currentUser.get('data').AvatarUri)
                return app.Users.currentUser.get('data').AvatarUri;
            else
                return "styles/images/avatar.png";
        };

        return {
            init: init,
            show: show,
            displayName: displayName,
            avatarUri: avatarUri,
            saveImage: saveImage,
            me: app.Users.currentUser,
            saveComment: saveComment
        };

    }());

    return AddCommentViewModel;

}());