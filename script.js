document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
});

window.onload = function () {
  const repcard = document.getElementById("listarepositorios");

  fetch("https://api.github.com/users/yFoNtt/repos")
    .then((response) => {
      if (!response.ok) {
        console.log("Erro ao tentar conexão com o GitHub");
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((repo) => {
        const card = document.createElement("div");
        card.classList.add("card");
        const html = `
                    <h4>${repo.name}</h4>
                    <p>${repo.description || "Sem descrição"}</p>
                    <a href="${repo.html_url}" target="_blank">Ver no GitHub</a>
                `;
        card.innerHTML = html;
        repcard.appendChild(card);
      });
    })
    .catch((error) => console.error("Erro:", error));
};
