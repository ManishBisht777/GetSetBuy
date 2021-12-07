const signupbtn = document.querySelector(".signupbtn");
const signinbtn = document.querySelector(".signinbtn");
const form = document.querySelector(".form");
const sameform = document.querySelector(".sameform");

signupbtn.onclick = function () {
  form.classList.add("active");
  sameform.classList.add("active2");
};

signinbtn.onclick = function () {
  form.classList.remove("active");
  sameform.classList.remove("active2");
};
