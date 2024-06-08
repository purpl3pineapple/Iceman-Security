/**
 * Source: {@link https://codepen.io/levinunnink-the-bashful/pen/YzxPyoG?editors=0010}
 */
window.addEventListener("load", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const action = e.target.action;
    const body = new FormData(form);

    fetch(action, {
      method: "POST",
      cache: "no-cache",
      mode: "cors",
      body,
    })
      .then(async result => {
        if (result.ok) {
          alert("Your request was successfully submitted!");
        } else {
          throw new Error("Bad network response");
        }
      })
      .catch(e => console.log({ POST_ERROR: e.message }));
  });
});
