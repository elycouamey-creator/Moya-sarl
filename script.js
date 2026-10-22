
// Numéro WhatsApp de l'entreprise : format international, sans + ni espaces.
// Numéro d'essai : à remplacer par le vrai numéro.
const NUMERO_WHATSAPP = "2250000000000";

// Année automatique dans le pied de page
document.getElementById("annee").textContent = new Date().getFullYear();

// Menu sur téléphone
const boutonMenu = document.getElementById("bouton-menu");
const menu = document.getElementById("menu");

boutonMenu.addEventListener("click", function () {
  menu.classList.toggle("ouvert");
});

menu.querySelectorAll("a").forEach(function (lien) {
  lien.addEventListener("click", function () {
    menu.classList.remove("ouvert");
  });
});

// Bouton WhatsApp flottant : utilise le numéro défini plus haut
document.querySelectorAll("[data-whatsapp]").forEach(function (lien) {
  lien.href = "https://wa.me/" + NUMERO_WHATSAPP;
});

// Formulaire : ouvre WhatsApp avec un message prêt à envoyer
const formulaire = document.getElementById("formulaire");
const retour = document.getElementById("retour");

formulaire.addEventListener("submit", function (evenement) {
  evenement.preventDefault();

  const nom = document.getElementById("nom").value.trim();
  const zone = document.getElementById("zone").value;
  const demande = document.getElementById("demande").value;
  const message = document.getElementById("message").value.trim();

  const texte =
    "Bonjour MOYA SARL,\n" +
    "Nom : " + nom + "\n" +
    "Zone : " + zone + "\n" +
    "Demande : " + demande + "\n" +
    "Message : " + message;

  const lien = "https://wa.me/" + NUMERO_WHATSAPP + "?text=" + encodeURIComponent(texte);
  window.open(lien, "_blank");
  retour.textContent = "WhatsApp s'ouvre avec votre message prêt à envoyer.";
});
