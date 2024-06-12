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

function addSubmission(e, body) {
  e.preventDefault();
  if (CAPTCHA === null) {
    captcha_failed.innerHTML = "Please complete the recaptcha.";
    captcha_failed.classList.remove("d-none");

    setTimeout(() => {
      captcha_failed.classList.add("d-none");
    }, 5000);
    return;
  }

  const empty = [...body.entries()].filter(([, entry]) => !entry);
  const emptyKeys = empty.map(([key]) => key);

  if (empty.length) {
    alert(`Please fill in:\n${emptyKeys.join("\n")}`);
    return;
  }

  fetch(e.target.action, {
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
}

window.addEventListener("load", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", e => addSubmission(e, new FormData(form)));
});
