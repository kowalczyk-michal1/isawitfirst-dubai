    $.fn.megaMenu = function() {

        var $menu = $(this);
        var $submenu = $('.sub-menu', $menu);
        var wHeight = $(window).height();
        var timer;

        // Megamenu Max Height
        function setMaxHeight(wHeight) {
			var maxH = $(window).height() - $('.page-header').height();
			$menu.data('setHeight', true);
			if (!$menu.hasClass('vertical')){
				$submenu.each(function() {
					var el = $(this);
					if (el.closest('.page-header.variant-3').length){
						 maxH = el.offset().top + el.outerHeight(true);
					}
					el.css({'max-height': maxH + 'px'});
                  //  $(this).find(".category-links").css({'max-height': maxH + 'px'})
				})
				$('.slick-initialized', $menu).slick('setPosition');
			}
        }
		
        $(window).bind('resize', function() {
  			$menu.removeData('setHeight');
        });

		if ($('body').hasClass('touch')){
			$menu.on("click.megamenu", ".sub-menu a", function(e) {
				var $this = $(this);
				if(!$this.data('firstclick')){
					$this.data('firstclick', true);
					e.preventDefault();
				}
			})
			$menu.on("click.megamenu", "li.mega-dropdown > a,li.simple-dropdown > a", function(e) {			
				if (!$(this).parent('li').hasClass('hovered')) {
				   if($('.page-header').is('.is-sticky')){
						setMaxHeight($(window).height());
				   }
				   else if (!$menu.data('setHeight')){
						setMaxHeight($(window).height());
				   }
				   $submenu.scrollTop(0);
				   if ($menu.hasClass('blackout') && !$menu.hasClass('department')){
						$("#wrapper").addClass('overlay');
				   }
				   $('li', $menu).removeClass('hovered');
				   $(this).parent('li').addClass('hovered');
				   $menu.data('opened', true);
				   e.preventDefault();
				}
				else {
					// second click go url
					if ($menu.hasClass('blackout') && !$menu.hasClass('department')){
						$("#wrapper").removeClass('overlay');
					}	
					$(this).parent('li').removeClass('hovered');
					$menu.removeData('opened');
					$('.sub-menu a', $menu).removeData('firstclick');
				}
				
				
			})
			$menu.on("click.megamenu", function(){
				event.stopPropagation();
			})
			$('#wrapper').on('click', function(){
				if($menu.data('opened')) {
					$('li', $menu).removeClass('hovered');
					$('.sub-menu a', $menu).removeData('firstclick');
					if ($menu.hasClass('blackout') && !$menu.hasClass('department')){
						$("#wrapper").removeClass('overlay');
					}	
				}
			});		
		} else {
			$menu.on("mouseenter", "li.mega-dropdown > a,li.simple-dropdown > a", function() {
			   if($('.page-header').is('.is-sticky')){
					setMaxHeight($(window).height());
			   }
			   else if (!$menu.data('setHeight')){
					setMaxHeight($(window).height());
			   }
			   $submenu.scrollTop(0);
			   if ($menu.hasClass('blackout') && !$menu.hasClass('department')){
					$("#wrapper").addClass('overlay');
			   }
			   $(this).parent('li').addClass('hovered');
			}).on("mouseleave", "li.mega-dropdown,li.simple-dropdown", function() {
				if ($menu.hasClass('blackout') && !$menu.hasClass('department')){
					$("#wrapper").removeClass('overlay');
				}
				$(this).parent('li').removeClass('hovered');
			});

			$menu.on("mouseleave", "li.mega-dropdown,li.simple-dropdown", function() {
				if ($menu.hasClass('blackout') && !$menu.hasClass('department')){
					$("#wrapper").removeClass('overlay');
				}
				$(this).removeClass('hovered');
			});
		}
		
        // bottom header
        $(".toggleHeader").on('click', function (e) {
            $('.page-header').toggleClass('open');
            $(this).toggleClass('open');
            // disable menu links to prevent fast hover on it
            $menu.addClass('disable').delay(1000).queue(function(){
               $(this).removeClass('disable'); 
               $(this).dequeue();
            });
            e.preventDefault();
        })

        // Dropdowns
        $(".simple-dropdown li", $menu).on('mouseenter mouseleave', function (e) {
            if ($('ul', this).length) {
				var $elm = $('ul:first', this),
					windowW = $(window).width(),
					isEntirelyVisible = ($elm.offset().left + $elm.width() <= windowW);
				if ($('body').hasClass('rtl')){
					isEntirelyVisible = ($elm.offset().left >= 0);
				}
				if (!isEntirelyVisible) {
					$(this).addClass('edge');
				} else {
					setTimeout(function() {
					  $(this).removeClass('edge');
				   }, 300);
				}				
            }
        });
      
    }
    
    
    
    