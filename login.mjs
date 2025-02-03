//
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    if (username === "havoyuli" && password === "havo123yuli") {
      window.location.href = "dashboard.html";
    } else {
      alert("Login yoki parol noto'g'ri!");
    }
  });
