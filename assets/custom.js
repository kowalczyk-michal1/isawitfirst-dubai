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