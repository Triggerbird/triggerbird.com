/**
 * http://kopatheme.com
 * Copyright (c) 2015 Kopatheme
 *
 * Licensed under the GPL license:
 *  http://www.gnu.org/licenses/gpl.html
  **/

/**
 *   1- Main menu
 *   2- Mobile menu
 *   3- Breadking News
 *   4- Fred Carousel
 *   5- Accordion
 *   6- Toggle Boxes
 *   7- Back to top
 *   8- Flickr
 *   9- Progress Bar
 *   10- Google Map
 *   11- Validate Form
 *   12- OwlCarousel
 *   13- Masonry
 *   14- jPlayer
 *   15- Match Height
 *   16- CountDown
 *   17- ScrollBar
 *   18- Video Wrapper
 
 *-----------------------------------------------------------------
 **/
 
"use strict";
var kopa_variable = {
    "contact": {
        "address": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "marker": "/url image"
    },
    "i18n": {
        "VIEW": "View",
        "VIEWS": "Views",
        "validate": {
            "form": {
                "SUBMIT": "Submit",
                "SENDING": "Sending..."
            },
            "name": {
                "REQUIRED": "Please enter your name",
                "MINLENGTH": "At least {0} characters required"
            },
            "email": {
                "REQUIRED": "Please enter your email",
                "EMAIL": "Please enter a valid email"
            },
            "url": {
                "REQUIRED": "Please enter your url",
                "URL": "Please enter a valid url"
            },
            "message": {
                "REQUIRED": "Please enter a message",
                "MINLENGTH": "At least {0} characters required"
            }
        }
    }
};

var map;

/* =========================================================
1. Main Menu
============================================================ */

Modernizr.load([
  {
    load: '/javascripts/superfish.js',
    complete: function () {

        //Top menu
        jQuery('#top-menu').superfish({
            delay: 100,
            speed: 'fast',
            cssArrows: false
        });

        jQuery("#top-menu > li").each(function() {
            if(jQuery(this).has("ul").length > 0) {
                jQuery(this).addClass('has-child');
            }
        });

        //Main menu
        jQuery('#main-menu').superfish({
            delay: 100,
            speed: 'fast',
            cssArrows: true
        });

    }
  }
]);


/* =========================================================
2. Mobile Menu
============================================================ */
Modernizr.load([
  {
    load: '/javascripts/jquery.navgoco.js',
    complete: function () {

        jQuery('#mobile-menu').navgoco({accordion: true});
        jQuery( "#main-nav i" ).click(function(){
            jQuery( "#mobile-menu" ).slideToggle( "slow" );
        });

        jQuery('.kopa-tabs-2 li a').click(function (e) {
          e.preventDefault()
          jQuery(this).tab('show')
        })
    }
  }
]);

/* =========================================================
3. Breadking News
============================================================ */
if (jQuery('.ticker-1').length > 0) {
    Modernizr.load([{
        load: '/javascripts/jquery.carouFredSel-6.2.1-packed.js',
        complete: function () {
            var _scroll = {
                delay: 1000,
                easing: 'linear',
                items: 1,
                duration: 0.07,
                timeoutDuration: 0,
                pauseOnHover: 'immediate'
            };
            jQuery('.ticker-1').carouFredSel({
                width: 419,
                align: false,
                items: {
                    width: 'variable',
                    height: 40,
                    visible: 1
                },
                scroll: _scroll
            });
        }
    }]);
}


/* =========================================================
4. Fred Carousel
============================================================ */
if (jQuery('.kopa-home-slider-1').length > 0) {
    Modernizr.load([
      {
        load: '/javascripts/jquery.carouFredSel-6.2.1-packed.js',
        complete: function () {           

            function setNavi( $c, $i ) {
                var $img = $i.find('img'),
                    $prevImg = $i.prev().find('img'),
                    $nextImg = $i.next().find('img');

                var title = $img.attr( 'alt' );
                $('#title').text( title );

                var current = $c.triggerHandler( 'currentPosition' );
                $('#pagenumber span').text( current+1 );

                var $prev = ($i.is(':first-child')) ? $c.children().last().find('img') : $prevImg;
                var small = $prev.data('thumb');
                $('#prev').html('<img src="'+small+'" />');

                var $next = $nextImg;
                var small = $next.data('thumb');
                $('#next').html('<img src="'+small+'" />');
            }
            $(function() {
                $("#carousel").carouFredSel({
                    items: 1,
                    prev: '#prev',
                    next: '#next',
                    pagination: {
                        container: '#pager span',
                        anchorBuilder: function( nr ) {
                            var small = $(this).find('img').data('thumb'),   
                                authorName = $(this).find('.author-name').text();
                                return '<span><a href="#" title="Go to image '+nr+'.">'+nr+'<img src="'+small+'" /></a><span>' + authorName + '</span></span>';
                        }
                    },
                    scroll: {
                        onBefore: function( data ) {
                            setNavi( $(this), data.items.visible );
                        },
                        pauseOnHover: 'immediate'
                    },
                    onCreate: function( data ) {
                        setNavi( $(this), data.items );
                    }
                });
            });
            $(".home-slider-box .loading").hide();
        }
      }
    ]);
}

