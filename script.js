let pages = 1;
let name = "";
let page = "";
let nameFilter = "";
const numPage = document.getElementById("numPage");
const error = document.querySelector(".error");

function fetchApi() {
  fetch("https://rickandmortyapi.com/api/character/" + nameFilter + page)
    .then((response) => {
      if (!response.ok) {
        error.style.display = "block";
      } else {
        error.style.display = "";
      }
      return response.json();
    })
    .then((data) => {
      const character = data.results;

      const content = document.querySelector(".content");

      while (content.firstChild) {
        content.removeChild(content.firstChild);
      }

      character.map((item) => {
        const card = document.createElement("div");
        card.setAttribute("id", item.id);
        card.setAttribute("class", "card");
        content.appendChild(card);

        const contentImg = document.createElement("div");
        contentImg.setAttribute("class", "contentImg");
        card.appendChild(contentImg);

        const img = document.createElement("img");
        img.setAttribute("alt", item.name);
        img.setAttribute("src", item.image);
        contentImg.appendChild(img);

        if (item.status == "Dead") {
          const imgDead = document.createElement("img");
          imgDead.setAttribute("class", "deadImg");
          imgDead.setAttribute("src", "./img/morto.png");
          contentImg.appendChild(imgDead);

          img.setAttribute("class", "dead");
        }

        const inf = document.createElement("div");
        inf.setAttribute("class", "inf");
        card.appendChild(inf);

        const name = document.createElement("h2");
        name.innerText = item.name;
        inf.appendChild(name);

        const p = document.createElement("p");
        p.innerText = "Species: " + item.species;
        inf.appendChild(p);

        const gender = document.createElement("p");
        gender.innerText = "Gender: " + item.gender;
        inf.appendChild(gender);

        const origin = document.createElement("p");
        origin.innerText = "Origin: " + item.origin.name;
        inf.appendChild(origin);
      });
    });

  numPage.innerText = `Page: ${pages}`;
}

function previous() {
  if (pages > 1) {
    pages--;

    page = "?page=" + pages;
  }
  window.scrollTo(0, 100);

  nameFilter = "";
  fetchApi();
}

function next() {
  if (pages < 42) {
    pages++;
    page = "?page=" + pages;
  }

  window.scrollTo(0, 100);

  nameFilter = "";

  fetchApi();
}

function filter() {
  const userFilter = document.getElementById("textFilter").value;
  nameFilter = "?name=" + userFilter;

  page = "";

  const display = document.querySelector(".pagination");
  display.style.visibility = "hidden";

  if (userFilter == "") {
    display.style.visibility = "visible";
  }

  fetchApi();
}

const input = document.querySelector("input");

input.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    filter();
  }
});

fetchApi();
