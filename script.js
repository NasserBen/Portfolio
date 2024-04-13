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

// For Desktop Menu
const desktopMenu = document.querySelector(".desktop-menu");
const contactBtnHeader = document.querySelector(".resume-button");
const workSection = document.getElementById("work");
const aboutSection = document.getElementById("about");
const sections = [
  document.getElementById("one"),
  document.getElementById("two"),
  document.getElementById("three"),
];

function toggleSectionClass(index) {
  sections.forEach((section, i) => {
    if (i === index) {
      section.classList.add("current-section");
    } else {
      section.classList.remove("current-section");
    }
  });
}

function updateMenuOnScroll() {
  const scrollY = window.scrollY;
  const contactBtnOffset =
    contactBtnHeader.offsetHeight + contactBtnHeader.offsetTop;
  const workSectionOffset = workSection.offsetHeight + workSection.offsetTop;
  const aboutSectionOffset = aboutSection.offsetHeight + aboutSection.offsetTop;
  const isDesktop = window.innerWidth >= 1025;

  if (isDesktop) {
    if (scrollY > contactBtnOffset) {
      desktopMenu.classList.add("desktop-menu-active");
      toggleSectionClass(0);
    } else {
      desktopMenu.classList.remove("desktop-menu-active");
    }

    if (scrollY > workSectionOffset && scrollY < aboutSectionOffset) {
      toggleSectionClass(1);
    } else if (scrollY > aboutSectionOffset) {
      toggleSectionClass(2);
    }
  } else {
    desktopMenu.classList.remove("desktop-menu-active");
  }
}

window.addEventListener("scroll", updateMenuOnScroll);

// On load
navSlide();
