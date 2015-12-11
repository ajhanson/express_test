(function (app, doc, $) {
    console.log('loading users js');

    var me = {
        load: function load(id) {
            console.log('user entered ' + id);
        },
        add: function add(form) {

            $.ajax({
                url: form.attr('action'),
                method: 'POST',
                data: {
                    user: {
                        username: form.find('#username').val(),
                        password: form.find('#password').val()
                    }
                },
                dataType: 'json',
                complete: function (data) {
                    form.hide();
                    me.load(data._id);
                }
            });
        }
    }

    app.users = me;

})(window.app, document, jQuery);
