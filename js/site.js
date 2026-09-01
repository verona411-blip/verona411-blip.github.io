/* =========================================================
   GARY & VERONA WEDDING WEBSITE
   SITE JAVASCRIPT
   ========================================================= */


/* =========================================================
   NAVIGATION
   Change navigation styling after scrolling
   ========================================================= */

const nav = document.getElementById("nav");

if (nav) {
  window.addEventListener("scroll", function () {
    nav.classList.toggle("scrolled", window.scrollY > 60);
  });
}


/* =========================================================
   REVEAL ANIMATIONS
   ========================================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const observer = new IntersectionObserver(
    function (entries) {

      entries.forEach(function (entry) {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          /* Stop watching after it has appeared */
          observer.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12
    }
  );


  revealElements.forEach(function (element) {
    observer.observe(element);
  });

} else {

  /* Fallback for older browsers */
  revealElements.forEach(function (element) {
    element.classList.add("visible");
  });

}


/* =========================================================
   WEDDING COUNTDOWN
   October 17, 2026 · 5:00 PM
   ========================================================= */

const weddingDate =
  new Date("2026-10-17T17:00:00-05:00").getTime();


function updateCountdown() {

  const now = Date.now();

  const distance =
    Math.max(0, weddingDate - now);


  const days =
    Math.floor(distance / 86400000);

  const hours =
    Math.floor(
      (distance % 86400000) / 3600000
    );

  const minutes =
    Math.floor(
      (distance % 3600000) / 60000
    );

  const seconds =
    Math.floor(
      (distance % 60000) / 1000
    );


  const daysElement =
    document.getElementById("days");

  const hoursElement =
    document.getElementById("hours");

  const minutesElement =
    document.getElementById("minutes");

  const secondsElement =
    document.getElementById("seconds");


  if (daysElement) {
    daysElement.textContent = days;
  }

  if (hoursElement) {
    hoursElement.textContent = hours;
  }

  if (minutesElement) {
    minutesElement.textContent = minutes;
  }

  if (secondsElement) {
    secondsElement.textContent = seconds;
  }

}


updateCountdown();

setInterval(
  updateCountdown,
  1000
);


/* =========================================================
   HERO MUSIC
   ========================================================= */

const heroMusic =
  document.getElementById("heroMusic");

const musicToggle =
  document.getElementById("musicToggle");

const musicText =
  document.getElementById("musicText");


if (
  heroMusic &&
  musicToggle &&
  musicText
) {

  /* Comfortable background volume */
  heroMusic.volume = 0.35;


  musicToggle.addEventListener(
    "click",
    async function () {

      if (heroMusic.paused) {

        try {

          await heroMusic.play();

          musicText.textContent =
            "Music Off";

          musicToggle.classList.add(
            "playing"
          );

          musicToggle.setAttribute(
            "aria-pressed",
            "true"
          );

          musicToggle.setAttribute(
            "aria-label",
            "Turn wedding music off"
          );

        } catch (error) {

          console.log(
            "Music could not start:",
            error
          );

        }

      } else {

        heroMusic.pause();

        musicText.textContent =
          "Music On";

        musicToggle.classList.remove(
          "playing"
        );

        musicToggle.setAttribute(
          "aria-pressed",
          "false"
        );

        musicToggle.setAttribute(
          "aria-label",
          "Turn wedding music on"
        );

      }

    }
  );

}


/* =========================================================
   OPTIONAL SCROLL CUE
   This only activates if .scroll-cue exists
   ========================================================= */

const scrollCue =
  document.querySelector(".scroll-cue");


if (scrollCue) {

  window.addEventListener(
    "scroll",
    function () {

      if (window.scrollY > 120) {

        scrollCue.classList.add(
          "hidden"
        );

      } else {

        scrollCue.classList.remove(
          "hidden"
        );

      }

    }
  );

}