jQuery(window).resize(function() {
    s_width(); 
});

jQuery(window).load(function() {
    s_width(); 
});


jQuery(document).ready(function() {
    
    /* =========================================================
    5. Accordion
    ========================================================= */
    
    var acc_wrapper=jQuery('.acc-wrapper');
    if (acc_wrapper.length >0) 
    {
        
        jQuery('.acc-wrapper .accordion-container').hide();
        jQuery.each(acc_wrapper, function(index, item){
            jQuery(this).find(jQuery('.accordion-title')).first().addClass('active').next().show();
            
        });
        
        jQuery('.accordion-title').on('click', function(e) {
            kopa_accordion_click(jQuery(this));
            e.preventDefault();
        });
        
        var titles = jQuery('.accordion-title');
        
        jQuery.each(titles,function(){
            kopa_accordion_click(jQuery(this));
        });
    }  

    /* =========================================================
    6. Toggle Boxes
    ============================================================ */
    jQuery('.toggle-view li').click(function (event) {
        var text = jQuery(this).children('.kopa-panel');
        var icon = jQuery(this).children('span');

        if (text.is(':hidden')) {
            jQuery(this).addClass('active');
            text.slideDown('300');
            kopa_toggle_click(icon, 'fa-plus', 'fa-minus');
        } else {
            jQuery(this).removeClass('active');
            text.slideUp('300');
            kopa_toggle_click(icon, 'fa-minus', 'fa-plus');
        }
    });


    /* =========================================================
    7. Back to top
    ============================================================ */

    // hide #back-top first
    jQuery("#back-top").hide();

    // fade in #back-top
    jQuery(function () {
        jQuery(window).scroll(function () {
            if (jQuery(this).scrollTop() > 200) {
                jQuery('#back-top').fadeIn();
            } else {
                jQuery('#back-top').fadeOut();
            }
        });

        // scroll body to 0px on click
        jQuery('#back-top a').click(function () {
            jQuery('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });

});

function kopa_accordion_click (obj) {
    if( obj.next().is(':hidden') ) {
        obj.parent().find(jQuery('.active')).removeClass('active').next().slideUp(300);
        obj.toggleClass('active').next().slideDown(300);
                            
    }
jQuery('.accordion-title span').removeClass('fa-minus').addClass('fa-plus');
    if (obj.hasClass('active')) {
        obj.find('span').removeClass('fa-plus');
        obj.find('span').addClass('fa-minus');              
    } 
}

function kopa_toggle_click(obj, remove_class, new_class) {
    obj.removeClass(remove_class);
    obj.addClass(new_class);
}

function s_width () {

    var imgs = jQuery('.kopa-home-slider-carousel .carousel-item > img');
    var c_width;
    var i_height;

    jQuery.each( imgs, function( index, value){
        c_width = parseInt(jQuery(this).parent().parent().parent().parent().width());
        
        jQuery(this).width(c_width);

        i_height = jQuery(this).height();

        jQuery(this).parent().height(i_height);
        jQuery(this).parent().parent().height(i_height);
        jQuery(this).parent().parent().parent().height(i_height);
    });
} 


/* =========================================================
8. Flickr
============================================================ */
if (jQuery('.kopa-flickr-widget').length > 0) {

    Modernizr.load([{
        load: ['/javascripts/jflickrfeed.js', '/javascripts/imgliquid.js'],
        complete: function () {
            jQuery('.kopa-flickr-widget ul').each(function () {
                jQuery(this).jflickrfeed({
                    limit: 9,
                    qstrings: {
                        id: jQuery(this).find('.flickr-wrap').attr('data-user')
                    },
                    itemTemplate: '<li class="flickr-badge-image">' + '<a target="blank" href="{{link}}" title="{{title}}" class="imgLiquid">' + '<img src="{{image_m}}" alt="{{title}}"  />' + '</a>' + '</li>'
                }, function (data) {
                    jQuery('.kopa-flickr-widget .imgLiquid').imgLiquid();
                });
            });
        }
    }]);
}


/* =========================================================
9. Progress bar
============================================================ */
if (jQuery('.kopa-flickr-widget').length > 0) {

    Modernizr.load([{
        load: ['/javascripts/jquery-ui-1.10.4.min.js', '/javascripts/visible.min.js', '/javascripts/pro-bars.min.js'],
        complete: function () {
            function animateProgressBar() {
                $('.pro-bar').each(function(i, elem) {
                    var elem = $(this),
                        percent = elem.attr('data-pro-bar-percent'),
                        delay = elem.attr('data-pro-bar-delay');

                    if (!elem.hasClass('animated'))
                        elem.css({ 'width' : '0%' });

                    if (elem.visible(true)) {
                        setTimeout(function() {
                            elem.animate({ 'width' : percent + '%' }, 2000, 'easeInOutExpo').addClass('animated');
                        }, delay);
                    } 
                });
            }

            $(document).ready(function() {
                animateProgressBar();
            });

            $(window).resize(function() {
                animateProgressBar();
            });

            $(window).scroll(function() {
                animateProgressBar();

                if ($(window).scrollTop() + $(window).height() == $(document).height())
                    animateProgressBar();
            });
        }
    }]);
}


/* =========================================================
10. Google Map
============================================================ */
var map;

if (jQuery('.kp-map').length > 0) {
      var id_map = jQuery('.kp-map').attr('id');
      var lat = parseFloat(jQuery('.kp-map').attr('data-latitude'));
      var lng = parseFloat(jQuery('.kp-map').attr('data-longitude'));
      var place = jQuery('.kp-map').attr('data-place');

  map = new GMaps({
      el: '#'+id_map,
      lat: lat,
      lng: lng,
      zoomControl : false,
      zoomControlOpt: {
          style : 'DEFAULT',
          position: 'TOP_LEFT'
      },
      panControl : false,
      streetViewControl : false,
      mapTypeControl: false,
      overviewMapControl: false,
      scaleControl: false
    });
    map.addMarker({
        lat: lat,
        lng: lng,
        title: place
    });
};


/* =========================================================
11. Validate form
============================================================ */

if (jQuery('.comments-form,.contact-form').length > 0) {
    Modernizr.load([{
        load: ['/javascripts/jquery.form.min.js', '/javascripts/jquery.validate.min.js'],
        complete: function () {
            jQuery('.comments-form,.contact-form').validate({
                // Add requirements to each of the fields
                rules: {
                    name: {
                        required: true,
                        minlength: 10
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    message: {
                        required: true,
                        minlength: 20
                    }
                },
                // Specify what error messages to display
                // when the user does something horrid
                messages: {
                    name: {
                        required: kopa_variable.i18n.validate.name.REQUIRED,
                        minlength: jQuery.format(kopa_variable.i18n.validate.name.MINLENGTH)
                    },
                    email: {
                        required: kopa_variable.i18n.validate.email.REQUIRED,
                        email: kopa_variable.i18n.validate.email.EMAIL
                    },
                    message: {
                        required: kopa_variable.i18n.validate.message.REQUIRED,
                        minlength: jQuery.format(kopa_variable.i18n.validate.message.MINLENGTH)
                    }
                },
                // Use Ajax to send everything to processForm.php
                submitHandler: function (form) {
                    jQuery(".comments-form .input-submit,.contact-form .input-submit").attr("value", kopa_variable.i18n.validate.form.SENDING);
                    jQuery(form).ajaxSubmit({
                        success: function (responseText, statusText, xhr, $form) {
                            jQuery("#response").html(responseText).hide().slideDown("fast");
                            jQuery(".comments-form .input-submit,.contact-form .input-submit").attr("value", kopa_variable.i18n.validate.form.SUBMIT);
                        }
                    });
                    return false;
                }
            });
        }
    }]);
}

if ($('.comments-form-1').length > 0) {
    Modernizr.load([
      {
        load:['/javascripts/jquery.form.min.js', '/javascripts/jquery.validate.min.js'],
        complete: function () {
            $('.comments-form-1').validate({
                // Add requirements to each of the fields
                rules: {
                    name1: {
                        required: true,
                        minlength: 4
                    },
                    name2: {
                        required: true,
                        minlength: 4
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    message: {
                        required: true,
                        minlength: 10
                    }
                },
                // Specify what error messages to display
                // when the user does something horrid
                messages: {
                    name: {
                        required: "Please enter your name.",
                        minlength: $.format("At least {0} characters required.")
                    },
                    email: {
                        required: "Please enter your email.",
                        email: "Please enter a valid email."
                    },
                    web: {
                        required: "Please enter your website.",
                        minlength: "Please enter a valid website url."
                    },
                    message: {
                        required: "Please enter a message.",
                        minlength: $.format("At least {0} characters required.")
                    }
                },
                // Use Ajax to send everything to processForm.php
                submitHandler: function(form) {
                    $("#.input-submit-1").attr("value", "Sending...");
                    $(form).ajaxSubmit({
                        success: function(responseText, statusText, xhr, $form) {
                            $("#response").html(responseText).hide().slideDown("fast");
                            $("#.input-submit-1").attr("value", "Submit");
                        }
                    });
                    return false;
                }
            });
        }
      }
    ]);
};


/* =========================================================
12. Owl Carousel
============================================================ */
if (jQuery('.kopa-blog-carousel').length > 0) {

    Modernizr.load([
      {
        load: '/javascripts/owl.carousel.min.js',
        complete: function () {
            jQuery('.kopa-blog-carousel').owlCarousel({
                singleItem : true,
                lazyLoad : true,
                navigation : true,
                pagination: false,
                navigationText : false
            });
        }
      }
    ]);
};


if (jQuery('.kopa-blog-classic-carousel').length > 0) {

    Modernizr.load([
      {
        load: '/javascripts/owl.carousel.min.js',
        complete: function () {
            jQuery('.kopa-blog-classic-carousel').owlCarousel({
                singleItem : true,
                lazyLoad : true,
                navigation : true,
                pagination: false,
                navigationText : false
            });
        }
      }
    ]);
};


if (jQuery('.kopa-single-carousel').length > 0) {

    Modernizr.load([
      {
        load: '/javascripts/owl.carousel.min.js',
        complete: function () {
            jQuery('.kopa-single-carousel').owlCarousel({
                singleItem : true,
                lazyLoad : true,
                navigation : true,
                pagination: false,
                navigationText : false
            });
        }
      }
    ]);
};

if (jQuery('.kopa-event-carousel').length > 0) {

    Modernizr.load([
      {
        load: '/javascripts/owl.carousel.min.js',
        complete: function () {
            jQuery('.kopa-event-carousel').owlCarousel({
                singleItem : true,
                lazyLoad : true,
                navigation : true,
                pagination: false,
                navigationText: ["Previous Events","Next Events"]
            });
        }
      }
    ]);
};

if ($('.owl-carousel-1').length > 0) {
    Modernizr.load([{
        load: ['/javascripts/owl.carousel.min.js'],
        complete: function () {

            var owl1 = $(".owl-carousel-1");
            owl1.owlCarousel({
                items: 4,
                itemsTablet : [799,3],
                itemsMobile : [639,2],
                pagination: true,
                slideSpeed: 600,
                navigationText: false,
                navigation: true
            });
        }

    }]);

};

if ($('.owl-carousel-2').length > 0) {
    Modernizr.load([{
        load: ['/javascripts/owl.carousel.min.js'],
        complete: function () {

            var owl2 = $(".owl-carousel-2");
            owl2.owlCarousel({
                items: 3,
                pagination: true,
                slideSpeed: 600,
                navigationText: false,
                navigation: false
            });
            
        }

    }]);

};

if ($('.owl-carousel-3').length > 0) {
    Modernizr.load([{
        load: ['/javascripts/owl.carousel.min.js'],
        complete: function () {

            var owl3 = $(".owl-carousel-3");
            owl3.owlCarousel({
                singleItem: true,
                pagination: true,
                slideSpeed: 600,
                navigationText: false,
                navigation: false
            });
        }

    }]);

};

if ($('.owl-carousel-4').length > 0) {
    Modernizr.load([{
        load: ['/javascripts/owl.carousel.min.js'],
        complete: function () {

            var owl4 = $(".owl-carousel-4");
            owl4.owlCarousel({
                singleItem: true,
                pagination: true,
                slideSpeed: 600,
                navigationText: false,
                navigation: true,
                afterInit: function(){
                    $(".home-slider-box-2 .loading").hide();    
                }
            });
        }

    }]);

};

if ($('.kopa-sync-carousel-widget').length > 0) {
    Modernizr.load([{
        load:'/javascripts/owl.carousel.min.js',
        complete: function() {

            var sync1 = $(".kopa-sync-carousel-widget .sync1");
            var sync2 = $(".kopa-sync-carousel-widget .sync2");


            sync1.owlCarousel({
                singleItem: true,
                slideSpeed: 1000,
                navigation: false,
                navigationText: false,
                pagination: false,
                afterAction: syncPosition,
                responsiveRefreshRate: 200
            });

            sync2.owlCarousel({
                items: 6,
                itemsTablet : [799,3],
                pagination: false,
                navigation: true,
                navigationText: false,
                responsiveRefreshRate: 100
            });

            function syncPosition(el) {
                var current = this.currentItem;
                $(".sync2").find(".owl-item").removeClass("synced").eq(current).addClass("synced")
                if ($(".sync2").data("owlCarousel") !== undefined) {
                    center(current)
                }
            }

            $(".sync2").on("click", ".owl-item", function(e) {
                e.preventDefault();
                var number = $(this).data("owlItem");
                sync1.trigger("owl.goTo", number);
            });

            function center(number){
                
                var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
                var num = number;
                var found = false;
                for(var i in sync2visible){
                  if(num === sync2visible[i]){
                    var found = true;
                  }
                }
             
                if(found===false){
                    if (undefined != sync2visible){
                        if(num > sync2visible[sync2visible.length-1]){
                            sync2.trigger("owl.goTo", num - sync2visible.length+2)
                        }else{
                            if(num - 1 === -1){
                                num = 0;
                            }
                            sync2.trigger("owl.goTo", num);
                        } 
                    }
                } else if(num === sync2visible[sync2visible.length-1]){
                    sync2.trigger("owl.goTo", sync2visible[1])
                } else if(num === sync2visible[0]){
                    sync2.trigger("owl.goTo", num-1)
                }
                
            }
        }
    }]);
    
};


/* =========================================================
13. Masonry
============================================================ */
Modernizr.load([{
    load: ['/javascripts/masonry.pkgd.min.js', '/javascripts/imagesloaded.js'],
    complete: function () {
        var $masonry1 = jQuery('.kopa-masonry-list-1-widget .masonry-list-wrapper > ul');
        imagesLoaded($masonry1, function () {
            $masonry1.masonry({
                columnWidth: 1,
                itemSelector: '.masonry-item'
            });
            $masonry1.masonry('bindResize')
        });
    }
}]);


if ($('.kopa-masonry-widget').length > 0) {

    Modernizr.load([{
        load: ['/javascripts/masonry.pkgd.min.js', '/javascripts/imagesloaded.js'],
        complete: function () {

            var jQuerymasonry1 = $('.kopa-masonry-widget').find('.kopa-masonry-wrap');
            imagesLoaded(jQuerymasonry1, function () {
                jQuerymasonry1.masonry({
                    columnWidth: 1,
                    itemSelector: '.ms-item1'
                });
                jQuerymasonry1.masonry('bindResize')
            });
        }   
    }]);

};


if ($('.masonry-container').length > 0) {
    Modernizr.load([{
        load: ['/javascripts/imagesloaded.js','/javascripts/wookmark.js'],
        complete: function() {
            $('.masonry-container .container-masonry').imagesLoaded(function() {
                // Prepare layout options.
                var options = {
                    autoResize: true, // This will auto-update the layout when the browser window is resized.
                    container: $('.masonry-container .container-masonry'), // Optional, used for some extra CSS styling
                    offset: -1, // Optional, the distance between grid items
                    fillEmptySpace: true // Optional, fill the bottom of each column with widths of flexible height
                };
                // Get a reference to your grid items.
                var handler = $('.masonry-container .item'),
                    filters = $('.filters li');
                // Call the layout function.
                handler.wookmark(options);
                /**
                 * When a filter is clicked, toggle it's active state and refresh.
                 */
                var onClickFilter = function(event) {
                    var item = $(event.currentTarget),
                        activeFilters = [];
                    if (!item.hasClass('active')) {
                        filters.removeClass('active');
                    }
                    item.toggleClass('active');
                    // Filter by the currently selected filter
                    if (item.hasClass('active')) {
                        activeFilters.push(item.data('filter'));
                    }
                    handler.wookmarkInstance.filter(activeFilters);
                }
                // Capture filter click events.
                filters.click(onClickFilter);
            });
        }
    }]);
};


$( window ).resize(function(){
    if ($('.masonry-container').length > 0) {                      
        $('.masonry-container .item').wookmark();        
    };
});


/* =========================================================
14. jPlayer
============================================================ */

if ($('.kopa-jp-jplayer').length > 0) {

    Modernizr.load([{
        load: ['/javascripts/jquery.jplayer.min.js', '/javascripts/jplayer.playlist.min.js'],
        complete: function () {
            
            new jPlayerPlaylist({
                jPlayer: ".kopa-jp-jplayer",
                cssSelectorAncestor: ".kopa-jp-wrap"
            }, [
                {
                    title:"Cro Magnon Man",
                    mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg"
                },
                {
                    title:"Your Face",
                    mp3:"http://www.jplayer.org/audio/mp3/TSP-05-Your_face.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/TSP-05-Your_face.ogg"
                },
                {
                    title:"Cyber Sonnet",
                    mp3:"http://www.jplayer.org/audio/mp3/TSP-07-Cybersonnet.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/TSP-07-Cybersonnet.ogg"
                },
                {
                    title:"Tempered Song",
                    mp3:"http://www.jplayer.org/audio/mp3/Miaow-01-Tempered-song.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/Miaow-01-Tempered-song.ogg"
                },
                {
                    title:"Hidden",
                    mp3:"http://www.jplayer.org/audio/mp3/Miaow-02-Hidden.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg"
                },
                {
                    title:"Lentement",
                    free:true,
                    mp3:"http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/Miaow-03-Lentement.ogg"
                },
                {
                    title:"Lismore",
                    mp3:"http://www.jplayer.org/audio/mp3/Miaow-04-Lismore.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/Miaow-04-Lismore.ogg"
                },
                {
                    title:"The Separation",
                    mp3:"http://www.jplayer.org/audio/mp3/Miaow-05-The-separation.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/Miaow-05-The-separation.ogg"
                },
                {
                    title:"Beside Me",
                    mp3:"http://www.jplayer.org/audio/mp3/Miaow-06-Beside-me.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/Miaow-06-Beside-me.ogg"
                },
                {
                    title:"Bubble",
                    free:true,
                    mp3:"http://www.jplayer.org/audio/mp3/Miaow-07-Bubble.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
                },
                {
                    title:"Stirring of a Fool",
                    mp3:"http://www.jplayer.org/audio/mp3/Miaow-08-Stirring-of-a-fool.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/Miaow-08-Stirring-of-a-fool.ogg"
                },
                {
                    title:"Partir",
                    free: true,
                    mp3:"http://www.jplayer.org/audio/mp3/Miaow-09-Partir.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/Miaow-09-Partir.ogg"
                },
                {
                    title:"Thin Ice",
                    mp3:"http://www.jplayer.org/audio/mp3/Miaow-10-Thin-ice.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/Miaow-10-Thin-ice.ogg"
                }
            ], {
                swfPath: "../../dist/jplayer",
                supplied: "oga, mp3",
                wmode: "window",
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: true,
                keyEnabled: true
            });
        }
    }]);
}

if ($('.kopa-jp-jplayer1').length > 0) {

    Modernizr.load([{
        load: ['/javascripts/jquery.jplayer.min.js', '/javascripts/jplayer.playlist.min.js'],
        complete: function () {
            
            new jPlayerPlaylist({
                jPlayer: ".kopa-jp-jplayer1",
                cssSelectorAncestor: ".kopa-jp-wrap1"
            }, [
                {
                    title:"Cro Magnon Man",
                    mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg"
                },
                {
                    title:"Your Face",
                    mp3:"http://www.jplayer.org/audio/mp3/TSP-05-Your_face.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/TSP-05-Your_face.ogg"
                },
                {
                    title:"Cyber Sonnet",
                    mp3:"http://www.jplayer.org/audio/mp3/TSP-07-Cybersonnet.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/TSP-07-Cybersonnet.ogg"
                }
            ], {
                swfPath: "../../dist/jplayer",
                supplied: "oga, mp3",
                wmode: "window",
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: true,
                keyEnabled: true
            });
        }
    }]);
}

if ($('.kopa-jp-jplayer2').length > 0) {

    Modernizr.load([{
        load: ['/javascripts/jquery.jplayer.min.js', '/javascripts/jplayer.playlist.min.js'],
        complete: function () {
            
            new jPlayerPlaylist({
                jPlayer: ".kopa-jp-jplayer2",
                cssSelectorAncestor: ".kopa-jp-wrap2"
            }, [
                {
                    title:"Cro Magnon Man",
                    mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg"
                },
                {
                    title:"Your Face",
                    mp3:"http://www.jplayer.org/audio/mp3/TSP-05-Your_face.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/TSP-05-Your_face.ogg"
                },
                {
                    title:"Cyber Sonnet",
                    mp3:"http://www.jplayer.org/audio/mp3/TSP-07-Cybersonnet.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/TSP-07-Cybersonnet.ogg"
                }
            ], {
                swfPath: "../../dist/jplayer",
                supplied: "oga, mp3",
                wmode: "window",
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: true,
                keyEnabled: true
            });
        }
    }]);
}

if ($('.kopa-jp-jplayer3').length > 0) {

    Modernizr.load([{
        load: ['/javascripts/jquery.jplayer.min.js', '/javascripts/jplayer.playlist.min.js'],
        complete: function () {
            
            new jPlayerPlaylist({
                jPlayer: ".kopa-jp-jplayer3",
                cssSelectorAncestor: ".kopa-jp-wrap3"
            }, [
                {
                    title:"Cro Magnon Man",
                    mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg"
                },
                {
                    title:"Your Face",
                    mp3:"http://www.jplayer.org/audio/mp3/TSP-05-Your_face.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/TSP-05-Your_face.ogg"
                },
                {
                    title:"Cyber Sonnet",
                    mp3:"http://www.jplayer.org/audio/mp3/TSP-07-Cybersonnet.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/TSP-07-Cybersonnet.ogg"
                }
            ], {
                swfPath: "../../dist/jplayer",
                supplied: "oga, mp3",
                wmode: "window",
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: true,
                keyEnabled: true
            });
        }
    }]);
}

if ($('.kopa-jp-jplayer4').length > 0) {

    Modernizr.load([{
        load: ['/javascripts/jquery.jplayer.min.js', '/javascripts/jplayer.playlist.min.js', '/javascripts/jquery.mCustomScrollbar.concat.min.js'],
        complete: function () {
            
            var a_playlist = new jPlayerPlaylist({
                jPlayer: ".kopa-jp-jplayer4",
                cssSelectorAncestor: ".kopa-jp-wrap4"
            }, [
                {
                    title:"Cro Magnon Man",
                    mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg"
                },
                {
                    title:"Your Face",
                    mp3:"http://www.jplayer.org/audio/mp3/TSP-05-Your_face.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/TSP-05-Your_face.ogg"
                },
                {
                    title:"Cyber Sonnet",
                    mp3:"http://www.jplayer.org/audio/mp3/TSP-07-Cybersonnet.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/TSP-07-Cybersonnet.ogg"
                },
                {
                    title:"Tempered Song",
                    mp3:"http://www.jplayer.org/audio/mp3/Miaow-01-Tempered-song.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/Miaow-01-Tempered-song.ogg"
                },
                {
                    title:"Hidden",
                    mp3:"http://www.jplayer.org/audio/mp3/Miaow-02-Hidden.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg"
                },
                {
                    title:"Lentement",
                    free:true,
                    mp3:"http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/Miaow-03-Lentement.ogg"
                },
                {
                    title:"Lismore",
                    mp3:"http://www.jplayer.org/audio/mp3/Miaow-04-Lismore.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/Miaow-04-Lismore.ogg"
                },
                {
                    title:"The Separation",
                    mp3:"http://www.jplayer.org/audio/mp3/Miaow-05-The-separation.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/Miaow-05-The-separation.ogg"
                },
                {
                    title:"Beside Me",
                    mp3:"http://www.jplayer.org/audio/mp3/Miaow-06-Beside-me.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/Miaow-06-Beside-me.ogg"
                },
                {
                    title:"Bubble",
                    free:true,
                    mp3:"http://www.jplayer.org/audio/mp3/Miaow-07-Bubble.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
                },
                {
                    title:"Stirring of a Fool",
                    mp3:"http://www.jplayer.org/audio/mp3/Miaow-08-Stirring-of-a-fool.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/Miaow-08-Stirring-of-a-fool.ogg"
                },
                {
                    title:"Cro Magnon Man",
                    mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg"
                },
                {
                    title:"Your Face",
                    mp3:"http://www.jplayer.org/audio/mp3/TSP-05-Your_face.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/TSP-05-Your_face.ogg"
                },
                {
                    title:"Cyber Sonnet",
                    mp3:"http://www.jplayer.org/audio/mp3/TSP-07-Cybersonnet.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/TSP-07-Cybersonnet.ogg"
                },
                {
                    title:"Tempered Song",
                    mp3:"http://www.jplayer.org/audio/mp3/Miaow-01-Tempered-song.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/Miaow-01-Tempered-song.ogg"
                },
                {
                    title:"Hidden",
                    mp3:"http://www.jplayer.org/audio/mp3/Miaow-02-Hidden.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg"
                },
                {
                    title:"Lentement",
                    free:true,
                    mp3:"http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/Miaow-03-Lentement.ogg"
                },
                {
                    title:"Lismore",
                    mp3:"http://www.jplayer.org/audio/mp3/Miaow-04-Lismore.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/Miaow-04-Lismore.ogg"
                },
                {
                    title:"The Separation",
                    mp3:"http://www.jplayer.org/audio/mp3/Miaow-05-The-separation.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/Miaow-05-The-separation.ogg"
                },
                {
                    title:"Partir",
                    free: true,
                    mp3:"http://www.jplayer.org/audio/mp3/Miaow-09-Partir.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/Miaow-09-Partir.ogg"
                },
                {
                    title:"Thin Ice",
                    mp3:"http://www.jplayer.org/audio/mp3/Miaow-10-Thin-ice.mp3",
                    oga:"http://www.jplayer.org/audio/ogg/Miaow-10-Thin-ice.ogg"
                }
            ], {
                swfPath: "../../dist/jplayer",
                supplied: "oga, mp3",
                wmode: "window",
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: true,
                keyEnabled: true
            });
            
            var cur_title = $('.current-track').find('p');
            cur_title.append(a_playlist.playlist[a_playlist.current].title);
            $(".kopa-jp-jplayer4").bind($.jPlayer.event.play, function(event) {
                cur_title.empty();
                cur_title.append(a_playlist.playlist[a_playlist.current].title);
            });

            var jp_list = $('.kopa-jp-wrap4').find('.jp-playlist');

            jp_list.mCustomScrollbar();
        }
    }]);
}


if ($('.jp-jplayer-single-1').length > 0) {

    Modernizr.load([{
        load: ['/javascripts/jquery.jplayer.min.js'],
        complete: function () {
            
            $(".jp-jplayer-single-1").jPlayer({
                ready: function (event) {
                    $(this).jPlayer("setMedia", {
                        title: "Bubble",
                        m4a: "http://jplayer.org/audio/m4a/Miaow-07-Bubble.m4a",
                        oga: "http://jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
                    });
                },
                swfPath: "../../dist/jplayer",
                supplied: "m4a, oga",
                cssSelectorAncestor: ".jp-audio-single1",
                wmode: "window",
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: true,
                keyEnabled: true,
                remainingDuration: true,
                toggleDuration: true
            });

        }
    }]);
}

if ($('.jp-jplayer-single-2').length > 0) {

    Modernizr.load([{
        load: ['/javascripts/jquery.jplayer.min.js'],
        complete: function () {
            
            $(".jp-jplayer-single-2").jPlayer({
                ready: function (event) {
                    $(this).jPlayer("setMedia", {
                        title: "Bubble",
                        m4a: "http://jplayer.org/audio/m4a/Miaow-07-Bubble.m4a",
                        oga: "http://jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
                    });
                },
                swfPath: "../../dist/jplayer",
                supplied: "m4a, oga",
                cssSelectorAncestor: ".jp-audio-single2",
                wmode: "window",
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: true,
                keyEnabled: true,
                remainingDuration: true,
                toggleDuration: true
            });

        }
    }]);
}

if ($('.jp-jplayer-single-3').length > 0) {

    Modernizr.load([{
        load: ['/javascripts/jquery.jplayer.min.js'],
        complete: function () {
            
            $(".jp-jplayer-single-3").jPlayer({
                ready: function (event) {
                    $(this).jPlayer("setMedia", {
                        title: "Bubble",
                        m4a: "http://jplayer.org/audio/m4a/Miaow-07-Bubble.m4a",
                        oga: "http://jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
                    });
                },
                swfPath: "../../dist/jplayer",
                supplied: "m4a, oga",
                cssSelectorAncestor: ".jp-audio-single3",
                wmode: "window",
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: true,
                keyEnabled: true,
                remainingDuration: true,
                toggleDuration: true
            });

        }
    }]);
}


if ($('.kopa-jp-jplayer-video').length > 0) {

    Modernizr.load([{
        load: ['/javascripts/jquery.jplayer.min.js'],
        complete: function () {
            
            $(".kopa-jp-jplayer-video").jPlayer({
                ready: function () {
                    $(this).jPlayer("setMedia", {
                        title: "Big Buck Bunny",
                        m4v: "http://www.jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v",
                        ogv: "http://www.jplayer.org/video/ogv/Big_Buck_Bunny_Trailer.ogv",
                        webmv: "http://www.jplayer.org/video/webm/Big_Buck_Bunny_Trailer.webm",
                        poster: "http://www.jplayer.org/video/poster/Big_Buck_Bunny_Trailer_480x270.png"
                    });
                },
                swfPath: "../../dist/jplayer",
                supplied: "webmv, ogv, m4v",
                size: {
                    width: "715px",
                    height: "370px",
                    cssClass: "jp-video-360p"
                },
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: true,
                keyEnabled: true,
                remainingDuration: true,
                toggleDuration: true
            });
        }
    }]);
}


/* ============================================
15. Match height
=============================================== */
if ($('.kopa-featured-audio-widget').length > 0) {

    Modernizr.load([{
        load: ['/javascripts/jquery.matchHeight-min.js'],
        complete: function () {

            var post_1 = $('.kopa-featured-audio-widget').find(".outer");
            
            post_1.each(function() {
                $(this).children('div').matchHeight();
            });
        }
    }]);

};

if ($('.kopa-album-list').length > 0) {

    Modernizr.load([{
        load: ['/javascripts/jquery.matchHeight-min.js'],
        complete: function () {

            var post_2 = $('.kopa-album-list');
            
            post_2.each(function() {
                $(this).children('li').matchHeight();
            });
        }
    }]);

};

if ($('.audio-list').length > 0) {

    Modernizr.load([{
        load: ['/javascripts/jquery.matchHeight-min.js'],
        complete: function () {

            var post_3 = $('.audio-list');
            
            post_3.each(function() {
                $(this).children('li').matchHeight();
            });
        }
    }]);

};

if ($('.article-list-2').length > 0) {
    
    Modernizr.load([{
        load: ['/javascripts/jquery.matchHeight-min.js'],
        complete: function () {

            var post_1 = $('.article-list-2').children("ul");
            
            post_1.each(function() {
                $(this).children('li').matchHeight();
            });
        }
    }]);

};


/* ============================================
16. Countdown
=============================================== */

if ($('.kopa-countdown').length > 0) {
    Modernizr.load([{
        load: ['/javascripts/countdown.js'],
        complete: function () {

            
          var nextYear = new Date(new Date().getFullYear() + 1, 0, 0, 0, 0, 0, 0);
          $('.kopa-countdown').countdown('2015/05/01 10:25:00', function(event) {
            var $this = $(this).html(event.strftime(''
                +'<li><h3>%D</h3><span>days</span></li>'
                +'<li><h3>%H</h3><span>hours</span></li>'
                +'<li><h3>%M</h3><span>mins</span></li>'
                +'<li><h3>%S</h3><span>secs</span></li>'));
          });

        }
    }]);
};

if ($('.kopa-countdown-2').length > 0) {
    Modernizr.load([{
        load: ['/javascripts/countdown.js'],
        complete: function () {

            
          var nextYear = new Date(new Date().getFullYear() + 1, 0, 0, 0, 0, 0, 0);
          $('.kopa-countdown-2').countdown('2015/05/01 10:25:00', function(event) {
            var $this = $(this).html(event.strftime(''
                +'<li><h3>%D</h3><span>days</span></li>'
                +'<li><h3>%H</h3><span>hours</span></li>'
                +'<li><h3>%M</h3><span>mins</span></li>'
                +'<li><h3>%S</h3><span>secs</span></li>'));
          });

        }
    }]);
};



/* ============================================
17. ScrollBar
=============================================== */
if (jQuery('.kopa-audio-list-2-widget .audio-list-wrapper').length > 0) {

    Modernizr.load([
      {
        load: '/javascripts/jquery.mCustomScrollbar.concat.min.js',
        complete: function () {
            jQuery('.kopa-audio-list-2-widget .audio-list-wrapper').mCustomScrollbar();
        }
      }
    ]);
};

/* =========================================================
18. Video wrapper
============================================================ */
if (jQuery(".video-wrapper").length > 0) {
    Modernizr.load([{
        load: '/javascripts/fitvids.js',
        complete: function () {
            jQuery(".video-wrapper").fitVids();
        }
    }]);
};