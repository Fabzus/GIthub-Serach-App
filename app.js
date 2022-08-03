const input = document.querySelector("#input");
const btn = document.querySelector("#btn");

const profilePic = document.querySelector("#profilePic");
const name = document.querySelector("#name");
const date = document.querySelector("#date");
const username = document.querySelector("#username");
const bio = document.querySelector("#bio");
const repos = document.querySelector("#repos");
const followers = document.querySelector("#followers");
const following = document.querySelector("#following");

const where = document.querySelector("#where");
const twitter = document.querySelector("#twitter");
const website = document.querySelector("#website");
const company = document.querySelector("#company");

btn.addEventListener("click", () => {
  let url = `https://api.github.com/users/${input.value}`;
  async function getUrl() {
    const res = await fetch(url);
    const data = await res.json();

    profilePic.innerHTML = `
    <a  href="${data.html_url}"><img  src="${data.avatar_url}" alt="${data.login}"></a>
    `;

    name.innerHTML = `${data.name}`;
    date.innerHTML = `date joined: ${data.created_at}`;
    username.innerHTML = `@${data.login}`;

    repos.innerHTML = `${data.public_repos}`;
    followers.innerHTML = `${data.followers}`;
    following.innerHTML = `${data.following}`;

    bio.innerHTML =
      data.bio === "" || data.bio === null
        ? "This profile has no bio"
        : data.bio;

    if (data.location === " " || data.location === null) {
      where.innerHTML = "No location";
    } else {
      where.innerHTML = data.location;

      where.style.fontWeight = "700";
    }

    if (data.twitter_username === " " || data.twitter_username === null) {
      twitter.innerHTML = "No twitter";
    } else {
      twitter.innerHTML = data.twitter_username;

      twitter.style.fontWeight = "700";
    }

    if (data.blog === " " || data.blog === null) {
      website.innerHTML = "No website";
    } else {
      website.innerHTML = data.blog;

      website.style.fontWeight = "700";
    }

    if (data.company === " " || data.company === null) {
      company.innerHTML = "No location";
    } else {
      company.innerHTML = data.company;
      company.style.fontWeight = "700";
    }
  }
  getUrl();
  input.value = "";
});

const toggle = function (e) {
  if (e.currentTarget.classList.contains("light--hidden")) {
    document.documentElement.setAttribute("color-mode", "dark");
    localStorage.setItem("color-mode", "dark");
    return;
  }
  document.documentElement.setAttribute("color-mode", "light");
  localStorage.setItem("color-mode", "light");
};

const toggleTheme = document.querySelectorAll(".theme-btn");
toggleTheme.forEach((btn) => {
  btn.addEventListener("click", toggle);
});
