/**
 * Source: {@link https://codepen.io/levinunnink-the-bashful/pen/YzxPyoG?editors=0010}
 */
window.addEventListener("load", function () {
  const form = document.querySelector("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
      method: "POST",
      body: data,
    }).then(() => {
      alert("Success!");
    });
  });
});
