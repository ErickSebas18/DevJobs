const container = document.querySelector(".jobs-listings");

container.addEventListener("click", (event) => {
  const element = event.target;

  if (element.classList.contains("button-apply-job")) {
    element.textContent = "¡Aplicado!";
    element.classList.add("is-applied");
    console.log(element);
    element.disabled = true;
  }
});

const filter_tech = document.querySelector("#filter-technology");
const jobs = document.querySelector("#filter-location");

filter_tech.addEventListener("change", () => {
  const articles = document.querySelectorAll(".job-listing-card");
  articles.forEach((article) => {
    const p = article.querySelector("p").textContent.toLowerCase();
    if (p.includes(filter_tech.value)) {
      article.classList.remove("hidden");
    } else {
      article.classList.add("hidden");
    }
  });
});

jobs.addEventListener("change", () => {
  const articles = document.querySelectorAll(".job-listing-card");
  articles.forEach((job) => {
    //const l = job.dataset.ubicacion;
    const l = job.getAttribute("data-modalidad");
    if (jobs.value === "" || jobs.value === l) {
      job.style.display = "flex";
    } else {
      job.style.display = "none";
    }
  });
});

// ---> Fetch es asíncrono
// Se está creando una promesa (Promise)
fetch("./data.json")
  .then((res) => {
    return res.json();
  })
  .then((jobs) => {
    jobs.forEach((job) => {
      const article = document.createElement("article");
      article.className = "job-listing-card";
      article.dataset.modalidad = job.data.modalidad;
      article.dataset.nivel = job.data.nivel;
      article.dataset.technology = job.data.technology;

      article.innerHTML = `<div>
          <h3>${job.titulo}</h3>
          <small>${job.empresa} | ${job.ubicacion}</small>
          <p>${job.descripcion}</p>
        </div>
        <button class="button-apply-job">Aplicar</button>`;

      container.appendChild(article);
    });
  });
