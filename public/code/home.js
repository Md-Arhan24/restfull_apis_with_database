let adduserbtn = document.querySelector('#newUserBtn');


adduserbtn.addEventListener("click", (e) => {
  let ele2 = document.querySelector(".form");

  ele2.style.display = "block";
});

let e = document.querySelector("#cancel-btn");
e.addEventListener("click", () => {
  let ele2 = document.querySelector(".form");
  ele2.style.display = "none";
});
