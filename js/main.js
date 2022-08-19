let landingPage = document.querySelector(".landingPage");
let settingBtn = document.querySelector(".fa-gear");
let settingBox = document.querySelector(".settingBox");
let arrOfImages = ["3.jpg", "4.webp", "5.jpg", "6.jpg"];
// end variables

// changing landing page backgorund each 10 seconds
let randomBackground;
function randomizeBackround() {
  randomBackground = setInterval(() => {
    let imageIndex = Math.floor(Math.random() * arrOfImages.length);
    landingPage.style.backgroundImage = `url(../image/${arrOfImages[imageIndex]})`;
  }, 10000);
}

// open and close setting
settingBtn.onclick = () => {
  settingBox.classList.toggle("open");
};

// color theme

let colorBullets = document.querySelectorAll(".colorsList li");
colorBullets.forEach((bullet) => {
  bullet.onclick = (e) => {
    for (let i = 0; i < colorBullets.length; i++) {
      colorBullets[i].classList.remove("active");
    }
    bullet.classList.add("active");
    document.documentElement.style.setProperty(
      "--main--color",
      bullet.dataset.color
    );
    localStorage.mainColor = bullet.dataset.color;
  };
});

if (localStorage.mainColor) {
  document.documentElement.style.setProperty(
    "--main--color",
    localStorage.mainColor
  );
  for (let i = 0; i < colorBullets.length; i++) {
    colorBullets[i].classList.remove("active");
    if (colorBullets[i].dataset.color === localStorage.mainColor) {
      colorBullets[i].classList.add("active");
    }
  }
}
// end color theme

// random landing background options
let randomOptions = document.querySelectorAll(".op2 span");
randomOptions.forEach((option) => {
  option.onclick = () => {
    if (option.classList.contains("no")) {
      randomOptions[0].classList.remove("active");
      clearInterval(randomBackground);
      option.classList.add("active");
      localStorage.randomBackgroundImage = "no";
    } else {
      randomOptions[1].classList.remove("active");
      option.classList.add("active");
      randomizeBackround();
      localStorage.randomBackgroundImage = "yes";
    }
  };
});

if (localStorage.randomBackground != null) {
  if (localStorage.randomBackgroundImage == "yes") {
    randomizeBackround();
    randomOptions[0].classList.add("active");
    randomOptions[1].classList.remove("active");
  } else {
    randomOptions[1].classList.add("active");
    randomOptions[0].classList.remove("active");
  }
} else {
  randomOptions[0].classList.add("active");
  randomizeBackround();
}
//end random background options

// start image popup
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);

    if (img.alt != null) {
      let imageHeading = document.createElement("h3");
      let imageTitle = document.createTextNode(img.alt);
      imageHeading.appendChild(imageTitle);
      popupBox.appendChild(imageHeading);
    }

    let closeSpan = document.createElement("span");
    let x = document.createTextNode("X");
    closeSpan.appendChild(x);
    popupBox.appendChild(closeSpan);

    closeSpan.onclick = () => {
      overlay.remove();
      popupBox.remove();
    };
  });
});
//end image popup

// Navigation bulltets

let navBulltes = document.querySelectorAll(".navBulltes .bullet");
scrollToSection(navBulltes);

let ourSkills = document.querySelector(".skills"); // skills progress animation

window.onscroll = () => {
  let skillsOffsetTop = ourSkills.offsetTop;
  let skillsOuterHeight = ourSkills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.pageYOffset;
  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skills .skillBox .skillProgress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
  /*
  for (let i = 0; i < navBulltes.length; i++) {
    navBulltes[i].classList.remove("on");
  }
  if (scrollY >= 550 && scrollY < 1220) {
    navBulltes[0].classList.add("on");
  } else if (scrollY >= 1420 && scrollY < 2200) {
    navBulltes[1].classList.add("on");
  } else if (scrollY >= 2200 && scrollY < 3120) {
    navBulltes[2].classList.add("on");
  } else if (scrollY >= 3120 && scrollY < 4136) {
    navBulltes[3].classList.add("on");
  } else if (scrollY >= 4300 && scrollY < 4900) {
    navBulltes[4].classList.add("on");
  } else if (scrollY > 4900 && scrollY < 5654) {
    navBulltes[5].classList.add("on");
  } else if (scrollY >= 5654) {
    navBulltes[6].classList.add("on");
  }*/
};
//end nav bullets

// disable or enalbe nav bullets

let navBulletsOptions = document.querySelectorAll(".op3 span");
navBulletsOptions.forEach((option) => {
  option.onclick = () => {
    if (option.classList.contains("no")) {
      navBulletsOptions[0].classList.remove("active");
      diplayNavBullets(false);
      option.classList.add("active");
      localStorage.navBullets = "no";
    } else {
      navBulletsOptions[1].classList.remove("active");
      option.classList.add("active");
      diplayNavBullets(true);
      localStorage.navBullets = "yes";
    }
  };
});

if (localStorage.navBullets != null) {
  if (localStorage.navBullets == "yes") {
    diplayNavBullets(true);
    navBulletsOptions[0].classList.add("active");
    navBulletsOptions[1].classList.remove("active");
  } else {
    diplayNavBullets(false);
    navBulletsOptions[1].classList.add("active");
    navBulletsOptions[0].classList.remove("active");
  }
} else {
  diplayNavBullets(true);
  navBulletsOptions[0].classList.add("active");
}

function diplayNavBullets(flag = true) {
  let navDiv = document.querySelector(".navBulltes");
  if (flag) {
    navDiv.style.display = "block";
  } else {
    navDiv.style.display = "none";
  }
}
// end disable or enable nav bullets

//nav bar

let allLinks = document.querySelectorAll(".nav ul li a");
scrollToSection(allLinks);
let toggleMenuLink = document.querySelectorAll(".toggleMenue a");
scrollToSection(toggleMenuLink);

function scrollToSection(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(`.${element.dataset.section}`).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

function handleActive(ev) {
  ev.target.parentElements.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  ev.target.classList.add("active");
}

// reset Button functionalities
let reseBtn = document.querySelector(".reset");

reseBtn.onclick = () => {
  localStorage.clear();
  location.reload();
};

// meue toggling
let menuToggler = document.querySelector(".toggler");

menuToggler.onclick = () => {
  document.querySelector(".toggleMenue").classList.toggle("open");
};
