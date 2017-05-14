function diff_string(t) {
    var e = Math.floor(t / 864e5);
    t -= 864e5 * e;
    var n = Math.floor(t / 36e5);
    t -= 36e5 * n;
    var i = Math.floor(t / 6e4);
    t -= 6e4 * i, seconds = Math.floor(t / 1e3);
    var o = "";
    return e > 0 && (o += e + " Days, "), n < 10 && (n = "0" + n), i < 10 && (i = "0" + i), seconds < 10 && (seconds = "0" + seconds), o += n + "h " + i + "m " + seconds + "s"
}

function bannersStartTimer() {
    banner_countdown_timer = setInterval(function() {
        bannersUpdateTimers()
    }, 1e3), bannersUpdateTimers();
}

function bannersUpdateTimers3() {
    alert('test');
}

function bannersUpdateTimers() {
    $(".countdown-timer").each(function(t) {
        var e = $(this).data("timer_expire");
        e < Math.floor(Date.now() / 1e3) ? $(this).html(diff_string(Date.now() - Date.now())) : $(this).html(diff_string(1e3 * e - Date.now()))
    })
}


$(document).ready(function() {
    bannersStartTimer();

    $( ".collections-view-items span" ).on( "click", function() {
        var number_of_items = $(this).attr("data-id");

        $( ".collections-view-items span" ).removeClass("view-item-active");
        $(this).addClass("view-item-active");

        change_view_items(number_of_items);
    });
});


function change_view_items(number) {
    switch(number) {
        case '2':
            assign_view_items("two-in-row");
            break;
        case '4':
            assign_view_items("four-in-row");
            break;
        case '6':
            assign_view_items("six-in-row");
            break;
    }
}

function assign_view_items(className) {
    $(".products-grid").removeClass("one-in-row two-in-row three-in-row four-in-row five-in-row six-in-row");

    $(".products-grid").addClass(className);
}

function collectionHideFilters() {
    if ($('#collection-page-content').hasClass('col-md-10')) {
        $('.filter-col').hide();
        $('#collection-page-content').removeClass('col-md-10');
    }
    else {
        $('.filter-col').show();
        $('#collection-page-content').addClass('col-md-10');
    }
}

function loadVerticalCarousel(init = true) {
    var getMainImageHeight = $(".main-image").height();

    $(".vertical-carousel-content").height(getMainImageHeight);

    var verticalImgHeight = getMainImageHeight / 4;

    $(".vertical-carousel-content #vertical-carousel img").each(function() {
        $(this).height(verticalImgHeight);
    });

    if (init) {
        $("#vertical-carousel").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
            vertical: true,
            adaptiveHeight: true
        });
    }

    var verticalNextArrow = getMainImageHeight + 35;

    $("#vertical-carousel .slick-next").css("top", ""+verticalNextArrow+"px");
}

function productPageSocial() {
    $(".product-page-icons").css("margin-top", "0px");

    var imageHeight = $(".page-design-lotd .main-image").height();
    var contentHeight = $(".product-info-block").height();

    var result = imageHeight - contentHeight;



    if (result > 0) {
        $(".product-page-icons").css("margin-top", ""+result+"px");
    } else {
        $(".product-page-icons").css("margin-top", "5px");
    }
}

$(document).ready(function() {
    $( ".product-desc-show-more" ).on( "click", function() {

        if ($(".product-description-more").hasClass("active")) {
            $(".product-description").css({
                "height": "130px"
            });

            $(".product-desc-show-more").text("SHOW MORE");
            $(".product-description-more").removeClass("active");
        } else {
            $(".product-description").css({
                "height": "auto"
            });

            $(".product-desc-show-more").text("HIDE");
            $(".product-description-more").addClass("active");
        }

        productPageSocial();

        return false;
    });
});

var countBanners = 1;

function bannerChanger() {
    var checkWidth =  $(document).width();

    if (checkWidth < 481) {
        if (countBanners == "1") {
            $(".sbm_left_column").hide();
            $(".sbm_middle_column").show();
            $(".sbm_right_column").hide();

            countBanners = 2;
        } else if (countBanners == "2") {
            $(".sbm_left_column").hide();
            $(".sbm_middle_column").hide();
            $(".sbm_right_column").show();

            countBanners = 3;
        } else if (countBanners == "3") {
            $(".sbm_left_column").show();
            $(".sbm_middle_column").hide();
            $(".sbm_right_column").hide();

            countBanners = 1;
        }
    } else {
        $(".sbm_left_column").show();
        $(".sbm_middle_column").show();
        $(".sbm_right_column").show();
    }

    setTimeout(function(){bannerChanger()}, 6 * 1000);
}


setTimeout(function(){bannerChanger()}, 6 * 1000);

function toggleFiltersMobile(close=false) {
    $(".filter-mobile-show").toggleClass("show-content-mobile");
    $(".mobile-filter-btn").addClass("active");
    $(".mobile-sort-btn").removeClass("active");
    if (close == true) $(".mobile-filter-btn").removeClass("active");
    $(".sort-mobile-show").removeClass("show-content-mobile");
}

function sortByMobile(close=false) {
    $(".filter-mobile-show").removeClass("show-content-mobile");
    $(".mobile-filter-btn").removeClass("active");
    $(".mobile-sort-btn").addClass("active");
    if (close == true) $(".mobile-sort-btn").removeClass("active");
    $(".sort-mobile-show").toggleClass("show-content-mobile");
}