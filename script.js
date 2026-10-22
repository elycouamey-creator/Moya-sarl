
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
// Bouton devis : ouvre WhatsApp avec un message de départ
document.querySelectorAll("[data-devis]").forEach(function (lien) {
  const texte = "Bonjour MOYA SARL, je souhaite un devis pour : ";
  lien.href = "https://wa.me/" + NUMERO_WHATSAPP + "?text=" + encodeURIComponent(texte);
});
// Présentation animée
const presentation = document.getElementById("presentation");

if (presentation) {
  const zonesPres = presentation.querySelectorAll(".pres-zones li");
  const compteur = document.getElementById("compteur");
  const boutonRejouer = document.getElementById("rejouer");
  let minuteur;

  // Donne un numéro d'ordre à chaque ville pour les faire apparaître une à une
  zonesPres.forEach(function (li, i) {
    li.style.setProperty("--i", i);
  });

  // Compteur de localités : suit l'apparition des villes
  function compter() {
    clearInterval(minuteur);
    let n = 0;
    compteur.textContent = "0";
    setTimeout(function () {
      minuteur = setInterval(function () {
        n++;
        compteur.textContent = n;
        if (n >= zonesPres.length) {
          clearInterval(minuteur);
        }
      }, 250);
    }, 1800);
  }

  // Lance (ou relance) toute l'animation
  function lancer() {
    presentation.classList.remove("actif");
    void presentation.offsetWidth;
    presentation.classList.add("actif");
    compter();
  }

  if ("IntersectionObserver" in window) {
    const observateur = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (entree) {
        if (entree.isIntersecting) {
          lancer();
          observateur.disconnect();
        }
      });
    }, { threshold: 0.35 });
    observateur.observe(presentation);
  } else {
    lancer();
  }

  boutonRejouer.addEventListener("click", lancer);
}

