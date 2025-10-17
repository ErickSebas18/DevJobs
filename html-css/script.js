const buttonsListingSection = document.querySelector(".jobs-listings");

buttonsListingSection.addEventListener("click", (event) => {
  const element = event.target;

  if (element.classList.contains("button-apply-job")) {
    element.textContent = "¡Aplicado!";
    element.classList.add("is-applied");
    console.log(element);
    element.disabled = true;
  }
});

const filter_tech = document.querySelector("#filter-technology");
const articles = document.querySelectorAll(".job-listing-card");
const jobs = document.querySelector("#filter-location");

filter_tech.addEventListener("change", () => {
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
  articles.forEach((job) => {
    //const l = job.dataset.ubicacion;
    const l = job.getAttribute("data-ubicacion");
    if (jobs.value === "" || jobs.value === l) {
      job.style.display = "flex";
    } else {
      job.style.display = "none";
    }
  });
});

// ---> Fetch es asíncrono

fetch("./data.json")
  .then((res) => {
    return res.json();
  })
  .then((jobs) => {
    console.log(jobs);
  });
