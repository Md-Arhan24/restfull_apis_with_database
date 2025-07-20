let ele = document.querySelector("#edit");

ele.addEventListener("click", (e) => {
  let ele2 = document.querySelector(".form");

  ele2.style.display = "block";
});

let e = document.querySelector("#cancel-btn");
e.addEventListener("click", () => {
  let ele2 = document.querySelector(".form");
  ele2.style.display = "none";
});

let deleteBtn = document.querySelector('#del-user');
deleteBtn.addEventListener('click',() => {
  let ele2 = document.querySelector(".deleteForm");

  ele2.style.display = "block";
})
let cancel = document.querySelector(".cancel");
cancel.addEventListener("click", () => {
  let ele2 = document.querySelector(".form");
  ele2.style.display = "none";
});