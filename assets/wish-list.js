function removeFromWishlist($this) {
  // select parent li element
  var $elem = $this.closest("div.table-row");
  // get the id which is the selected variant tag
  var tagID = $elem.attr("id");
  var $form = $("#remove");

  // set the value of the input in the form to the selected variant
  $("#remove-value").attr("value", tagID);
  var postData = $form.serializeArray();
  var formURL = $form.attr("action");
  $this.parent().addClass('block-loading');
  $.ajax({
    url : formURL,
    type: "POST",
    data : postData,
    success:function(data, textStatus) {
      $elem.remove();
      if($(".wishlist div.table-row").length == 0) {
        $(".wishlist").remove();
        $(".empty").removeClass('hidden');
      } else {
        updateEmailList();
      }
      $this.html('').parent().removeClass('block-loading');
    },
    error: function() {
      $(this).append("<p>I'm afraid that didn't work.</p>");
    }
  });
}
function updateEmailList() {
  var currentURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
  $.ajax({
    url : currentURL,
    type: "GET",
    success:function(data, textStatus) {
      var newEmailLink = $(data).find("#wishlist-email-link a");
      $("#wishlist-email-link").html(newEmailLink);
    }
  });
}
$(function(){
  $(document).on('click','.add_to_wishlist',(function(e){
    e.preventDefault();
    email=$(this).data('email');
    tags=$(this).data('tags');
    name=$(this).data('name');
    formURL='/contact';
    $this=$(this);
    $this.addClass('block-loading');

    $.ajax({
      url : formURL,
      type: "POST",
      data : {'contact[email]':email,'contact[tags]':tags,'form_type':'customer','utf8':'✓'},
      success:function(data, textStatus) {
        $('#modalSuccess .modal-body p').html(name+': added to <a href="/pages/my-wishlist">wishlist!</a>');
        var $modal = $('#modalSuccess');
        $modal.on('shown.bs.modal', function (e) {
          $('.modal-content', $modal).attr({'src': src});
          $('iframe', $modal).attr({'src': src});
        }).on('hidden.bs.modal', function(e) {
          var $this = $(this);
          $this.removeData('bs.modal');
          // clear iframe
          $iframe.empty().attr({'src': 'about:blank'}).css({'opacity':'0'});
          $loader.css({'display':'block'});
          $('.product-item').removeClass('hover');
        })


        $('#modalSuccess').modal('show');





        $this.removeClass('add_to_wishlist').addClass('active').addClass('wishlist');
        $this.attr('href','/pages/my-wishlist');
        $this.attr('title','Go To Wishlist');
        $this.removeClass('block-loading');
        $this.find('span').text('In Wishlist');
      },
      error: function() {
        $('#modalError .modal-body p').text(errorThrown);
        $('#modalError').modal('show');
      }
    });
  }))

  $(".js-remove-button").on("click", function(e) {
    e.preventDefault();
    removeFromWishlist($(this));
  });

    $(document).on('click','.no_wishlist',(function(e){
      e.preventDefault();
      $('#modalError .modal-body p').html('Please <a href="/account/login">login</a> first');
      var $modal = $('#modalError');
      $modal.on('shown.bs.modal', function (e) {
        $('.modal-content', $modal).attr({'src': src});
        $('iframe', $modal).attr({'src': src});
      }).on('hidden.bs.modal', function(e) {
        var $this = $(this);
        $this.removeData('bs.modal');
        // clear iframe
        $iframe.empty().attr({'src': 'about:blank'}).css({'opacity':'0'});
        $loader.css({'display':'block'});
        $('.product-item').removeClass('hover');
      })


      $('#modalError').modal('show');
  }))
})






