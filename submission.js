let CAPTCHA = null;
const captcha_success = document.getElementById("captcha-success");
const captcha_failed = document.getElementById("captcha-failed");

async function recaptcha_validated() {
  CAPTCHA = true;
  captcha_success.classList.remove("d-none");
  captcha_failed.classList.add("d-none");
  setTimeout(recaptcha_expired, 120_000);
}

function recaptcha_failed() {
  CAPTCHA = false;
  captcha_failed.innerHTML = "recaptcha failed";
  captcha_failed.classList.remove("d-none");
  captcha_success.classList.add("d-none");
}

function recaptcha_expired() {
  CAPTCHA = null;
  captcha_success.classList.add("d-none");
  captcha_failed.classList.add("d-none");
}

/**
 * Source: {@link https://codepen.io/levinunnink-the-bashful/pen/YzxPyoG?editors=0010}
 */
window.addEventListener("load", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", e => {
    e.preventDefault();
    if (CAPTCHA === null) {
      captcha_failed.innerHTML = "Please complete the recaptcha.";
      captcha_failed.classList.remove("d-none");

      setTimeout(() => {
        captcha_failed.classList.add("d-none");
      }, 5000);
      return;
    }
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
          location.reload();
        } else {
          throw new Error("Bad network response");
        }
      })
      .catch(e => console.log({ POST_ERROR: e.message }));
  });
});
