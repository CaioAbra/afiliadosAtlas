// carousel
$(document).ready(function () {
    var itemWidth = $(".carousel-items .item").outerWidth(true);

    var itemCount = $(".carousel-items .item").length;
    var windowWidth = $(window).width();
    var visibleItems = 3; // Número de itens visíveis
    var responsiveThreshold1 = 500; // Limite de largura para dispositivos até 500px
    var responsiveThreshold2 = 768; // Limite de largura para dispositivos de 501px a 767px

    function moveCarousel(direction) {
        var currentPosition = parseInt($(".carousel-items").css("left"));
        var newPosition;

        if (direction === "next") {
            newPosition = currentPosition - itemWidth;
            $(".carousel-items").animate(
                { left: newPosition },
                500,
                function () {
                    $(".carousel-items .item:first").appendTo(".carousel-items");
                    $(".carousel-items").css("left", 0);
                    updateActiveItem();
                }
            );
        } else {
            newPosition = currentPosition + itemWidth;
            $(".carousel-items").animate(
                { left: newPosition },
                500,
                function () {
                    $(".carousel-items .item:last").prependTo(".carousel-items");
                    $(".carousel-items").css("left", -itemWidth);
                    updateActiveItem();
                }
            );
        }
    }

    function updateActiveItem() {
        $(".carousel-items .item").removeClass("active");
        var activeItemIndex = Math.floor(visibleItems / 2);
        $(".carousel-items .item:nth-child(" + (activeItemIndex + 1) + ")").addClass("active");
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
        $(".carousel-items").width(itemWidth*itemCount);
        updateActiveItem();
    }

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
});

