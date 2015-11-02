
$(function () {

    $("html, .page > .content, .pro-image-list").niceScroll();


    $.metadata.setType("attr", "validate");
    var validator = $("form").validate();

    $("button[type=reset]").click(function() {
        validator.resetForm();
    });

    $('form').submit(function (ev) {
        ev.preventDefault();
        if (validator.form()) {
            var form = $(this);
            $.ajax({
                url: form.attr('action'),
                type: 'POST',
                data: form.serialize(),
                success: function (result) {
                    if (result === "OK") {
                        window.location.href = "/admin/product";
                    }
                },
                error: function(jqXhr, textStatus, errorThrown) {
                    //textStatus :"timeout", "error", "notmodified" 和 "parsererror"。
                    if (jqXhr.responseJSON) {
                        var errorMsg = jqXhr.responseJSON.msg;
                        alert(errorMsg)
                    } else {
                        alert("unknow error")
                    }
                }
            });
        }
    });

    $(".footer a:not(.active)").hover(function () {
        $(this).addClass("active");
    }, function() {
        $(this).removeClass("active");
    })

});