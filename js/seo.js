(function () {
  "use strict";

  var GOOGLE_PROFILE = "https://share.google/8McsKuqzAmhLcni2U";
  var PHONE = "+27834350021";
  var EMAIL = "NomsaMatena@Thelanomhealthcare.co.za";

  var SEBOKENG_ADDRESS = {
    "@type": "PostalAddress",
    streetAddress: "Consulting Room 2, Mandela Square Pharmacy, Moshoeshoe Street",
    addressLocality: "Sebokeng",
    postalCode: "1983",
    addressRegion: "Gauteng",
    addressCountry: "ZA"
  };

  var VANDERBIJLPARK_ADDRESS = {
    "@type": "PostalAddress",
    streetAddress: "Consulting Room 1, A1 Omega Building, FW Beyers Street",
    addressLocality: "Vanderbijlpark",
    postalCode: "1911",
    addressRegion: "Gauteng",
    addressCountry: "ZA"
  };

  var SERVICES = [
    { name: "Antenatal Care and Childbirth Education", slug: "antenatal-care" },
    { name: "Postnatal Care", slug: "postnatal-care" },
    { name: "Well-Baby Clinic and Immunisation", slug: "well-baby-clinic" },
    { name: "Family Planning", slug: "family-planning" },
    { name: "HIV Counselling and Testing", slug: "hiv-counselling" },
    { name: "Wound Care", slug: "wound-care" },
    { name: "Minor Ailments", slug: "minor-ailments" },
    { name: "Pregnancy Testing", slug: "pregnancy-testing" },
    { name: "Pap Smear", slug: "pap-smear" }
  ];

  var SEBOKENG_DIRECTIONS =
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(
      "Consulting Room 2, Mandela Square Pharmacy, Moshoeshoe Street, Sebokeng, 1983, Gauteng, South Africa"
    );

  var VANDERBIJLPARK_DIRECTIONS =
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(
      "Consulting Room 1, A1 Omega Building, FW Beyers Street, Vanderbijlpark, 1911, Gauteng, South Africa"
    );

  var PAGE_META = {
    home: {
      type: "WebPage",
      name: "Thelanom Healthcare Services | Nursing Care in Sebokeng and Vanderbijlpark",
      description:
        "Compassionate, professional and patient-centred healthcare for women, mothers, babies and families in Sebokeng and Vanderbijlpark.",
      breadcrumb: [{ name: "Home", path: "index.html" }]
    },
    about: {
      type: "AboutPage",
      name: "About Thelanom Healthcare Services",
      description:
        "Learn about Thelanom Healthcare Services, our patient-centred healthcare philosophy and our professional nursing care.",
      breadcrumb: [
        { name: "Home", path: "index.html" },
        { name: "About Us", path: "about.html" }
      ]
    },
    services: {
      type: "CollectionPage",
      name: "Healthcare Services",
      description:
        "Antenatal care, postnatal care, well-baby clinic and immunisation, family planning, HIV counselling and testing, wound care, minor ailments, pregnancy testing and Pap smear.",
      breadcrumb: [
        { name: "Home", path: "index.html" },
        { name: "Our Services", path: "services.html" }
      ]
    },
    locations: {
      type: "CollectionPage",
      name: "Our Locations",
      description:
        "Visit Thelanom Healthcare Services in Sebokeng or Vanderbijlpark, Gauteng.",
      breadcrumb: [
        { name: "Home", path: "index.html" },
        { name: "Our Locations", path: "locations.html" }
      ]
    },
    contact: {
      type: "ContactPage",
      name: "Contact Thelanom Healthcare Services",
      description:
        "Contact Thelanom Healthcare Services by telephone or WhatsApp, find our clinic locations or send an appointment enquiry.",
      breadcrumb: [
        { name: "Home", path: "index.html" },
        { name: "Contact Us", path: "contact.html" }
      ]
    },
    privacy: {
      type: "WebPage",
      name: "Privacy Policy",
      description:
        "How Thelanom Healthcare Services handles personal information in line with South Africa's Protection of Personal Information Act.",
      breadcrumb: [
        { name: "Home", path: "index.html" },
        { name: "Privacy Policy", path: "privacy-policy.html" }
      ]
    },
    cookies: {
      type: "WebPage",
      name: "Cookie Policy",
      description:
        "How Thelanom Healthcare Services uses cookies and how you can manage your cookie preferences.",
      breadcrumb: [
        { name: "Home", path: "index.html" },
        { name: "Cookie Policy", path: "cookie-policy.html" }
      ]
    },
    disclaimer: {
      type: "WebPage",
      name: "Medical Disclaimer",
      description:
        "Important information about the general nature of website content and when to seek urgent medical attention.",
      breadcrumb: [
        { name: "Home", path: "index.html" },
        { name: "Medical Disclaimer", path: "disclaimer.html" }
      ]
    }
  };

  function absolute(path) {
    var canonical = document.querySelector('link[rel="canonical"]');
    var base = canonical ? new URL(".", canonical.href) : new URL("/", window.location.origin);
    return new URL(path, base).href;
  }

  function currentPageUrl() {
    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      return canonical.href;
    }
    return window.location.href.split("#")[0];
  }

  function buildServices() {
    return SERVICES.map(function (service) {
      return {
        "@type": "MedicalProcedure",
        name: service.name
      };
    });
  }

  function buildGraph() {
    var pageKey = document.body.getAttribute("data-page") || "home";
    var meta = PAGE_META[pageKey];
    if (!meta) {
      return null;
    }

    var root = new URL(".", absolute("index.html")).href;
    var orgId = root + "#organization";
    var personId = root + "#nomsa-matena";
    var websiteId = root + "#website";
    var sebokengId = root + "#sebokeng-clinic";
    var vanderbijlparkId = root + "#vanderbijlpark-clinic";
    var pageUrl = currentPageUrl();
    var graph = [];

    graph.push({
      "@type": "Organization",
      "@id": orgId,
      name: "Thelanom Healthcare Services",
      url: absolute("index.html"),
      logo: absolute("assets/logo/orange-helping-hand-emblem.png"),
      image: absolute("assets/logo/og-image.png"),
      telephone: PHONE,
      email: EMAIL,
      sameAs: [GOOGLE_PROFILE],
      founder: { "@id": personId },
      employee: { "@id": personId },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: PHONE,
          email: EMAIL,
          contactType: "appointments",
          areaServed: "ZA",
          availableLanguage: ["English"]
        }
      ],
      location: [
        {
          "@type": "Place",
          name: "Thelanom Healthcare Services - Sebokeng",
          address: SEBOKENG_ADDRESS
        },
        {
          "@type": "Place",
          name: "Thelanom Healthcare Services - Vanderbijlpark",
          address: VANDERBIJLPARK_ADDRESS
        }
      ]
    });

    graph.push({
      "@type": "Person",
      "@id": personId,
      name: "Nomsa Matena",
      jobTitle: "Private Nurse Practitioner",
      telephone: PHONE,
      email: EMAIL,
      worksFor: { "@id": orgId },
      identifier: {
        "@type": "PropertyValue",
        name: "Practice number",
        value: "0034169"
      },
      knowsAbout: ["General nursing", "Psychiatric nursing", "Community nursing"]
    });

    graph.push({
      "@type": "MedicalClinic",
      "@id": sebokengId,
      name: "Thelanom Healthcare Services - Sebokeng",
      url: absolute("locations.html"),
      telephone: PHONE,
      logo: absolute("assets/logo/orange-helping-hand-emblem.png"),
      image: absolute("assets/logo/og-image.png"),
      parentOrganization: { "@id": orgId },
      address: SEBOKENG_ADDRESS,
      areaServed: ["Sebokeng", "Vanderbijlpark", "Gauteng"],
      sameAs: [GOOGLE_PROFILE],
      hasMap: SEBOKENG_DIRECTIONS,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "10:00",
          closes: "17:00"
        }
      ],
      availableService: buildServices()
    });

    graph.push({
      "@type": "MedicalClinic",
      "@id": vanderbijlparkId,
      name: "Thelanom Healthcare Services - Vanderbijlpark",
      url: absolute("locations.html"),
      telephone: PHONE,
      logo: absolute("assets/logo/orange-helping-hand-emblem.png"),
      image: absolute("assets/logo/og-image.png"),
      parentOrganization: { "@id": orgId },
      address: VANDERBIJLPARK_ADDRESS,
      description: "Saturday consultations are by appointment only. Please contact the clinic to arrange an appointment.",
      areaServed: ["Vanderbijlpark", "Sebokeng", "Gauteng"],
      sameAs: [GOOGLE_PROFILE],
      hasMap: VANDERBIJLPARK_DIRECTIONS,
      availableService: buildServices()
    });

    graph.push({
      "@type": "WebSite",
      "@id": websiteId,
      url: absolute("index.html"),
      name: "Thelanom Healthcare Services",
      inLanguage: "en-ZA",
      publisher: { "@id": orgId }
    });

    var pageNode = {
      "@type": meta.type,
      "@id": pageUrl + "#webpage",
      url: pageUrl,
      name: meta.name,
      description: meta.description,
      inLanguage: "en-ZA",
      isPartOf: { "@id": websiteId },
      about: { "@id": orgId },
      primaryImageOfPage: absolute("assets/logo/og-image.png")
    };

    if (pageKey === "about") {
      pageNode.mainEntity = { "@id": personId };
    }

    if (pageKey === "home" || pageKey === "locations" || pageKey === "contact") {
      pageNode.about = [{ "@id": orgId }, { "@id": sebokengId }, { "@id": vanderbijlparkId }];
    }

    if (pageKey === "services") {
      pageNode.mainEntity = {
        "@type": "ItemList",
        name: "Healthcare services at Thelanom Healthcare Services",
        itemListElement: SERVICES.map(function (service, index) {
          return {
            "@type": "ListItem",
            position: index + 1,
            name: service.name,
            url: absolute("services.html#" + service.slug)
          };
        })
      };
    }

    graph.push(pageNode);

    graph.push({
      "@type": "BreadcrumbList",
      "@id": pageUrl + "#breadcrumb",
      itemListElement: meta.breadcrumb.map(function (item, index) {
        return {
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absolute(item.path)
        };
      })
    });

    return { "@context": "https://schema.org", "@graph": graph };
  }

  function inject() {
    if (document.querySelector("script[data-thelanom-schema]")) {
      return;
    }

    var graph = buildGraph();
    if (!graph) {
      return;
    }

    var script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-thelanom-schema", "");
    script.textContent = JSON.stringify(graph, null, 2);
    document.head.appendChild(script);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
