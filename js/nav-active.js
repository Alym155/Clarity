(function () {
  "use strict";

  var navbar = document.querySelector(".navbar");
  var links = Array.prototype.slice
    .call(
      document.querySelectorAll(
        "#navbarSupportedContent .navbar-nav > .nav-item > .nav-link"
      )
    )
    .filter(function (link) {
      var href = link.getAttribute("href");
      return (
        href &&
        href.charAt(0) === "#" &&
        href.length > 1 &&
        !link.classList.contains("dropdown-toggle")
      );
    });

  if (!links.length) return;

  var sections = links.map(function (link) {
    return document.querySelector(link.getAttribute("href"));
  });

  function update() {
    var line = (navbar ? navbar.offsetHeight : 0) + 24;
    var current = -1;

    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      if (!section) continue;

      var rect = section.getBoundingClientRect();
      if (rect.top <= line && rect.bottom > line) {
        current = i;
        break;
      }
    }

    var atBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2;
    if (atBottom) current = sections.length - 1;

    for (var j = 0; j < links.length; j++) {
      links[j].classList.toggle("active", j === current);
    }
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();
