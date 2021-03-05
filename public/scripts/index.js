const URL = location.origin; // root domain

// redirects
$("#go-p0").on("click", e => {
    window.location.assign(`${URL}/pages/p0.html`);
});

$("#det-p0").on("click", e => {
    window.location.assign(`${URL}/pages/p0_Details.html`);
});

$("#src-p0").on("click", e => {
    window.location.assign(`${URL}/pages/p0_Source.html`);
});

$("#go-p1").on("click", e => {
    window.location.assign(`${URL}/pages/p1.html`);
});

$("#det-p1").on("click", e => {
    window.location.assign(`${URL}/pages/p1_Details.html`);
});

$("#src-p1").on("click", e => {
    window.location.assign(`${URL}/pages/p1_Source.html`);
});
