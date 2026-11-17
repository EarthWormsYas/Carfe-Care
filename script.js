const siteHeader = document.querySelector(".site-header");

let previousScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    const currentScrollY = Math.max(0, window.scrollY);
    if (Math.abs(currentScrollY - previousScrollY) < 4) return;

    if (currentScrollY === 0 || currentScrollY < previousScrollY) {
        siteHeader.classList.remove("is-hidden");
    } else {
        siteHeader.classList.add("is-hidden");
    }

    previousScrollY = currentScrollY;
}, { passive: true });
