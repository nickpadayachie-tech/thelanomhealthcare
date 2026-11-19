(function () {
  "use strict";

  var CONSENT_VERSION = "1.0";
  var STORAGE_KEY = "thelanom_cookie_consent";
  var GA_MEASUREMENT_ID = "";

  var state = {
    essential: true,
    analytics: false,
    marketing: false,
    version: CONSENT_VERSION,
    updatedAt: null
  };

  var banner = null;
  var dialog = null;
  var analyticsLoaded = false;

  function storageAvailable() {
    try {
      var testKey = "__thelanom_test__";
      window.localStorage.setItem(testKey, "1");
      window.localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  function readConsent() {
    if (!storageAvailable()) {
      return null;
    }

    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return null;
      }

      var parsed = JSON.parse(raw);
      if (!parsed || parsed.version !== CONSENT_VERSION) {
        return null;
      }

      return parsed;
    } catch (error) {
      return null;
    }
  }

  function saveConsent(next) {
    state = {
      essential: true,
      analytics: Boolean(next.analytics),
      marketing: Boolean(next.marketing),
      version: CONSENT_VERSION,
      updatedAt: new Date().toISOString()
    };

    if (storageAvailable()) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        state.persisted = false;
      }
    }

    applyConsent();
    document.dispatchEvent(
      new CustomEvent("thelanom:consent", {
        detail: {
          essential: state.essential,
          analytics: state.analytics,
          marketing: state.marketing,
          version: state.version,
          updatedAt: state.updatedAt
        }
      })
    );
  }

  function hasConsent(category) {
    return category === "essential" ? true : Boolean(state[category]);
  }

  function expireCookie(name, domain) {
    var cookie = name + "=; Max-Age=0; path=/; SameSite=Lax";
    if (domain) {
      cookie += "; domain=" + domain;
    }
    document.cookie = cookie;
  }

  function clearAnalyticsCookies() {
    if (GA_MEASUREMENT_ID) {
      window["ga-disable-" + GA_MEASUREMENT_ID] = true;
    }

    var names = document.cookie.split(";");
    names.forEach(function (item) {
      var name = item.split("=")[0].trim();
      if (name.indexOf("_ga") === 0 || name.indexOf("_gid") === 0 || name.indexOf("_gat") === 0) {
        expireCookie(name);
        var host = window.location.hostname;
        expireCookie(name, host);
        if (host.indexOf(".") !== -1) {
          expireCookie(name, "." + host.split(".").slice(-2).join("."));
        }
      }
    });
  }

  function loadAnalytics() {
    if (!GA_MEASUREMENT_ID || analyticsLoaded || !state.analytics) {
      return;
    }

    analyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });

    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(script);
  }

  function applyConsent() {
    if (state.analytics && GA_MEASUREMENT_ID) {
      window["ga-disable-" + GA_MEASUREMENT_ID] = false;
      loadAnalytics();
    } else {
      clearAnalyticsCookies();
    }
  }

  function hideBanner() {
    if (banner) {
      banner.hidden = true;
    }
  }

  function showBanner() {
    if (banner) {
      banner.hidden = false;
    }
  }

  function syncPreferences() {
    if (!dialog) {
      return;
    }

    var analytics = dialog.querySelector('[data-category="analytics"]');
    var marketing = dialog.querySelector('[data-category="marketing"]');

    if (analytics) {
      analytics.checked = Boolean(state.analytics);
    }
    if (marketing) {
      marketing.checked = Boolean(state.marketing);
    }
  }

  function openPreferences() {
    if (!dialog) {
      return;
    }

    syncPreferences();
    document.body.classList.add("cookie-dialog-open");

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  }

  function closePreferences() {
    if (!dialog) {
      return;
    }

    if (typeof dialog.close === "function" && dialog.open) {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
    document.body.classList.remove("cookie-dialog-open");
  }

  function readPreferences() {
    if (!dialog) {
      return { analytics: false, marketing: false };
    }

    var analytics = dialog.querySelector('[data-category="analytics"]');
    var marketing = dialog.querySelector('[data-category="marketing"]');

    return {
      analytics: Boolean(analytics && analytics.checked),
      marketing: Boolean(marketing && marketing.checked)
    };
  }

  function buildMarkup() {
    return (
      '<section class="cookie-banner" id="cookie-banner" aria-labelledby="cookie-banner-title" hidden>' +
      '<div class="cookie-banner__inner">' +
      '<div class="cookie-banner__copy">' +
      '<h2 class="cookie-banner__title" id="cookie-banner-title">Your privacy choices</h2>' +
      '<p class="cookie-banner__text">We use essential storage to make this website work. Analytics and marketing cookies are optional and are only used if you agree. Read our <a href="cookie-policy.html">Cookie Policy</a> for details.</p>' +
      "</div>" +
      '<div class="cookie-actions">' +
      '<button type="button" class="btn btn-secondary btn-sm" data-cookie-accept>Accept all</button>' +
      '<button type="button" class="btn btn-secondary btn-sm" data-cookie-reject>Reject non-essential</button>' +
      '<button type="button" class="btn btn-ghost btn-sm" data-cookie-manage>Manage preferences</button>' +
      "</div>" +
      "</div>" +
      "</section>" +
      '<dialog class="cookie-dialog" id="cookie-preferences" aria-labelledby="cookie-pref-title">' +
      '<div class="cookie-dialog__head">' +
      "<div>" +
      '<h2 id="cookie-pref-title">Cookie preferences</h2>' +
      "<p>Choose which optional cookies you allow. Your choice is stored with this policy version.</p>" +
      "</div>" +
      '<button type="button" class="cookie-close" data-cookie-close aria-label="Close cookie preferences">' +
      '<svg class="icon" aria-hidden="true" focusable="false"><use href="#icon-close"></use></svg>' +
      "</button>" +
      "</div>" +
      '<div class="cookie-dialog__body">' +
      '<div class="cookie-category">' +
      '<div class="cookie-category__info">' +
      "<h3>Essential</h3>" +
      "<p>Required to remember your cookie choices and keep the website secure. These are always active.</p>" +
      "</div>" +
      '<label class="switch"><input type="checkbox" checked disabled aria-label="Essential cookies are always active"><span class="switch-track" aria-hidden="true"></span></label>' +
      "</div>" +
      '<div class="cookie-category">' +
      '<div class="cookie-category__info">' +
      "<h3>Analytics</h3>" +
      "<p>Helps us understand how the website is used so we can improve it. No analytics script loads before you agree.</p>" +
      "</div>" +
      '<label class="switch"><input type="checkbox" data-category="analytics" aria-label="Allow analytics cookies"><span class="switch-track" aria-hidden="true"></span></label>' +
      "</div>" +
      '<div class="cookie-category">' +
      '<div class="cookie-category__info">' +
      "<h3>Marketing</h3>" +
      "<p>Used to measure or personalise advertising, if introduced in future. These remain off unless you agree.</p>" +
      "</div>" +
      '<label class="switch"><input type="checkbox" data-category="marketing" aria-label="Allow marketing cookies"><span class="switch-track" aria-hidden="true"></span></label>' +
      "</div>" +
      '<p class="cookie-pref-note">You can change these settings at any time using the Cookie Settings link in the footer. See our <a href="cookie-policy.html">Cookie Policy</a>.</p>' +
      "</div>" +
      '<div class="cookie-dialog__actions">' +
      '<button type="button" class="btn btn-secondary btn-sm" data-cookie-accept>Accept all</button>' +
      '<button type="button" class="btn btn-secondary btn-sm" data-cookie-reject>Reject non-essential</button>' +
      '<button type="button" class="btn btn-primary btn-sm" data-cookie-save>Save preferences</button>' +
      "</div>" +
      "</dialog>"
    );
  }

  function bindEvents() {
    if (!banner || !dialog) {
      return;
    }

    banner.querySelector("[data-cookie-accept]").addEventListener("click", function () {
      saveConsent({ analytics: true, marketing: true });
      hideBanner();
    });

    banner.querySelector("[data-cookie-reject]").addEventListener("click", function () {
      saveConsent({ analytics: false, marketing: false });
      hideBanner();
    });

    banner.querySelector("[data-cookie-manage]").addEventListener("click", openPreferences);

    dialog.querySelectorAll("[data-cookie-accept]").forEach(function (button) {
      button.addEventListener("click", function () {
        saveConsent({ analytics: true, marketing: true });
        hideBanner();
        closePreferences();
      });
    });

    dialog.querySelectorAll("[data-cookie-reject]").forEach(function (button) {
      button.addEventListener("click", function () {
        saveConsent({ analytics: false, marketing: false });
        hideBanner();
        closePreferences();
      });
    });

    dialog.querySelector("[data-cookie-save]").addEventListener("click", function () {
      saveConsent(readPreferences());
      hideBanner();
      closePreferences();
    });

    dialog.querySelector("[data-cookie-close]").addEventListener("click", closePreferences);

    dialog.addEventListener("close", function () {
      document.body.classList.remove("cookie-dialog-open");
    });

    document.querySelectorAll("[data-cookie-settings]").forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        openPreferences();
      });
    });
  }

  function init() {
    var stored = readConsent();

    var container = document.createElement("div");
    container.id = "thelanom-cookie-consent";
    container.innerHTML = buildMarkup();
    document.body.appendChild(container);

    banner = document.getElementById("cookie-banner");
    dialog = document.getElementById("cookie-preferences");

    if (stored) {
      state = {
        essential: true,
        analytics: Boolean(stored.analytics),
        marketing: Boolean(stored.marketing),
        version: CONSENT_VERSION,
        updatedAt: stored.updatedAt || null
      };
      applyConsent();
      hideBanner();
    } else {
      showBanner();
    }

    bindEvents();

    window.ThelanomConsent = {
      version: CONSENT_VERSION,
      get: function () {
        return {
          essential: true,
          analytics: Boolean(state.analytics),
          marketing: Boolean(state.marketing),
          version: CONSENT_VERSION,
          updatedAt: state.updatedAt
        };
      },
      hasConsent: hasConsent,
      openSettings: openPreferences
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
