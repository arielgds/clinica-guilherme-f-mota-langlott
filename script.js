(function () {
  const CLINIC_WHATSAPP = "5535999507525";

  // 1. FAQ Sanfona (Accordion Acessível)
  const faqTriggers = document.querySelectorAll(".faq-trigger");
  faqTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";
      const content = trigger.nextElementSibling;

      faqTriggers.forEach((other) => {
        other.setAttribute("aria-expanded", "false");
        other.nextElementSibling.style.maxHeight = null;
      });

      if (!isExpanded) {
        trigger.setAttribute("aria-expanded", "true");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  // 2. Lightbox para ampliar as fotos da estrutura
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");

  document.querySelectorAll(".gallery-card").forEach((card) => {
    card.addEventListener("click", () => {
      const imgSrc = card.getAttribute("data-full");
      const caption = card.getAttribute("data-caption");
      lightboxImg.src = imgSrc;
      lightboxImg.alt = caption;
      lightboxCaption.textContent = caption;
      lightbox.style.display = "flex";
    });
  });

  function closeLightbox() {
    lightbox.style.display = "none";
    lightboxImg.src = "";
  }
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // 3. Máscara leve para campo de WhatsApp
  const phoneInput = document.getElementById("patient-phone");
  phoneInput.addEventListener("input", function (e) {
    let x = e.target.value
      .replace(/\D/g, "")
      .match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    e.target.value = !x[2]
      ? x[1]
      : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
  });

  // 4. Envio do Formulário -> Redirecionamento Personalizado para WhatsApp
  const bookingForm = document.getElementById("booking-form");
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("patient-name").value.trim();
    const phone = document.getElementById("patient-phone").value.trim();
    const specialty = document.getElementById("specialty-select").value;
    const plan = document.getElementById("plan-select").value;

    const message = `Olá! Meu nome é *${name}* (${phone}).\nGostaria de verificar os horários disponíveis para *${specialty}* (Convênio/Parceiro: *${plan}*) na Clínica Guilherme F. Mota Langlott.`;
    const whatsappUrl = `https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });

  // 5. Banner de Consentimento LGPD
  const cookieBanner = document.getElementById("cookie-banner");
  const acceptCookiesBtn = document.getElementById("accept-cookies");

  if (!localStorage.getItem("clinica_gml_lgpd_consent")) {
    cookieBanner.style.display = "block";
  }

  acceptCookiesBtn.addEventListener("click", function () {
    localStorage.setItem("clinica_gml_lgpd_consent", "accepted");
    cookieBanner.style.display = "none";
  });

  // 6. Lógica de Exit-Intent Popup
  const exitModal = document.getElementById("exit-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const modalCta = document.getElementById("modal-cta");

  function showExitModal() {
    if (!sessionStorage.getItem("clinica_gml_exit_shown")) {
      exitModal.style.display = "flex";
      sessionStorage.setItem("clinica_gml_exit_shown", "true");
    }
  }

  function hideExitModal() {
    exitModal.style.display = "none";
  }

  document.addEventListener("mouseleave", function (e) {
    if (e.clientY <= 0) {
      showExitModal();
    }
  });

  closeModalBtn.addEventListener("click", hideExitModal);
  modalCta.addEventListener("click", hideExitModal);

  exitModal.addEventListener("click", function (e) {
    if (e.target === exitModal) hideExitModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      hideExitModal();
      closeLightbox();
    }
  });
})();
