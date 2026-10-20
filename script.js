
// Année automatique dans le pied de page
document.getElementById("annee").textContent = new Date().getFullYear();

// Menu sur téléphone
const boutonMenu = document.getElementById("bouton-menu");
const menu = document.getElementById("menu");

boutonMenu.addEventListener("click", function () {
  menu.classList.toggle("ouvert");
});

// Ferme le menu quand on touche un lien
menu.querySelectorAll("a").forEach(function (lien) {
  lien.addEventListener("click", function () {
    menu.classList.remove("ouvert");
  });
});

// Formulaire de démonstration (rien n'est envoyé)
const formulaire = document.getElementById("formulaire");
const retour = document.getElementById("retour");

formulaire.addEventListener("submit", function (evenement) {
  evenement.preventDefault();
  retour.textContent = "Merci ! Ceci est une démonstration : votre message n'a pas été envoyé.";
  formulaire.reset();
});
