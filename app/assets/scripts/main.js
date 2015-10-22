
$(function () {
    $('form').submit(function (ev) {
        ev.preventDefault();
        var form = $(this);
        $.ajax({
            url: form.attr('action'),
            type: 'POST',
            data: form.serialize(),
            success: function (obj) {
                debugger;
            }, error: function (jqXHR, textStatus, errorThrown) {
                //textStatus :"timeout", "error", "notmodified" 和 "parsererror"。
                var errorMsg = jqXHR.responseJSON.msg;
                alert(errorMsg)
            }
        });
    });

});