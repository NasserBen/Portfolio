var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};


window.addEventListener("scroll", function() {
    const floatingContact = document.querySelector('.floating-contact')
    if(window.innerWidth >= 600) {
        console.log("LOG")
        const contactBtnHeader = document.querySelector('.contact-button')
       
        const work = document.getElementById("work")
        const about = document.getElementById("about")
        const contact = document.getElementById("contact")
        const one = document.getElementById("one")
        const two = document.getElementById("two")
        const three = document.getElementById("three")
        if(window.scrollY > (contactBtnHeader.offsetHeight + contactBtnHeader.offsetTop)){
            floatingContact.classList.add('contact-active')
            one.classList.add('current-section')
        } else {
            floatingContact.classList.remove('contact-active')
            one.classList.remove('current-section')
            
        }
    

        if(window.scrollY > (work.offsetHeight + work.offsetTop)&& window.scrollY < (about.offsetHeight + about.offsetTop)){
            one.classList.remove('current-section')
            two.classList.add('current-section')
        } else {
            two.classList.remove('current-section')
        }

        if(window.scrollY > (about.offsetHeight + about.offsetTop)){
            one.classList.remove('current-section')
            three.classList.add('current-section')
        } else {
            three.classList.remove('current-section')
        }

    }
    else {
        floatingContact.classList.remove('contact-active')
    }
  });


