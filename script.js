document.addEventListener("DOMContentLoaded", function () {
    const cardContainer = document.querySelector(".card-container");
    const cards = document.querySelectorAll(".card");
    let isMouseDown = false;
    let startX;
    let scrollLeft;



        // Add event listeners for mouseenter and mouseleave to each card
        cards.forEach((card) => {
            card.addEventListener("mouseenter", () => {
                card.style.transform = "scale(1.2)";
                card.style.zIndex = "2";
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "scale(1)";
                card.style.zIndex = "0";
            });
        });

        function updateScrollPosition(e) {
            if (!isMouseDown) return;
            const x = e.pageX - cardContainer.offsetLeft;
            cardContainer.scrollLeft = scrollLeft - (x - startX);
            requestAnimationFrame(() => updateScrollPosition(e));
        }

        cardContainer.addEventListener("mousedown", (e) => {
            isMouseDown = true;
            startX = e.pageX - cardContainer.offsetLeft;
            scrollLeft = cardContainer.scrollLeft;
            cardContainer.style.cursor = "grabbing";
            cards.forEach((card) => card.classList.add("no-select")); // Add no-select class
            requestAnimationFrame(() => updateScrollPosition(e));
        });

        cardContainer.addEventListener("mouseup", () => {
            isMouseDown = false;
            cardContainer.style.cursor = "grab";
            cards.forEach((card) => card.classList.remove("no-select")); // Remove no-select class
        });

        cardContainer.addEventListener("mousemove", (e) => {
            e.preventDefault();
            if (!isMouseDown) return;
            updateScrollPosition(e);
        });

        cardContainer.addEventListener("mouseleave", () => {
            isMouseDown = false;
            cardContainer.style.cursor = "grab";
            cards.forEach((card) => card.classList.remove("no-select")); // Remove no-select class
        });
    });