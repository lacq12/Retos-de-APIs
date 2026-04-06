const API_KEY = "ab455107d9d64e8085381bcbd2570100"; 

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const container = document.getElementById("news-container");

let page = 1;
const pageSize = 5;
let currentQuery = "";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  currentQuery = input.value.trim();
  buscarNoticias();
});

document.getElementById("next").addEventListener("click", () => {
  page++;
  buscarNoticias();
});

document.getElementById("prev").addEventListener("click", () => {
  if (page > 1) {
    page--;
    buscarNoticias();
  }
});

function buscarNoticias() {
  container.innerHTML = "🔄 Cargando noticias...";

  fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(currentQuery)}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      console.log(data); // 👈 MUY IMPORTANTE PARA DEPURAR

      if (data.status !== "ok") {
        container.innerHTML = "❌ Error con la API: " + data.message;
        return;
      }

      mostrarNoticias(data.articles);
    })
    .catch(error => {
      container.innerHTML = "❌ Error de conexión.";
      console.error(error);
    });
}

function mostrarNoticias(noticias) {
  container.innerHTML = "";

  if (!noticias || noticias.length === 0) {
    container.innerHTML = "No se encontraron noticias.";
    return;
  }

  noticias.forEach(noticia => {
    const div = document.createElement("div");
    div.classList.add("news");

    div.innerHTML = `
      <h3>${noticia.title}</h3>
      <p>${noticia.description || "Sin descripción"}</p>
      <small>Fuente: ${noticia.source.name}</small>
    `;

    container.appendChild(div);
  });
}
