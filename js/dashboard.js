document.querySelectorAll(".sidebar button").forEach(btn => {
  btn.addEventListener("click", () => {
    alert(`You clicked ${btn.innerText}`);
  });
});
