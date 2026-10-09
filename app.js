
/**
 * L'Éphémère - Bistro Gastronomique
 * Scripts interactifs & gestion des réservations
 */

const WEB3FORMS_ACCESS_KEY = "6abfa9ec-fdeb-4070-a1ae-65a397799b82";

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initMenuTabs();
  initReservationModal();
  initQuickForms();
});

/* --------------------------------------------------------------------------
   1. NAVIGATION & SCROLL
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.getElementById('header');
  const burgerBtn = document.getElementById('burgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
      header.style.background = 'rgba(12, 14, 18, 0.95)';
    } else {
      header.style.boxShadow = 'none';
      header.style.background = 'rgba(12, 14, 18, 0.85)';
    }
  });

  // Mobile menu toggle
  if (burgerBtn && navMenu) {
    burgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      burgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Active section indicator on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (matchingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          matchingLink.classList.add('active');
        } else {
          matchingLink.classList.remove('active');
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. MENU CATEGORY TABS
   -------------------------------------------------------------------------- */
function initMenuTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab button
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const targetCategory = tab.dataset.category;

      // Filter cards with smooth fade
      menuCards.forEach(card => {
        if (card.dataset.category === targetCategory) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   3. RESERVATION DIALOG & LOGIC (AVEC ENVOI RÉEL VIA WEB3FORMS)
   -------------------------------------------------------------------------- */
function initReservationModal() {
  const modal = document.getElementById('reservationModal');
  const openButtons = document.querySelectorAll('.open-reservation');
  const closeBtn = document.getElementById('closeModalBtn');
  const finishBtn = document.getElementById('btnFinishBooking');
  const form = document.getElementById('reservationForm');
  const formStep = document.getElementById('bookingStepForm');
  const successStep = document.getElementById('bookingStepSuccess');

  const dateInput = document.getElementById('reserveDate');
  const serviceSelect = document.getElementById('reserveService');
  const timeSelect = document.getElementById('reserveTime');

  if (!modal) return;

  // Set minimum date to today
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  // Dynamically update time slots based on service (Midi / Soir)
  if (serviceSelect && timeSelect) {
    serviceSelect.addEventListener('change', () => {
      const isMidi = serviceSelect.value === 'midi';
      timeSelect.innerHTML = '';

      const midiHours = ['12:00', '12:30', '13:00', '13:30'];
      const soirHours = ['19:30', '20:00', '20:30', '21:00', '21:30'];

      const hoursList = isMidi ? midiHours : soirHours;

      hoursList.forEach((hour, index) => {
        const opt = document.createElement('option');
        opt.value = hour;
        opt.textContent = hour;
        if (index === 1) opt.selected = true; // Default 12:30 or 20:00
        timeSelect.appendChild(opt);
      });
    });
  }

  // Open modal handler
  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Check if button clicked was for tasting menu
      const formula = btn.dataset.formula;
      if (formula && document.getElementById('guestNotes')) {
        document.getElementById('guestNotes').value = 'Option : Formule Privilège Menu Découverte en 6 Temps';
      }

      formStep.classList.remove('hidden');
      successStep.classList.add('hidden');
      modal.showModal();
    });
  });

  // Close modal handler
  const closeModal = () => {
    modal.close();
    // Reset form after closing
    setTimeout(() => {
      formStep.classList.remove('hidden');
      successStep.classList.add('hidden');
    }, 300);
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (finishBtn) finishBtn.addEventListener('click', closeModal);

  // Empêcher les clics à l'intérieur de la boîte (y compris selects et champs) de fermer le modal
  const dialogContent = modal.querySelector('.dialog-content');
  if (dialogContent) {
    dialogContent.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // Fermer UNIQUEMENT lors d'un vrai clic sur le fond sombre (backdrop)
  modal.addEventListener('click', (e) => {
    if (e.target.closest && (e.target.closest('.dialog-content') || e.target.closest('select'))) {
      return;
    }
    if (e.target.tagName === 'SELECT' || e.target.tagName === 'OPTION') {
      return;
    }
    if (e.target === modal) {
      closeModal();
    }
  });

  // Form submission handler
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

      const guestName = document.getElementById('guestName').value;
      const guestPhone = document.getElementById('guestPhone').value;
      const guestEmail = document.getElementById('guestEmail').value;
      const guests = document.getElementById('reserveGuests').value;
      const date = document.getElementById('reserveDate').value;
      const time = document.getElementById('reserveTime').value;
      const locationSelect = document.getElementById('reserveLocation');
      const locationName = locationSelect ? locationSelect.options[locationSelect.selectedIndex].text.split('(')[0].trim() : 'Salle Principale';
      const guestNotes = document.getElementById('guestNotes') ? document.getElementById('guestNotes').value : '';

      // Format date in French format
      const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Generate random reservation code
      const randomCode = '#EPH-' + Math.floor(1000 + Math.random() * 9000);

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Transmission en cours...</span>';
      }

      try {
        // Envoi réel à Web3Forms
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `[Réservation Restaurant] ${guestName} - ${guests} pers. (${formattedDate} à ${time})`,
            from_name: "L'Éphémère - Réservations",
            "Nom du convive": guestName,
            "Téléphone": guestPhone,
            "Email du client": guestEmail,
            "Nombre de convives": guests,
            "Date du repas": formattedDate,
            "Heure d'arrivée": time,
            "Ambiance souhaitée": locationName,
            "Remarques / Allergies": guestNotes || "Aucune",
            "Référence de réservation": randomCode
          })
        });

        const result = await response.json();

        if (result.success) {
          // Populate success message
          document.getElementById('confirmGuestName').textContent = guestName;
          document.getElementById('confirmGuests').textContent = guests;
          document.getElementById('confirmDate').textContent = formattedDate;
          document.getElementById('confirmTime').textContent = time;
          document.getElementById('confirmLocation').textContent = locationName;
          document.getElementById('confirmRef').textContent = randomCode;

          // Switch views
          formStep.classList.add('hidden');
          successStep.classList.remove('hidden');
          form.reset();

          showToast(`Réservation confirmée et envoyée au restaurant pour ${guestName} !`);
        } else {
          showToast("Erreur lors de la réservation. Veuillez réessayer.");
        }
      } catch (err) {
        console.error("Erreur Web3Forms:", err);
        showToast("Impossible de contacter le service de réservation.");
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    });
  }
}

/* --------------------------------------------------------------------------
   4. CONTACT & NEWSLETTER FORMS (AVEC ENVOI RÉEL VIA WEB3FORMS)
   -------------------------------------------------------------------------- */
function initQuickForms() {
  const contactForm = document.getElementById('quickContactForm');
  const newsletterForm = document.getElementById('newsletterForm');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : '';

      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      const message = document.getElementById('contactMessage').value;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Envoi en cours...</span>';
      }

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `[Message Contact / Privatisation] De ${name}`,
            from_name: "L'Éphémère - Contact",
            "Nom complet": name,
            "Email": email,
            "Message": message
          })
        });

        const result = await response.json();

        if (result.success) {
          contactForm.reset();
          showToast(`Merci ${name}, votre message a bien été transmis au restaurant.`);
        } else {
          showToast("Une erreur est survenue lors de l'envoi du message.");
        }
      } catch (err) {
        console.error("Erreur Contact:", err);
        showToast("Impossible d'envoyer le message pour le moment.");
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsletterForm.reset();
      showToast('Merci pour votre inscription à la lettre de saison !');
    });
  }
}

/* --------------------------------------------------------------------------
   5. TOAST NOTIFICATION UTILITY
   -------------------------------------------------------------------------- */
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}
