const input = document.querySelector("#input");
const btn = document.querySelector("#btn");
const loading = document.querySelector("#loading");

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

btn.addEventListener("click", (e) => {
  e.preventDefault();
  let url = `https://api.github.com/users/${input.value}`;
  if (input.value) {
    loading.style.display = "block";
    setTimeout(() => {
      getUserDetails(url);
    }, 2000);
  } else {
    input.value = "Please enter a user first";
    input.style.color = "red";
    setTimeout(() => {
      input.value = "";
      input.style.color = "var(--search-color-)";
    }, 3000);
  }

  async function postData(data) {
    loading.style.display = "none";
    profilePic.innerHTML = `
  <a  href="${data.html_url}"><img  src="${data.avatar_url}" alt="${data.login}"></a>
  `;

    name.innerHTML =
      data.name === "" || data.name === null
        ? (name.style.display = "none")
        : ((name.style.display = "block"), `${data.name}`);

    date.innerHTML = `date joined: ${data.created_at.substring(0, 10)}`;
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

    if (data.blog === "" || data.blog === null) {
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

  async function getUserDetails(api) {
    let quey = await fetch(api)
      .then(async (query) => {
        return await query.json();
      })
      .then((res) => {
        if (res.message) {
          input.value = "There is no such user";
          input.style.color = "red";
          loading.style.display = "none";
          setTimeout(() => {
            input.value = "";
            input.style.color = "var(--search-color-)";
          }, 3000);
        } else {
          postData(res);
          input.value = "";
        }
      })
      .catch((e) => console.log(e));
  }
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
