(function (app, doc, $) {
    console.log('loading forms js');

    $(doc).ready(function () {
        $('.form-js-posts').keydown(function (evt) {
            if (evt.keyCode === 13) {
                app.posts.add($(this));
                evt.preventDefault();
            }
        }).submit(function (evt) {
            app.posts.add($(this));
            evt.preventDefault();
        });

        $('.form-js-signup').keydown(function (evt) {
            if (evt.keyCode === 13) {
                $(this).submit();
                evt.preventDefault();
            }
        }).submit(function (evt) {
            app.users.add($(this));
            evt.preventDefault();
        });

        $('.form-js-login').keydown(function (evt) {
            if (evt.keyCode === 13) {
                $(this).submit();
                evt.preventDefault();
            }
        }).submit(function (evt) {
            app.users.login($(this));
            evt.preventDefault();
        });

    });
})(window.app, document, jQuery);
