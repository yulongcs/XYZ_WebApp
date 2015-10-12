
$(function() {

    $('form').submit(function(ev) {
        ev.preventDefault();
        var form = $(this);
        $.ajax({
            url: form.attr('action'),

            type: 'POST',

            data: form.serialize(),

            success: function(obj) {

                var el = $('<li>');

                if ($('#projects-list').length) {

                    el.append($('<a>').attr('href', '/project/' + obj.id + '/tasks').text(obj.title + ' '))
                        .append($('<a>').attr('href', '/project/' + obj.id).attr('class', 'delete').text('x'));

                }
                $('ul').append(el);
            }
        });

        form.find('input').val(''); //clear input

        $('ul').delegate('a.delete', 'click', function(ev) {
            ev.preventDefault();
            var li = $(this).closest('li');
            $.ajac({
                url: $(this).attr('href'),
                type: 'DELETE',
                SUCCESS: function() {
                    li.remove();
                }
            })
        })
    });
});