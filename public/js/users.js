(function (win, app, doc, $) {
    console.log('loading users js');

    $(doc).ready(function () {
        $('.logout-js').on('click', function (evt) {

            var trg = $(evt.target);

            $.ajax({
                url: trg.attr('href'),
                method: 'POST',
                dataType: 'json',
                complete: function (data) {
                    win.location = '/';
                }
            });

            evt.preventDefault();
        });
    });

    var me = {
        load: function load(id) {
            console.log('user entered ' + id);
            win.location = '/';
        },
        login: function login(form) {
            $.ajax({
                url: form.attr('action'),
                method: 'POST',
                data: {
                    username: form.find('#username').val(),
                    password: form.find('#password').val()
                },
                dataType: 'json',
                complete: function (data) {
                    me.load(data._id);
                }
            });
        },
        add: function add(form) {

            $.ajax({
                url: form.attr('action'),
                method: 'POST',
                data: {
                    user: {
                        username: form.find('#username').val(),
                        name: form.find('#name').val(),
                        email: form.find('#email').val(),
                        password: form.find('#password').val()
                    }
                },
                dataType: 'json',
                complete: function (data) {
                    me.load(data._id);
                }
            });
        }
    }

    app.users = me;

})(window, window.app, document, jQuery);
