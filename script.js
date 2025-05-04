// Memo
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

//Navigation
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const menuRotate = document.querySelector(".menuRotate");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");
  let navActive = false;

  nav.addEventListener("click", (e) => {
    if (e.target == e.currentTarget) toggleNav();
  });

  burger.addEventListener("click", toggleNav);

  function toggleNav() {
    //Animate Burger
    navActive = !navActive;
    burger.classList.toggle("active");
    menuRotate.classList.toggle("active");
    //Toggle Nav
    nav.classList.toggle("nav-active");
    //Animate Links
    if (navActive) {
      navLinks.forEach((link, i) => {
        // Add nav link animations
        link.style.animation = `navLinkFade 0.5s ease forwards  ${
          i / 7 + 0.3
        }s`;
        link.addEventListener("click", toggleNav);
      });
    } else {
      navLinks.forEach((link) => (link.style.animation = ""));
    }
  }
};

// Wait for DOM to be fully loaded before running the code
document.addEventListener("DOMContentLoaded", function () {
  const desktopMenu = document.querySelector(".desktop-menu");
  const contactBtnHeader = document.querySelector(".resume-button");

  if (!desktopMenu) {
    return;
  }

  if (!contactBtnHeader) {
    console.error("Resume button (.resume-button) not found");
  }

  const sectionMappings = [
    {
      section: document.getElementById("experience"),
      link: document.getElementById("experience-link"),
    },
    {
      section: document.getElementById("work"),
      link: document.getElementById("work-link"),
    },
    {
      section: document.getElementById("about"),
      link: document.getElementById("about-link"),
    },
    {
      section: document.getElementById("education"),
      link: document.getElementById("education-link"),
    },
    {
      section: document.getElementById("contact"),
      link: document.getElementById("contact-link"),
    },
  ];

  // Filter out any mappings where either section or link is null
  const validSectionMappings = sectionMappings.filter((mapping) => {
    const isValid = mapping.section && mapping.link;
    if (!isValid) {
      console.warn(
        `Missing element for mapping: ${
          mapping.section ? "Link" : "Section"
        } not found`
      );
    }
    return isValid;
  });

  function toggleSectionClass(activeLink) {
    validSectionMappings.forEach(({ link }) => {
      if (activeLink === link) {
        link.classList.add("current-section");
      } else {
        link.classList.remove("current-section");
      }
    });
  }

  function updateMenuOnScroll() {
    const scrollY = window.scrollY || window.pageYOffset; // Cross-browser support
    const isDesktop = window.innerWidth >= 1025;

    if (isDesktop) {
      let current = document.getElementById("experience-link") || null;

      // Find the section that's currently in view
      for (let i = 0; i < validSectionMappings.length; i++) {
        const { section } = validSectionMappings[i];
        const sectionTop = section.getBoundingClientRect().top + scrollY;

        // Check if we've scrolled past the beginning of this section
        if (scrollY >= sectionTop - 100) {
          current = validSectionMappings[i].link;
        }
      }

      toggleSectionClass(current);

      // Only try to use contactBtnHeader if it exists
      if (contactBtnHeader && desktopMenu) {
        const headerPos =
          contactBtnHeader.getBoundingClientRect().top + scrollY;
        if (scrollY >= headerPos) {
          desktopMenu.classList.add("desktop-menu-active");
        } else {
          desktopMenu.classList.remove("desktop-menu-active");
        }
      }
    } else if (desktopMenu) {
      desktopMenu.classList.remove("desktop-menu-active");
    }
  }

  updateMenuOnScroll();
  window.addEventListener("scroll", updateMenuOnScroll);
  window.addEventListener("resize", updateMenuOnScroll);
});

// On load
navSlide();
