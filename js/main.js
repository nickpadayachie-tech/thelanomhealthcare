(function () {
  "use strict";

  var WHATSAPP_NUMBER = "27834350021";

  var ICON_SPRITE =
    '<svg class="icon-sprite" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><defs>' +
    '<symbol id="icon-phone" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></symbol>' +
    '<symbol id="icon-whatsapp" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01"/></symbol>' +
    '<symbol id="icon-pin" viewBox="0 0 24 24"><path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></symbol>' +
    '<symbol id="icon-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></symbol>' +
    '<symbol id="icon-calendar" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></symbol>' +
    '<symbol id="icon-heart" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></symbol>' +
    '<symbol id="icon-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></symbol>' +
    '<symbol id="icon-check-circle" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></symbol>' +
    '<symbol id="icon-arrow-right" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>' +
    '<symbol id="icon-external" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></symbol>' +
    '<symbol id="icon-users" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></symbol>' +
    '<symbol id="icon-family" viewBox="0 0 24 24"><circle cx="7" cy="6" r="2.5"/><path d="M2.5 21v-3a4.5 4.5 0 0 1 9 0v3"/><circle cx="17" cy="5" r="2.2"/><path d="M13.5 19v-2.5a3.5 3.5 0 0 1 7 0V19"/><circle cx="12" cy="13.5" r="1.8"/><path d="M9.5 21v-1.8a2.5 2.5 0 0 1 5 0V21"/></symbol>' +
    '<symbol id="icon-baby" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01M9 14c1.5 1.5 4.5 1.5 6 0"/><path d="M12 3c1-1.5 2.5-1.5 3.5-.5"/></symbol>' +
    '<symbol id="icon-mother-baby" viewBox="0 0 24 24"><circle cx="9" cy="7" r="3"/><path d="M3.5 21v-4a5.5 5.5 0 0 1 11 0v4"/><circle cx="17.5" cy="13" r="2.2"/><path d="M14 21v-1.5a3.5 3.5 0 0 1 7 0V21"/></symbol>' +
    '<symbol id="icon-shield" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></symbol>' +
    '<symbol id="icon-stethoscope" viewBox="0 0 24 24"><path d="M4 3v6a5 5 0 0 0 10 0V3"/><path d="M4 6H2M14 6h2"/><path d="M9 14v2a5 5 0 0 0 10 0v-1"/><circle cx="19" cy="12" r="2.5"/></symbol>' +
    '<symbol id="icon-bandage" viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="8" rx="4" transform="rotate(-45 12 12)"/><path d="M9 9h.01M10 12h.01M12 10h.01M14 13h.01M15 11h.01"/></symbol>' +
    '<symbol id="icon-ribbon" viewBox="0 0 24 24"><path d="M12 3c-2 3-2 6 0 9 2-3 2-6 0-9z"/><path d="M12 12c-3-1-6 1-6 4l3-1 3 3 3-3 3 1c0-3-3-5-6-4z"/></symbol>' +
    '<symbol id="icon-flask" viewBox="0 0 24 24"><path d="M9 3h6M10 3v6L5.5 17a2.5 2.5 0 0 0 2.2 3.7h8.6a2.5 2.5 0 0 0 2.2-3.7L14 9V3"/><path d="M7.5 15h9"/></symbol>' +
    '<symbol id="icon-test-tube" viewBox="0 0 24 24"><path d="M9 3h6M14 3v13a4 4 0 0 1-8 0V3"/><path d="M6.5 12h7"/></symbol>' +
    '<symbol id="icon-alert" viewBox="0 0 24 24"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></symbol>' +
    '<symbol id="icon-mail" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></symbol>' +
    '<symbol id="icon-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"/></symbol>' +
    '<symbol id="icon-sparkle" viewBox="0 0 24 24"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/><path d="M19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16z"/></symbol>' +
    '<symbol id="icon-hand-heart" viewBox="0 0 24 24"><path d="M6 13V6a2 2 0 0 1 4 0v5"/><path d="M10 10V4.5a2 2 0 0 1 4 0V10"/><path d="M14 10V6a2 2 0 0 1 4 0v7"/><path d="M6 13l-2 2a2.5 2.5 0 0 0 0 3.5l2.5 2.5a4 4 0 0 0 2.8 1.2H14a4 4 0 0 0 4-4v-3"/><path d="M13 19.5c-2.2-1.3-3.5-2.6-3.5-4a2 2 0 0 1 3.5-1.2 2 2 0 0 1 3.5 1.2c0 1.4-1.3 2.7-3.5 4z"/></symbol>' +
    '<symbol id="icon-lock" viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></symbol>' +
    '<symbol id="icon-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/></symbol>' +
    '<symbol id="icon-chat" viewBox="0 0 24 24"><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5z"/><path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01"/></symbol>' +
    '<symbol id="icon-close" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></symbol>' +
    "</defs></svg>";

  function injectIcons() {
    if (document.getElementById("thelanom-icon-sprite")) {
      return;
    }

    var wrapper = document.createElement("div");
    wrapper.id = "thelanom-icon-sprite";
    wrapper.innerHTML = ICON_SPRITE;
    document.body.insertBefore(wrapper, document.body.firstChild);
  }

  function initWhatsAppFloater() {
    if (document.querySelector(".whatsapp-floater")) {
      return;
    }

    var floater = document.createElement("a");
    floater.className = "whatsapp-floater";
    floater.href = "https://wa.me/" + WHATSAPP_NUMBER;
    floater.target = "_blank";
    floater.rel = "noopener noreferrer";
    floater.setAttribute("aria-label", "Chat with Sr Nomsa Matena on WhatsApp");
    floater.innerHTML =
      '<span class="whatsapp-floater__label" aria-hidden="true">Chat with Sr Nomsa Matena</span>' +
      '<svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-whatsapp"></use></svg>';
    document.body.appendChild(floater);
  }

  function initNavigation() {
    var body = document.body;
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("primary-nav");
    var backdrop = document.querySelector("[data-nav-backdrop]");

    if (!toggle || !nav) {
      return;
    }

    function setOpen(isOpen, returnFocus) {
      body.classList.toggle("nav-open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      toggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");

      if (isOpen) {
        var firstLink = nav.querySelector("a");
        if (firstLink) {
          window.requestAnimationFrame(function () {
            firstLink.focus();
          });
        }
      } else if (returnFocus) {
        toggle.focus();
      }
    }

    toggle.addEventListener("click", function () {
      setOpen(!body.classList.contains("nav-open"), false);
    });

    if (backdrop) {
      backdrop.addEventListener("click", function () {
        setOpen(false, true);
      });
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && body.classList.contains("nav-open")) {
        setOpen(false, true);
      }
    });

    nav.addEventListener("click", function (event) {
      var link = event.target.closest("a");
      if (link && body.classList.contains("nav-open")) {
        setOpen(false, false);
      }
    });

    document.addEventListener("click", function (event) {
      if (!body.classList.contains("nav-open")) {
        return;
      }

      if (!nav.contains(event.target) && !toggle.contains(event.target)) {
        setOpen(false, false);
      }
    });

    var desktopQuery = window.matchMedia("(min-width: 981px)");
    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener("change", function (event) {
        if (event.matches) {
          setOpen(false, false);
        }
      });
    }
  }

  function initHeaderState() {
    var header = document.querySelector(".site-header");
    if (!header) {
      return;
    }

    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function initServiceGallery() {
    var section = document.querySelector("[data-service-gallery]");
    var track = document.querySelector("[data-service-track]");

    if (!section || !track) {
      return;
    }

    var container = section.querySelector(".container");
    if (!container) {
      return;
    }

    var desktopQuery = window.matchMedia("(min-width: 981px)");
    var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    var frame = 0;
    var active = false;
    var distance = 0;
    var stickyTop = 104;
    var scrollRange = 1;

    function headerHeight() {
      var value = parseFloat(
        window.getComputedStyle(document.documentElement).getPropertyValue("--site-header-height")
      );
      return isNaN(value) ? 104 : value;
    }

    function update() {
      if (!active) {
        return;
      }

      var rect = section.getBoundingClientRect();
      var progress = (stickyTop - rect.top) / scrollRange;
      progress = Math.max(0, Math.min(1, progress));

      track.style.transform =
        "translate3d(" + (-distance * progress).toFixed(2) + "px, 0, 0)";
    }

    function scheduleUpdate() {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(function () {
        frame = 0;
        update();
      });
    }

    function refresh() {
      if (!desktopQuery.matches || motionQuery.matches) {
        active = false;
        section.classList.remove("is-gallery-active");
        section.style.removeProperty("--gallery-distance");
        track.style.transform = "";
        return;
      }

      active = true;
      section.classList.add("is-gallery-active");
      distance = Math.max(0, track.scrollWidth - container.clientWidth);
      section.style.setProperty("--gallery-distance", distance + "px");
      stickyTop = headerHeight();
      scrollRange = Math.max(1, section.offsetHeight - (window.innerHeight - stickyTop));
      update();
    }

    function scheduleRefresh() {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      frame = window.requestAnimationFrame(function () {
        frame = 0;
        refresh();
      });
    }

    track.addEventListener("focusin", function (event) {
      if (!active) {
        return;
      }

      var card = event.target.closest(".service-card");
      if (!card) {
        return;
      }

      var cardRect = card.getBoundingClientRect();
      var containerRect = container.getBoundingClientRect();

      if (cardRect.left >= containerRect.left && cardRect.right <= containerRect.right) {
        return;
      }

      var targetOffset = Math.max(0, Math.min(distance, card.offsetLeft - 20));
      var progress = distance ? targetOffset / distance : 0;
      var targetScroll =
        section.getBoundingClientRect().top + window.scrollY - stickyTop + progress * scrollRange;

      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    });

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleRefresh, { passive: true });

    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener("change", scheduleRefresh);
      motionQuery.addEventListener("change", scheduleRefresh);
    } else if (desktopQuery.addListener) {
      desktopQuery.addListener(scheduleRefresh);
      motionQuery.addListener(scheduleRefresh);
    }

    refresh();
  }

  function initServiceCardReveal() {
    var cards = document.querySelectorAll(".service-detail");

    if (!cards.length || !("IntersectionObserver" in window)) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          var card = entry.target;
          var delay = Number(card.getAttribute("data-reveal-delay") || 0);

          card.classList.add("is-revealed");
          observer.unobserve(card);

          window.setTimeout(function () {
            card.classList.remove("reveal-pending", "is-revealed", "reveal-delay-1", "reveal-delay-2");
          }, 850 + delay);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.15 }
    );

    Array.prototype.forEach.call(cards, function (card) {
      var rect = card.getBoundingClientRect();

      if (rect.top < viewportHeight || card.matches(":target")) {
        return;
      }

      var grid = card.parentElement;
      var columns = 1;

      if (grid) {
        var tracks = window.getComputedStyle(grid).gridTemplateColumns;
        if (tracks && tracks !== "none") {
          columns = tracks.split(/\s+/).filter(Boolean).length;
        }
      }

      var index = grid ? Array.prototype.indexOf.call(grid.children, card) : 0;
      var delay = Math.min(index % Math.max(columns, 1), 2) * 70;

      card.setAttribute("data-reveal-delay", String(delay));
      card.classList.add("reveal-pending");

      if (delay === 70) {
        card.classList.add("reveal-delay-1");
      } else if (delay === 140) {
        card.classList.add("reveal-delay-2");
      }

      observer.observe(card);
    });
  }

  function initCurrentYear() {
    var year = String(new Date().getFullYear());
    document.querySelectorAll("[data-current-year]").forEach(function (node) {
      node.textContent = year;
    });
  }

  function initServicePrefill() {
    var select = document.getElementById("service");
    if (!select) {
      return;
    }

    var service = new URLSearchParams(window.location.search).get("service");
    if (!service) {
      return;
    }

    var option = Array.prototype.find.call(select.options, function (item) {
      return item.value === service;
    });

    if (option) {
      select.value = option.value;
    }
  }

  function initAppointmentForm() {
    var form = document.getElementById("appointment-form");
    if (!form) {
      return;
    }

    var startedField = document.getElementById("form-started-at");
    var status = document.getElementById("form-status");
    var submitButton = form.querySelector('button[type="submit"]');
    var submitButtonMarkup = submitButton ? submitButton.innerHTML : "";
    var dateField = document.getElementById("preferred-date");

    function setStartedTime() {
      if (startedField) {
        startedField.value = String(Date.now());
      }
    }

    function todayISO() {
      var now = new Date();
      var month = String(now.getMonth() + 1).padStart(2, "0");
      var day = String(now.getDate()).padStart(2, "0");
      return now.getFullYear() + "-" + month + "-" + day;
    }

    setStartedTime();

    if (dateField) {
      dateField.min = todayISO();
    }

    function getErrorElement(input) {
      var container = input.closest(".field, .form-check");
      return container ? container.querySelector(".field-error") : null;
    }

    function setFieldState(input, message) {
      var container = input.closest(".field, .form-check");
      var error = getErrorElement(input);

      if (container) {
        container.classList.toggle("has-error", Boolean(message));
      }

      input.setAttribute("aria-invalid", message ? "true" : "false");

      if (error) {
        error.textContent = message || "";
      }
    }

    function validateInput(input) {
      var value = input.type === "checkbox" ? input.checked : input.value.trim();
      var label = input.getAttribute("data-label") || "this field";
      var message = "";

      if (input.type === "checkbox") {
        if (!input.checked) {
          message = "Please confirm that you have read the privacy notice.";
        }
        setFieldState(input, message);
        return !message;
      }

      if (input.required && !value) {
        message = "Please enter " + label + ".";
      } else if (input.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        message = "Please enter a valid email address.";
      } else if (input.type === "tel" && value) {
        var digits = value.replace(/\D/g, "");
        if (digits.length < 7 || digits.length > 15) {
          message = "Please enter a valid telephone number.";
        }
      } else if (input.id === "full-name" && value && value.length < 2) {
        message = "Please enter your full name.";
      } else if (input.type === "date" && value) {
        if (value < todayISO()) {
          message = "Please choose today or a future date.";
        }
      } else if (input.id === "message" && value.length > 1000) {
        message = "Please keep your message under 1,000 characters.";
      }

      setFieldState(input, message);
      return !message;
    }

    var fields = Array.prototype.slice.call(
      form.querySelectorAll("input:not([type=hidden]):not([name=companyWebsite]), select, textarea")
    );

    fields.forEach(function (input) {
      input.addEventListener("blur", function () {
        validateInput(input);
      });

      input.addEventListener("input", function () {
        var container = input.closest(".field, .form-check");
        if (container && container.classList.contains("has-error")) {
          validateInput(input);
        }
      });

      input.addEventListener("change", function () {
        if (input.type === "checkbox") {
          validateInput(input);
        }
      });
    });

    function showStatus(state, title, message, actionLink) {
      if (!status) {
        return;
      }

      status.innerHTML = "";
      status.setAttribute("data-state", state);

      var heading = document.createElement("strong");
      heading.textContent = title;
      status.appendChild(heading);

      var text = document.createElement("span");
      text.textContent = message;
      status.appendChild(text);

      if (actionLink) {
        var wrap = document.createElement("p");
        var link = document.createElement("a");
        link.href = actionLink.href;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = actionLink.label;
        wrap.appendChild(link);
        status.appendChild(wrap);
      }
    }

    function buildWhatsAppMessage(data) {
      var lines = [
        "Appointment enquiry - Thelanom Healthcare Services",
        "Full name: " + data.fullName,
        "Telephone: " + data.phone,
        "Email: " + data.email,
        "Preferred service: " + data.service,
        "Preferred location: " + data.location,
        "Preferred date: " + data.appointmentDate
      ];

      if (data.message) {
        lines.push("General enquiry: " + data.message);
      }

      lines.push("Please note: this is an enquiry only and does not confirm an appointment.");
      return lines.join("\n");
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var honeypot = form.querySelector('[name="companyWebsite"]');
      if (honeypot && honeypot.value.trim() !== "") {
        return;
      }

      if (startedField && Date.now() - Number(startedField.value || 0) < 2500) {
        showStatus(
          "error",
          "Please take a moment.",
          "Please review your details and try submitting the enquiry again."
        );
        return;
      }

      var isValid = true;
      var firstInvalid = null;

      fields.forEach(function (input) {
        var valid = validateInput(input);
        if (!valid) {
          isValid = false;
          if (!firstInvalid) {
            firstInvalid = input;
          }
        }
      });

      if (!isValid) {
        if (status) {
          status.removeAttribute("data-state");
          status.innerHTML = "";
        }
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      var formData = new FormData(form);
      var endpoint = (form.getAttribute("data-endpoint") || "").trim();

      if (endpoint) {
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = "Sending enquiry...";
        }

        fetch(endpoint, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" }
        })
          .then(function (response) {
            if (!response.ok) {
              throw new Error("Request failed");
            }

            form.reset();
            setStartedTime();
            if (dateField) {
              dateField.min = todayISO();
            }
            form.querySelectorAll(".has-error").forEach(function (node) {
              node.classList.remove("has-error");
            });

            showStatus(
              "success",
              "Thank you for your enquiry.",
              "Your enquiry has been sent to Thelanom Healthcare Services. The clinic will contact you using the details provided. This is an enquiry only and does not confirm an appointment."
            );
          })
          .catch(function () {
            showStatus(
              "error",
              "We could not send your enquiry.",
              "Please try again, call 083 435 0021, or send a WhatsApp message to the clinic."
            );
          })
          .finally(function () {
            if (submitButton) {
              submitButton.disabled = false;
              submitButton.innerHTML = submitButtonMarkup;
            }
          });

        return;
      }

      var data = {
        fullName: String(formData.get("fullName") || "").trim(),
        phone: String(formData.get("phone") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        service: String(formData.get("service") || "").trim(),
        location: String(formData.get("location") || "").trim(),
        appointmentDate: String(formData.get("appointmentDate") || "").trim(),
        message: String(formData.get("message") || "").trim()
      };

      var whatsappUrl =
        "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(buildWhatsAppMessage(data));

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");

      showStatus(
        "success",
        "Your enquiry has been prepared.",
        "WhatsApp has been opened in a new tab. Please press send there to deliver your enquiry to the clinic. If WhatsApp did not open, use the link below. This is an enquiry only and does not confirm an appointment.",
        { href: whatsappUrl, label: "Open WhatsApp to send your enquiry" }
      );
    });
  }

  function init() {
    injectIcons();
    initWhatsAppFloater();
    initNavigation();
    initHeaderState();
    initServiceGallery();
    initServiceCardReveal();
    initCurrentYear();
    initServicePrefill();
    initAppointmentForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
