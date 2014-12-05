$(document).ready(function() {
    smoothScroll.init();

    if ($(window).height() > 600) {
        $(".page").each(function(index, el) {
            $(".page").height($(window).height());
        });
    }

    $(".thumbnail").each(function(index, el) {
        $(this).height($(this).width());
    });
});