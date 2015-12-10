(function (app, doc, $) {
    console.log('loading posts js');

    var me = {
        load: function load() {
            var html = '',
                p = $('#posts_render');

            $.ajax({
                method: 'GET',
                url: p.data().action,
                dataType: 'json',
                success: function (data) {
                    $(data).each(function () {
                        html += '<li class="list-group-item">' + this.post + ', <em>' + this.author + '</em></li>';
                    });
                    p.html('<ul class="list-group">' + html + '</ul>');
                }
            });
        },
        add: function add(form) {

            $.ajax({
                url: form.attr('action'),
                method: 'POST',
                data: {
                    content: form.find('#content').val(),
                    author: form.find('#author').val()
                },
                dataType: 'json',
                complete: function (data) {
                    form.find('#content').val('');
                    me.load();
                }
            });
        }
    }

    app.posts = me;

})(window.app, document, jQuery);
