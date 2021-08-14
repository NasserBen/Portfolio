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
window.addEventListener("scroll", function () {
  const desktopMenu = document.querySelector(".desktop-menu");
  if (window.innerWidth >= 1025) {
    //Enable desktop menu

    const contactBtnHeader = document.querySelector(".contact-button");
    const workSection = document.getElementById("work");
    const aboutSection = document.getElementById("about");
    const one = document.getElementById("one");
    const two = document.getElementById("two");
    const three = document.getElementById("three");

    // Adding or removing menu classes depending on current scroll section
    if (
      window.scrollY >
      contactBtnHeader.offsetHeight + contactBtnHeader.offsetTop
    ) {
      desktopMenu.classList.add("desktop-menu-active");
      one.classList.add("current-section");
    } else {
      desktopMenu.classList.remove("desktop-menu-active");
      one.classList.remove("current-section");
    }

    if (
      window.scrollY > workSection.offsetHeight + workSection.offsetTop &&
      window.scrollY < aboutSection.offsetHeight + aboutSection.offsetTop
    ) {
      one.classList.remove("current-section");
      two.classList.add("current-section");
    } else {
      two.classList.remove("current-section");
    }

    if (window.scrollY > aboutSection.offsetHeight + aboutSection.offsetTop) {
      one.classList.remove("current-section");
      three.classList.add("current-section");
    } else {
      three.classList.remove("current-section");
    }
  } else {
    // Remove desktop menu
    desktopMenu.classList.remove("desktop-menu-active");
  }
});
// On load
navSlide();

function submitToAPI(e) {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let desc = document.getElementById("message").value;
  let form = document.getElementById("contact-form");
  let data = {
    name: name,
    email: email,
    desc: desc,
  };

  if (form.checkValidity()) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open(
      "POST",
      "https://09bj374gme.execute-api.us-west-1.amazonaws.com/contact/email"
    );
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(data));
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4) {
        let response = JSON.parse(xmlhttp.responseText);
        if (xmlhttp.status === 200) {
          form.innerHTML =
            "<p style='color:white; font-weight: 700;'>Successfully sent.</p>";
          form.reset();
        } else {
          form.innerHTML =
            "<p style='color:white; font-weight: 700;' >Error. Message not sent. Please try again, or contact using email.</p>";
          form.reset();
        }
      }
    };
  } else {
    alert("Please enter valid information before sending.");
  }
}
