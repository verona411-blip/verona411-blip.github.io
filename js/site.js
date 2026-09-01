/* =========================================================
   GARY & VERONA WEDDING WEBSITE
   MASTER SITE JAVASCRIPT
   ========================================================= */


/* =========================================================
   NAVIGATION
   Adds a background after scrolling.
   ========================================================= */

const nav = document.getElementById("nav");

function updateNav() {
  if (!nav) return;

  nav.classList.toggle(
    "scrolled",
    window.scrollY > 60
  );
}

updateNav();

window.addEventListener(
  "scroll",
  updateNav,
  { passive: true }
);


/* =========================================================
   REVEAL ANIMATIONS
   Reveals sections as they enter the viewport.
   Includes a fallback so content never stays hidden.
   ========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");

if (revealElements.length > 0) {

  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -25px 0px"
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
     if anything prevents the observer
     from activating, display the content.
  */

  window.setTimeout(() => {

    revealElements.forEach((element) => {

      element.classList.add(
        "visible"
      );

    });

  }, 2000);

}


/* =========================================================
   WEDDING COUNTDOWN
   Saturday, October 17, 2026
   5:00 PM Central Daylight Time
   ========================================================= */

const weddingDate =
  new Date(
    "2026-10-17T17:00:00-05:00"
  ).getTime();


const daysElement =
  document.getElementById("days");

const hoursElement =
  document.getElementById("hours");

const minutesElement =
  document.getElementById("minutes");

const secondsElement =
  document.getElementById("seconds");


function updateCountdown() {

  /*
     If the countdown does not exist,
     simply stop here without breaking
     the rest of the website.
  */

  if (
    !daysElement ||
    !hoursElement ||
    !minutesElement ||
    !secondsElement
  ) {
    return;
  }


  const now = Date.now();

  let distance =
    weddingDate - now;


  if (distance <= 0) {

    daysElement.textContent = "0";
    hoursElement.textContent = "0";
    minutesElement.textContent = "0";
    secondsElement.textContent = "0";

    return;
  }


  const days =
    Math.floor(
      distance /
      (1000 * 60 * 60 * 24)
    );


  const hours =
    Math.floor(
      (
        distance %
        (1000 * 60 * 60 * 24)
      ) /
      (1000 * 60 * 60)
    );


  const minutes =
    Math.floor(
      (
        distance %
        (1000 * 60 * 60)
      ) /
      (1000 * 60)
    );


  const seconds =
    Math.floor(
      (
        distance %
        (1000 * 60)
      ) /
      1000
    );


  daysElement.textContent =
    days;

  hoursElement.textContent =
    hours;

  minutesElement.textContent =
    minutes;

  secondsElement.textContent =
    seconds;

}


updateCountdown();

window.setInterval(
  updateCountdown,
  1000
);


/* =========================================================
   HERO MUSIC
   Background music begins only when the guest clicks.
   ========================================================= */

const heroMusic =
  document.getElementById("heroMusic");

const musicToggle =
  document.getElementById("musicToggle");

const musicText =
  document.getElementById("musicText");


function updateMusicButton(isPlaying) {

  if (
    !musicToggle ||
    !musicText
  ) {
    return;
  }


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


if (
  heroMusic &&
  musicToggle &&
  musicText
) {

  heroMusic.volume = 0.35;

  updateMusicButton(false);


  musicToggle.addEventListener(
    "click",
    async () => {

      /*
         If music is currently paused,
         attempt to start it.
      */

      if (heroMusic.paused) {

        try {

          await heroMusic.play();

          updateMusicButton(true);

        } catch (error) {

          console.warn(
            "Wedding music could not begin:",
            error
          );

          updateMusicButton(false);

        }

      } else {

        /*
           Music is currently playing,
           so pause it.
        */

        heroMusic.pause();

        updateMusicButton(false);

      }

    }
  );


  heroMusic.addEventListener(
    "play",
    () => {
      updateMusicButton(true);
    }
  );


  heroMusic.addEventListener(
    "pause",
    () => {
      updateMusicButton(false);
    }
  );


  heroMusic.addEventListener(
    "ended",
    () => {
      updateMusicButton(false);
    }
  );

}


/* =========================================================
   JAZZ PLAYER
   Pauses hero music when the visible jazz player starts.
   ========================================================= */

const jazzPlayers =
  document.querySelectorAll(
    ".jazz-interlude audio"
  );


jazzPlayers.forEach((player) => {

  /*
     Ignore the hero background audio
     in case the selector ever changes.
  */

  if (player === heroMusic) {
    return;
  }


  player.addEventListener(
    "play",
    () => {

      /*
         Pause hero background music.
      */

      if (
        heroMusic &&
        !heroMusic.paused
      ) {
        heroMusic.pause();
      }


      /*
         Stop any other jazz/audio
         player that may already be playing.
      */

      jazzPlayers.forEach(
        (otherPlayer) => {

          if (
            otherPlayer !== player &&
            !otherPlayer.paused
          ) {
            otherPlayer.pause();
          }

        }
      );

    }
  );

});


/* =========================================================
   SMOOTH INTERNAL PAGE LINKS
   Handles #story, #details, #attire, etc.
   ========================================================= */

const internalLinks =
  document.querySelectorAll(
    'a[href^="#"]'
  );


internalLinks.forEach((link) => {

  link.addEventListener(
    "click",
    (event) => {

      const href =
        link.getAttribute("href");


      if (
        !href ||
        href === "#"
      ) {
        return;
      }


      let target;

      try {

        target =
          document.querySelector(href);

      } catch (error) {

        return;

      }


      if (!target) {
        return;
      }


      event.preventDefault();


      /*
         Compensate for the fixed navigation bar.
      */

      const navHeight =
        nav
          ? nav.offsetHeight
          : 0;


      const targetTop =
        target
          .getBoundingClientRect()
          .top +
        window.pageYOffset -
        navHeight;


      window.scrollTo({
        top: targetTop,
        behavior: "smooth"
      });

    }
  );

});


/* =========================================================
   HERO IMAGE LOAD SAFETY
   Logs a warning if an image path is incorrect.
   ========================================================= */

const images =
  document.querySelectorAll("img");


images.forEach((image) => {

  image.addEventListener(
    "error",
    () => {

      console.warn(
        "Image failed to load:",
        image.getAttribute("src")
      );

    }
  );

});


/* =========================================================
   INITIAL PAGE LOAD
   Ensures elements already visible on screen appear immediately.
   ========================================================= */

window.addEventListener(
  "load",
  () => {

    /*
       Update navigation state after
       all assets finish loading.
    */

    updateNav();


    /*
       Reveal anything already inside
       the initial viewport.
    */

    revealElements.forEach((element) => {

      const rect =
        element.getBoundingClientRect();


      if (
        rect.top <
        window.innerHeight &&
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
   WINDOW RESIZE
   Keeps layout-dependent behavior stable.
   ========================================================= */

let resizeTimer;

window.addEventListener(
  "resize",
  () => {

    clearTimeout(
      resizeTimer
    );


    resizeTimer =
      setTimeout(() => {

        updateNav();

      }, 150);

  }
);


/* =========================================================
   END OF SITE JAVASCRIPT
   ========================================================= */
