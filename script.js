
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
// Présentation façon pub, avec voix off
const pub = document.getElementById("pub");

if (pub) {
  const IMG_CAMIONS = "014EE513-08CF-48C5-ABB8-2A3ED34D950D.png";
  const IMG_EQUIPE = "F566A97B-F83B-4F20-863A-5FEB8AD5F8C1.png";
  const LOGO = "IMG_2283.jpeg";
  const zonesPub = ["Abobo", "Bouaké", "Daloa", "San Pedro", "Aboisso", "Bonoua"];

  const scenes = [
    { theme: "bleu", fond: IMG_CAMIONS, logo: true, l1: "Des villes", l2: "plus propres",
      voix: "MOYA SARL : pour des villes plus propres." },
    { theme: "blanc", photo: IMG_CAMIONS, l1: "Collecte des", l2: "déchets ménagers",
      voix: "Une entreprise ivoirienne spécialisée dans la collecte des déchets ménagers et l'assainissement." },
    { theme: "blanc", photo: IMG_EQUIPE, l1: "Assainissement", l2: "et balayage",
      voix: "Nos équipes assurent aussi le balayage des voies et des espaces publics." },
    { theme: "bleu", l1: "Une équipe", l2: "mobilisée", flotte: true,
      puces: ["Balayeuses", "Éboueurs", "Chauffeurs d'engins", "Agents administratifs"],
      voix: "Des balayeuses, des éboueurs, des chauffeurs d'engins et des agents administratifs." },
    { theme: "bleu", l1: "Présents dans", l2: zonesPub.length + " localités", puces: zonesPub,
      voix: "Nous intervenons à Abobo, Bouaké, Daloa, San Pedro, Aboisso et Bonoua." },
    { theme: "blanc", l1: "Membre du groupement", l2: "ECOTI SA",
      voix: "Membre du groupement ECOTI SA." },
    { theme: "blanc", logo: true, l1: "MOYA SARL", l2: "Contactez-nous", actions: true,
      voix: "MOYA SARL. Contactez-nous." }
  ];

  const pubFond = document.getElementById("pub-fond");
  const pubScene = document.getElementById("pub-scene");
  const pubProgres = document.getElementById("pub-progres");
  const boutonLecture = document.getElementById("pub-lecture");
  const boutonSon = document.getElementById("pub-son");
  const voixDispo = "speechSynthesis" in window;

  let enCours = false;
  let voixActive = voixDispo;
  let minuteur = null;

  if (!voixDispo) {
    boutonSon.textContent = "🔇 Voix indisponible";
    boutonSon.disabled = true;
  } else {
    window.speechSynthesis.getVoices();
  }

  // Choisit une voix française si l'appareil en propose une
  function choisirVoix() {
    const voix = window.speechSynthesis.getVoices().filter(function (v) {
      return v.lang && v.lang.toLowerCase().indexOf("fr") === 0;
    });
    const france = voix.filter(function (v) {
      return v.lang.toLowerCase().replace("_", "-") === "fr-fr";
    });
    return france[0] || voix[0] || null;
  }

  // Crée une ligne de titre dont les mots arrivent un par un
  function creerLigne(texte, classe, debut) {
    const ligne = document.createElement("span");
    ligne.className = "pub-ligne " + classe;
    texte.split(" ").forEach(function (mot, k) {
      const m = document.createElement("span");
      m.className = "pub-mot";
      m.textContent = mot;
      m.style.setProperty("--i", debut + k);
      ligne.appendChild(m);
    });
    return ligne;
  }

  // Affiche une scène
  function afficher(scene, numero) {
    pub.className = "pub " + scene.theme;
    pubScene.innerHTML = "";

    if (scene.logo) {
      const logo = document.createElement("img");
      logo.src = LOGO;
      logo.alt = "Logo MOYA SARL";
      logo.className = "pub-logo";
      pubScene.appendChild(logo);
    }

    const titre = document.createElement("div");
    titre.className = "pub-titre";
    titre.appendChild(creerLigne(scene.l1, "pub-ligne1", 0));
    titre.appendChild(creerLigne(scene.l2, "pub-ligne2", scene.l1.split(" ").length));
    pubScene.appendChild(titre);

    if (scene.photo) {
      const photo = document.createElement("img");
      photo.src = scene.photo;
      photo.alt = "Image d'illustration";
      photo.className = "pub-photo";
      pubScene.appendChild(photo);
    }

    if (scene.puces) {
      const puces = document.createElement("div");
      puces.className = "pub-puces";
      scene.puces.forEach(function (texte, i) {
        const puce = document.createElement("span");
        puce.className = "pub-puce" + (scene.flotte ? " flotte" : "");
        puce.textContent = texte;
        puce.style.setProperty("--i", i);
        puces.appendChild(puce);
      });
      pubScene.appendChild(puces);
    }

    if (scene.actions) {
      const actions = document.createElement("div");
      actions.className = "pub-actions";

      const appeler = document.createElement("a");
      appeler.href = "tel:+" + NUMERO_WHATSAPP;
      appeler.className = "bouton bouton-vert";
      appeler.textContent = "Appeler";
      actions.appendChild(appeler);

      const whatsapp = document.createElement("a");
      whatsapp.href = "https://wa.me/" + NUMERO_WHATSAPP;
      whatsapp.target = "_blank";
      whatsapp.rel = "noopener";
      whatsapp.className = "bouton bouton-whatsapp";
      whatsapp.textContent = "WhatsApp";
      actions.appendChild(whatsapp);

      pubScene.appendChild(actions);
    }

    pubFond.classList.remove("visible");
    if (scene.fond) {
      pubFond.style.backgroundImage = 'url("' + scene.fond + '")';
      void pubFond.offsetWidth;
      pubFond.classList.add("visible");
    }

    pubProgres.style.width = ((numero + 1) / scenes.length * 100) + "%";
  }

  function terminer() {
    enCours = false;
    clearTimeout(minuteur);
    boutonLecture.textContent = "↻ Revoir la présentation";
  }

  function arreter() {
    enCours = false;
    clearTimeout(minuteur);
    if (voixDispo) {
      window.speechSynthesis.cancel();
    }
  }

  // Joue une scène, puis passe à la suivante
  function jouerScene(numero) {
    if (!enCours) {
      return;
    }
    if (numero >= scenes.length) {
      terminer();
      return;
    }

    const scene = scenes[numero];
    afficher(scene, numero);

    const debut = Date.now();
    let passe = false;
    function suivante() {
      if (passe || !enCours) {
        return;
      }
      passe = true;
      clearTimeout(minuteur);
      jouerScene(numero + 1);
    }

    if (voixActive && voixDispo) {
      const lecture = new SpeechSynthesisUtterance(scene.voix);
      lecture.lang = "fr-FR";
      lecture.rate = 0.95;
      const voix = choisirVoix();
      if (voix) {
        lecture.voice = voix;
      }
      // chaque scène reste au moins 3,5 secondes à l'écran
      const fin = function () {
        const reste = Math.max(700, 3500 - (Date.now() - debut));
        setTimeout(suivante, reste);
      };
      lecture.onend = fin;
      lecture.onerror = fin;
      // sécurité : on avance même si la voix ne signale pas la fin
      minuteur = setTimeout(suivante, scene.voix.length * 120 + 4000);
      window.speechSynthesis.speak(lecture);
    } else {
      minuteur = setTimeout(suivante, Math.max(3500, scene.voix.length * 80 + 1500));
    }
  }

  boutonLecture.addEventListener("click", function () {
    if (enCours) {
      arreter();
      boutonLecture.textContent = "▶ Reprendre depuis le début";
    } else {
      enCours = true;
      boutonLecture.textContent = "⏸ Arrêter";
      jouerScene(0);
    }
  });

  boutonSon.addEventListener("click", function () {
    voixActive = !voixActive;
    boutonSon.textContent = voixActive ? "🔊 Voix activée" : "🔇 Voix coupée";
  });
}



