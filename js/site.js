<script>
  const heroMusic = document.getElementById("heroMusic");
  const musicToggle = document.getElementById("musicToggle");
  const musicText = document.getElementById("musicText");

  // Comfortable background volume
  heroMusic.volume = 0.35;

  musicToggle.addEventListener("click", async function () {

    if (heroMusic.paused) {

      try {
        await heroMusic.play();

        musicText.textContent = "Music Off";
        musicToggle.classList.add("playing");
        musicToggle.setAttribute("aria-pressed", "true");
        musicToggle.setAttribute(
          "aria-label",
          "Turn wedding music off"
        );

      } catch (error) {
        console.log("Music could not start:", error);
      }

    } else {

      heroMusic.pause();

      musicText.textContent = "Music On";
      musicToggle.classList.remove("playing");
      musicToggle.setAttribute("aria-pressed", "false");
      musicToggle.setAttribute(
        "aria-label",
        "Turn wedding music on"
      );
    }

  });
</script>

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const weddingDate = new Date('2026-10-17T17:00:00-05:00').getTime();

function updateCountdown(){
  const now = Date.now();
  const distance = Math.max(0, weddingDate - now);
  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
}
updateCountdown();
setInterval(updateCountdown,1000);

/* =========================================================
   SCROLL CUE
   Hide after the visitor begins scrolling
   ========================================================= */

const scrollCue = document.querySelector('.scroll-cue');

if (scrollCue) {

  window.addEventListener('scroll', () => {

    if (window.scrollY > 120) {
      scrollCue.classList.add('hidden');
    } else {
      scrollCue.classList.remove('hidden');
    }

  });

}
