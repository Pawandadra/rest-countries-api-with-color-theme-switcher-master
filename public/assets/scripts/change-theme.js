const themeBtn = document.getElementById("themeContainer");
const themeMode = document.getElementById("theme");

// Check localStorage for the saved theme and apply it
if (localStorage.getItem("theme") == "dark") {
    themeMode.href = "./assets/styles/dark-mode.css";
} else {
    themeMode.href = "./assets/styles/light-mode.css";
}

themeBtn.addEventListener("click", () => {
    if (themeMode.href.endsWith("light-mode.css")) {
        themeMode.href = "./assets/styles/dark-mode.css";
        localStorage.setItem("theme", "dark");
    } else {
        themeMode.href = "./assets/styles/light-mode.css";
        localStorage.setItem("theme", "light");
    }
});