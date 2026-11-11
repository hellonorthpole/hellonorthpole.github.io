/* Hello North Pole price switch (11 Nov 2026, Ruby: early bird £7.99 ends 30 November, £9.99 from 1 December, UK time).
   Pages are written with the early-bird price; from 1 December (UK) this swaps the buttons and price box to £9.99.
   Test any day with ?np_today=2026-12-01 */
(function () {
  function today() {
    var t = (new URLSearchParams(location.search).get("np_today") || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (t) return { y: +t[1], m: +t[2], d: +t[3] };
    var p = {};
    new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", year: "numeric", month: "numeric", day: "numeric" })
      .formatToParts(new Date()).forEach(function (x) { p[x.type] = +x.value; });
    return { y: p.year, m: p.month, d: p.day };
  }
  var n = today();
  if (!(n.y > 2026 || (n.y === 2026 && n.m === 12))) return;   // still early bird
  document.querySelectorAll(".big-btn").forEach(function (a) { a.textContent = a.textContent.replace("£7.99", "£9.99"); });
  document.querySelectorAll(".price").forEach(function (b) {
    var now = b.querySelector(".now"), was = b.querySelector(".was"), per = b.querySelector(".per");
    if (now) now.textContent = "£9.99";
    if (was) was.style.display = "none";
    if (per) per.textContent = "per child";
  });
  document.querySelectorAll(".preview").forEach(function (e) {
    if (e.textContent.indexOf("£7.99") > -1) e.textContent = "🎄 Bookings are open! £9.99 per child, and brothers and sisters get 25% off.";
  });
})();
