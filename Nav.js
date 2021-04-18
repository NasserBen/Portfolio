
const navSlide = () => {
  const burger = document.querySelector('.burger')
  const menuRotate = document.querySelector('.menuRotate')
  const nav = document.querySelector('.nav-links')
  const navLinks = document.querySelectorAll('.nav-links li')
  let closed = true

  burger.addEventListener('click', openNav)
  nav.addEventListener('click', e => {
   
    if (e.target == e.currentTarget) closeNav() 
  })

  function openNav () {
  
    if (!closed) {
      closeNav()
      return
    }
    closed = false

    //Animate Burger
    burger.classList.toggle('active')
    menuRotate.classList.toggle('active')
    //Toggle Nav
    nav.classList.toggle('nav-active')
    //Animate Links
    navLinks.forEach((link, i) => {
    // Add nav link animations
    link.style.animation = `navLinkFade 0.5s ease forwards  ${i / 7 + 0.3}s`
    link.addEventListener('click', closeNav)
    })
  }
  
  function closeNav () {
    closed = true
    //Reset Animated Burger
    burger.classList.toggle('active')
    menuRotate.classList.toggle('active')
    //Close Nav
    nav.classList.toggle('nav-active')
    // Reset Nav Link Animation
    navLinks.forEach(link => (link.style.animation = ''))
  }
}

// For Desktop Menu
window.addEventListener("scroll", function() {
  const desktopMenu = document.querySelector('.desktop-menu')
  
  if(window.innerWidth >= 1025) { //Enable desktop menu
      const contactBtnHeader = document.querySelector('.contact-button')
      const workSection = document.getElementById("work")
      const aboutSection = document.getElementById("about")
      const one = document.getElementById("one")
      const two = document.getElementById("two")
      const three = document.getElementById("three")
      
      // Adding or removing menu classes depending on current scroll section
      if(window.scrollY > (contactBtnHeader.offsetHeight + contactBtnHeader.offsetTop)){
          desktopMenu.classList.add('desktop-menu-active')
          one.classList.add('current-section')
      } else {
          desktopMenu.classList.remove('desktop-menu-active')
          one.classList.remove('current-section')  
      }
  
      if(window.scrollY > (workSection.offsetHeight + workSection.offsetTop)&& window.scrollY < (aboutSection.offsetHeight + aboutSection.offsetTop)){
          one.classList.remove('current-section')
          two.classList.add('current-section')
      } else {
          two.classList.remove('current-section')
      }

      if(window.scrollY > (aboutSection.offsetHeight + aboutSection.offsetTop)){
          one.classList.remove('current-section')
          three.classList.add('current-section')
      } else {
          three.classList.remove('current-section')
      }

  } else { // Remove desktop menu
      desktopMenu.classList.remove('desktop-menu-active')
  }
});
// On load
navSlide()