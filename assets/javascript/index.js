$(document).ready(function () {
    var itemWidth = $(".carousel-items .item").outerWidth(true);
    var itemCount = $(".carousel-items .item").length;
    var windowWidth = $(window).width();
    var visibleItems = 3;
    var responsiveThreshold1 = 500;
    var responsiveThreshold2 = 768;
    var currentIndex = 0;

    function generateDots() {
        for (var i = 0; i < itemCount; i++) {
            $(".carousel-dots").append('<div class="dot" data-index="' + i + '"></div>');
        }
        $(".carousel-dots .dot:first-child").addClass("active");
    }

    function updateActiveItem() {
        $(".carousel-items .item").removeClass("active");
        $(".carousel-items .item").eq(currentIndex).addClass("active");

        $(".carousel-dots .dot").removeClass("active");
        $(".carousel-dots .dot").eq(currentIndex).addClass("active");
    }

    function moveCarousel(direction) {
        if (direction === "next") {
            currentIndex = (currentIndex + 1) % itemCount;
            $(".carousel-items").animate(
                { left: -itemWidth },
                500,
                function () {
                    $(".carousel-items .item:first").appendTo(".carousel-items");
                    $(".carousel-items").css("left", 0);
                    updateActiveItem();
                }
            );
        } else {
            currentIndex = (currentIndex - 1 + itemCount) % itemCount;
            $(".carousel-items .item:last").prependTo(".carousel-items");
            $(".carousel-items").css("left", -itemWidth);
            $(".carousel-items").animate(
                { left: 0 },
                500,
                function () {
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
        var index = $(this).data("index");
        var direction = index > currentIndex ? "next" : "prev";

        while (index !== currentIndex) {
            moveCarousel(direction);
        }
    });
});
