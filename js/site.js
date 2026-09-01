/* =========================================================
   GARY & VERONA WEDDING WEBSITE
   MASTER SITE JAVASCRIPT
   ========================================================= */


/* =========================================================
   NAVIGATION
   Adds the "scrolled" class after the visitor scrolls down.
   ========================================================= */

const nav = document.getElementById("nav");

if (nav) {
  const updateNav = () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
  };

  updateNav();

  window.addEventListener("scroll", updateNav, {
    passive: true
  });
}


/* =========================================================
   REVEAL ANIMATIONS
   Makes .reveal sections appear as guests scroll.
   Includes a fallback so content is never permanently hidden.
   ========================================================= */

const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length) {

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -20px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  }

  /*
     Safety fallback:
     if the browser fails to trigger IntersectionObserver,
     make all content visible after a short delay.
  */

  window.setTimeout(() => {

    revealElements.forEach((element) => {

      if (!element.classList.contains("visible")) {
        element.classList.add("visible");
      }

    });

  }, 1800);
}


/* =========================================================
   WEDDING COUNTDOWN
   Saturday, October 17, 2026
   5:00 PM Central Time
   ========================================================= */

const weddingDate =
  new Date("2026-10-17T17:00:00-05:00").getTime();

const daysElement =
  document.getElementById("days");

const hoursElement =
  document.getElementById("hours");

const minutesElement =
  document.getElementById("minutes");

const secondsElement =
  document.getElementById("seconds");


function updateCountdown() {

  if (
    !daysElement ||
    !hoursElement ||
    !minutesElement ||
    !secondsElement
  ) {
    return;
  }

  const now = Date.now();

  let distance = weddingDate - now;

  if (distance < 0) {
    distance = 0;
  }

  const days =
    Math.floor(distance / (1000 * 60 * 60 * 24));

  const hours =
    Math.floor(
      (distance % (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
    );

  const minutes =
    Math.floor(
      (distance % (1000 * 60 * 60)) /
      (1000 * 60)
    );

  const seconds =
    Math.floor(
      (distance % (1000 * 60)) /
      1000
    );


  daysElement.textContent = days;
  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
  secondsElement.textContent = seconds;
}


updateCountdown();

const countdownTimer =
  window.setInterval(updateCountdown, 1000);


/* =========================================================
   HERO MUSIC
   Music begins only after the guest clicks the button.
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

  heroMusic.volume = 0.35;


  function setMusicButtonState(isPlaying) {

    if (isPlaying) {

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

    } else {

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


  setMusicButtonState(false);


  musicToggle.addEventListener(
    "click",
    async () => {

      if (heroMusic.paused) {

        try {

          await heroMusic.play();

          setMusicButtonState(true);

        } catch (error) {

          console.error(
            "Wedding music could not start:",
            error
          );

          setMusicButtonState(false);

        }

      } else {

        heroMusic.pause();

        setMusicButtonState(false);

      }

    }
  );


  heroMusic.addEventListener(
    "pause",
    () => {

      if (!heroMusic.ended) {
        setMusicButtonState(false);
      }

    }
  );


  heroMusic.addEventListener(
    "play",
    () => {
      setMusicButtonState(true);
    }
  );

}


/* =========================================================
   JAZZ PLAYER
   Prevents the hero music and jazz player from competing.
   If the guest starts the visible jazz recording,
   the hero background music pauses.
   ========================================================= */

const jazzAudio =
  document.querySelector(
    ".jazz-track audio"
  );


if (jazzAudio && heroMusic) {

  jazzAudio.addEventListener(
    "play",
    () => {

      if (!heroMusic.paused) {
        heroMusic.pause();
      }

    }
  );

}


/* =========================================================
   SMOOTH INTERNAL LINKS
   Handles links such as #story, #details, #rsvp, etc.
   ========================================================= */

const internalLinks =
  document.querySelectorAll('a[href^="#"]');


internalLinks.forEach((link) => {

  link.addEventListener(
    "click",
    (event) => {

      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#"
      ) {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();


      const navHeight =
        nav ? nav.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        navHeight;


      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    }
  );

});


/* =========================================================
   OPTIONAL SCROLL CUE
   Only runs if an element with .scroll-cue exists.
   Your current site does not require this element.
   ========================================================= */

const scrollCue =
  document.querySelector(".scroll-cue");


if (scrollCue) {

  const updateScrollCue = () => {

    if (window.scrollY > 120) {

      scrollCue.classList.add(
        "hidden"
      );

    } else {

      scrollCue.classList.remove(
        "hidden"
      );

    }

  };


  updateScrollCue();

  window.addEventListener(
    "scroll",
    updateScrollCue,
    {
      passive: true
    }
  );

}


/* =========================================================
   IMAGE SAFETY
   Keeps a missing image from breaking surrounding layout.
   ========================================================= */

const siteImages =
  document.querySelectorAll("img");


siteImages.forEach((image) => {

  image.addEventListener(
    "error",
    () => {

      console.warn(
        "Image could not load:",
        image.getAttribute("src")
      );

    }
  );

});


/* =========================================================
   PAGE READY SAFETY
   Ensures visible content after the page has loaded.
   ========================================================= */

window.addEventListener(
  "load",
  () => {

    document
      .querySelectorAll(".reveal")
      .forEach((element) => {

        /*
           Elements already in the viewport
           should be visible immediately.
        */

        const rect =
          element.getBoundingClientRect();

        if (
          rect.top < window.innerHeight &&
          rect.bottom > 0
        ) {
          element.classList.add(
            "visible"
          );
        }

      });

  }
);


/* =========================================================
   END OF SITE JAVASCRIPT
   ========================================================= */
