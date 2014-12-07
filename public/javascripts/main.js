function getBlockHeight(cb) {
    var maxHeight = 0;
    $('.block').each(function(index, el) {
        if ($(el).height() > maxHeight) {
            maxHeight = $(el).height();
        }
    });

    cb(maxHeight);
}

function resizeText(el) {
    var size = 1;
    var pWidth = 0;
    while($(el).width() < $(el).parent().width() && (pWidth <= $(el).width())) {
        $(el).css('font-size', size + 'px');

        if (pWidth > $(el).width()) {
            size--;
            $(el).css('font-size', size + 'px');
            break;
        }
        else if (size == 16) {
            break;
        }

        pWidth = $(el).width();


        size++;
    }
}

function getSections(cb) {
    var sectionIds = [];
    var sectionPositions = [];

    $(".section").each(function(index, el) {
        if (index != 0) {
            sectionIds.push("#" + $(this).attr("id"));
        }
    });
    $.each(sectionIds, function(index, val) {
        var el = $(sectionIds[index]);
        var offset = el.offset();
        var top = offset.top;
        top = Math.abs(Math.round(top));
        sectionPositions.push(top);
    });

    cb(sectionIds, sectionPositions);
}

$(document).ready(function() {
    smoothScroll.init();
    var maxHeight;
    var posArray;
    var idArray;

    getBlockHeight(function(mh) {
        maxHeight = mh;
        $(".block").height(maxHeight).css('min-height', maxHeight);
    });

    $(".smallText").each(function(index, el) {
        resizeText(this);
    });

    if ($(window).height() > 600) {
        $(".page").each(function(index, el) {
            $(".page").height($(window).height());
        });
        $(".page-fluid").each(function(index, el) {
            if ($(".page-fluid").height() < $(window).height()) {
                $(".page-fluid").height($(window).height());
            }
        });
    }
    
    getSections(function(ids, positions) {
        idArray = ids;
        posArray = positions;
    });

    $(".thumbnail").each(function(index, el) {
        $(this).height($(this).width());
    });

    $(window).scroll(function(event) {
        var doc = document.documentElement;
        var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
        var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

        if (top >= $(".page").height()) {
            $(".navbar").removeClass('hiddenNav');
        }
        else {
            $(".navbar").addClass('hiddenNav');
        }

        var i = 0;
        while (top >= posArray[i]) i++;
        i--;
        $(".navbar-nav").children('li').children('a').removeClass('active');
        
        // idArray[i] is the current section active
        var navName = idArray[i] + "Nav";
        $(navName).addClass('active');
    });

    $(window).resize(function(event) {
        $(".block").css('height', 'auto');
        getBlockHeight(function(mh) {
            maxHeight = mh;
            $(".block").height(maxHeight).css('min-height', maxHeight);
            $(".col-md-3").height($(".block").height() + 32);
        });
        $(".smallText").each(function(index, el) {
            resizeText(this);
        });
        $(".thumbnail").each(function(index, el) {
            $(this).height($(this).width());
        });
    });

    // $(".block").hover(function() {
    //     if ($(window).width() > 600) {
    //         $(this).children("p").children(".ellipsis").css('display', 'none');
    //         var thisBlock = this;
    //         $(".block").each(function(index, el) {
    //             if (el != thisBlock) {
    //                 $(el).stop().animate({opacity: 0.5}, 100);
    //             }
    //             else {
    //                 console.log(el);
    //                 $(el).children("p").children('.hiddenText').css('display', 'block');
    //             }
    //         });
    //     }
    // }, function() {
    //     if ($(window).width() > 600) {
    //         $(".block").stop().animate({opacity: 1}, 100);
    //         $(".hiddenText").css('display', 'none');
    //         $(this).children("p").children(".ellipsis").css('display', 'block');
    //         $(".block").height(maxHeight);
    //     }
    // });
});