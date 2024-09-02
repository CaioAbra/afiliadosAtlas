// carousel
$(document).ready(function () {
    var itemWidth;
    var itemCount = $(".carousel-items .item").length;
    var visibleItems = 3; // Número de itens visíveis
    var responsiveThreshold1 = 500; // Limite de largura para dispositivos até 500px
    var responsiveThreshold2 = 768; // Limite de largura para dispositivos de 501px a 767px

    // Gerar os dots de acordo com o número de itens
    function generateDots() {
        for (var i = 0; i < itemCount; i++) {
            $(".carousel-dots").append('<div class="dot" data-index="' + i + '"></div>');
        }
        $(".carousel-dots .dot:first-child").addClass("active");
    }

    function updateActiveItem() {
        var activeIndex = $(".carousel-items .item.active").index();
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
        var windowWidth = $(window).width();

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

    updateActiveItem();
});
