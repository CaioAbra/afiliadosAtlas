// carousel
$(document).ready(function () {
    var itemWidth = $(".carousel-items .item").outerWidth(true);
    var itemCount = $(".carousel-items .item").length;
    var windowWidth = $(window).width();
    var visibleItems = 3;
    var responsiveThreshold1 = 500;
    var responsiveThreshold2 = 768;

    function generateDots() {
        for (var i = 0; i < itemCount; i++) {
            $(".carousel-dots").append('<div class="dot" data-index="' + i + '"></div>');
        }
        $(".carousel-dots .dot:first-child").addClass("active");
    }

    function updateActiveItem() {
        var activeIndex = Math.floor($(".carousel-items").scrollLeft() / itemWidth) % itemCount;

        $(".carousel-items .item").removeClass("active");
        $(".carousel-items .item").eq(activeIndex).addClass("active");

        $(".carousel-dots .dot").removeClass("active");
        $(".carousel-dots .dot").eq(activeIndex).addClass("active");
    }

    function moveCarousel(direction) {
        if (direction === "next") {
            $(".carousel-items").animate(
                { scrollLeft: "+=" + itemWidth },
                500,
                function () {
                    $(".carousel-items .item:first").appendTo(".carousel-items");
                    $(".carousel-items").scrollLeft(0);
                    updateActiveItem();
                }
            );
        } else {
            $(".carousel-items").animate(
                { scrollLeft: "-=" + itemWidth },
                500,
                function () {
                    $(".carousel-items .item:last").prependTo(".carousel-items");
                    $(".carousel-items").scrollLeft(itemWidth);
                    updateActiveItem();
                }
            );
        }
    }

    function adjustCarousel() {
        if (windowWidth <= responsiveThreshold1) {
            visibleItems = 1;
        } else if (windowWidth <= responsiveThreshold2) {
            visibleItems = 2;
        } else {
            visibleItems = 3;
        }

        itemWidth = $(".carousel-items .item").outerWidth(true);
        $(".carousel-items").width(itemWidth * itemCount);
        $(".carousel-items").scrollLeft(0);
        updateActiveItem();
    }

    generateDots();
    adjustCarousel();

    $(window).resize(function () {
        adjustCarousel();
    });

    $(".slider-prev").click(function () {
        moveCarousel("prev");
    });

    $(".slider-next").click(function () {
        moveCarousel("next");
    });

    $(".carousel-dots .dot").click(function () {
        var index = $(this).index();
        var activeIndex = $(".carousel-items .item.active").index();

        if (index !== activeIndex) {
            var difference = index - activeIndex;
            var direction = difference > 0 ? "next" : "prev";

            for (var i = 0; i < Math.abs(difference); i++) {
                moveCarousel(direction);
            }
        }
    });
});

