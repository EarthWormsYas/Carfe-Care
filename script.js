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

const menuButton = document.querySelector(".nav-toggle");
const mainNavigation = document.querySelector("#main-navigation");

if (siteHeader && menuButton && mainNavigation) {
    const closeNavigation = () => {
        menuButton.setAttribute("aria-expanded", "false");
        mainNavigation.classList.remove("is-open");
    };

    menuButton.addEventListener("click", () => {
        const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
        menuButton.setAttribute("aria-expanded", String(!isExpanded));
        mainNavigation.classList.toggle("is-open", !isExpanded);
    });

    mainNavigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeNavigation);
    });

    document.addEventListener("click", (event) => {
        if (event.target instanceof Node && !siteHeader.contains(event.target)) {
            closeNavigation();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeNavigation();
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 700) closeNavigation();
    });
}

const donationAmount = document.querySelector("#donation-amount");

if (donationAmount instanceof HTMLInputElement) {
    document.querySelectorAll("[data-amount-adjust]").forEach((button) => {
        button.addEventListener("click", () => {
            const min = Number(donationAmount.min);
            const adjustment = Number(button.dataset.amountAdjust);
            const current = donationAmount.value === "" ? min : Number(donationAmount.value);

            if (!Number.isFinite(min) || !Number.isFinite(current) || !Number.isFinite(adjustment)) return;

            const next = donationAmount.value === "" ? min : Math.max(min, current + adjustment);
            donationAmount.value = next.toFixed(2);
            donationAmount.dispatchEvent(new Event("input", { bubbles: true }));
        });
    });
}
