/*
 Author: Ukieweb
 Template: ukieCard
 Version: 1.8.1
 URL: http://themeforest.net/user/UkieWeb
 */

$(document).ready(function () {

    "use strict";

    /*
     ----------------------------------------------------------------------
     Menu-navigation
     ----------------------------------------------------------------------
     */
    if ($("#contents").hasClass("contents")) {
        jQuery(function ($) {

            $(document).ready(function () {
                $('.navbar-wrapper').stickUp({
                    parts: {
                        0: 'navhome',
                        1: 'navprofile',
                        2: 'navresume',
                        3: 'navportfolio',
                        4: 'navblog',
                        5: 'navcontact'
                    },
                    itemClass: 'menuItem',
                    itemHover: 'active',
                    topMargin: 'auto'
                });
            });

        });
    }

    $('.navigation-top').hide();
    $(function () {
        $(window).scroll(function (event) {
            if ($(this).scrollTop() > 630) {
                $('.navigation-top').show();
                $('.navigation-top').fadeIn();
                $('.navigation-top').addClass('fixed');
            }
            else {
                $('.navigation-top').removeClass('fixed');
                $('.navigation-top').fadeOut();
                $('.navigation-top').hide();
            }
        });

    });


    var linkNav = document.querySelectorAll('[href^="#nav"]'),
        V = 1000;
    for (var i = 0; i < linkNav.length; i++) {
        linkNav[i].onclick = function (event) {
            event.preventDefault();
            if($(window).width() < 769) {
                var hscroll = 0
            } else {
                var hscroll = 50
            }
            var id  = $(this).attr('href'),
                top = $(id).offset().top;
            $('body,html').animate({scrollTop: top - hscroll}, V);
        }
    }

    /*
     ----------------------------------------------------------------------
     Animated menu
     ----------------------------------------------------------------------
     */


    $(".menu .menu-img").on({
        mouseenter: function () {
            var $div = $(this);
            var img = document.createElement('img');
            var img_name = $div.attr("data-img-name");
            img.src = "/homepage/assets/img/menu/" + img_name + ".gif?t=" + new Date().getTime();
            console.log(img_name)
            $(img).load(function () {
                $div.attr("src", img.src);
            });
        },
        mouseleave: function () {
            var $div = $(this);
            var img_name = $div.attr("data-img-name");
            var src = "/homepage/assets/img/menu/" + img_name + ".png";
            $div.attr("src", src);

        }
    });


    /*
     ----------------------------------------------------------------------
     Preloader
     ----------------------------------------------------------------------
     */

    $(".loader").delay(400).fadeOut();
    $(".animationload").delay(400).fadeOut("fast");


    /*
     ----------------------------------------------------------------------
     Scroll
     ----------------------------------------------------------------------
     */
    //Check to see if the window is top if not then display button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 400) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });
    //Click event to scroll to top
    $('.scrollToTop').on('click', function () {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });


    /*
     ----------------------------------------------------------------------
     Animation
     ----------------------------------------------------------------------
     */
    $('.animated').appear(function () {
        var elem = $(this);
        var animation = elem.data('animation');
        if (!elem.hasClass('visible')) {
            var animationDelay = elem.data('animation-delay');
            if (animationDelay) {
                setTimeout(function () {
                    elem.addClass(animation + " visible");
                }, animationDelay);
            } else {
                elem.addClass(animation + " visible");
            }
        }
    });

    /*
     ----------------------------------------------------------------------
     Progress Bars
     ----------------------------------------------------------------------
     */
    $('.progress-bar').on('inview', function (event, isInView) {
        if (isInView) {
            $(this).css('width', function () {
                return ($(this).attr('aria-valuenow') + '%');
            });
        }
    });


    $('.dial').on('inview', function (event, isInView) {
        if (isInView) {
            var $this = $(this);
            var myVal = $this.attr("value");
            //var color = $this.attr("data-color"); // Uncomment after color selection
            var color = $.cookie("colour-skills"); // Delete after color selection
            $this.knob({
                readOnly: true,
                width: 160,
                height: 160,
                rotation: 'clockwise',
                thickness: .3,
                inputColor: color,
                bgColor: '#ffffff',
                fgColor: color,
                'draw': function () {
                    $(this.i).val(this.cv + '%')
                }
            });
            $({
                value: 0
            }).animate({
                value: myVal
            }, {
                duration: 1000,
                easing: 'swing',
                step: function () {
                    $this.val(Math.ceil(this.value)).trigger('change');
                }
            });
        }
        $(this).unbind(event);

    });

    /*
     ----------------------------------------------------------------------
     Sliders
     ----------------------------------------------------------------------
     */
    $("#education-slider").owlCarousel({

        navigation: true, // Show next and prev buttons
        navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        pagination: false,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
    });

    $("#work-slider").owlCarousel({

        navigation: true, // Show next and prev buttons
        navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        pagination: false,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true

    });

    /*--------- Clients slider -------------*/
    var owl = $("#owl-clients");

    owl.owlCarousel({
        itemsCustom: [
            [0, 1],
            [450, 1],
            [600, 2],
            [700, 2],
            [991, 3],
            [1200, 4],
            [1400, 4],
            [1600, 4]
        ],
        navigation: true,
        navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']
    });

    $('.owl-pagination').fadeOut();

    /*--------- Testimonials slider -------------*/

    $('.flexslider').flexslider({
        animation: "fade",
        slideshow: false
    });


    /*
     ----------------------------------------------------------------------
     Animated Counter
     ----------------------------------------------------------------------
     */
    $('.count').each(function () {
        $(".total-numbers .sum").appear(function () {
            var counter = $(this).html();
            $(this).countTo({
                from: 0,
                to: counter,
                speed: 2000,
                refreshInterval: 60
            });
        });
    });

}); // End $(document).ready(function(){
