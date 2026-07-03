// ==========================================
// today.html 専用の処理（空き一覧を表示する）
// ==========================================
let year, month, day;

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  
  if (params.get("year") && params.get("month") && params.get("day")) {
    year = parseInt(params.get("year"));
    month = parseInt(params.get("month"));
    day = parseInt(params.get("day"));
  } else {
    const todayObj = new Date();
    year = todayObj.getFullYear();
    month = todayObj.getMonth() + 1;
    day = todayObj.getDate();
  }

  const todayDisplay = document.getElementById("today-date");
  if (todayDisplay) {
    todayDisplay.textContent = `${month}月${day}日 の空き一覧`;
  }
  
  renderAvailableRooms();
});

const allRooms = [
  "301", "401", "501", "502", "503", "504", "505", "506", "507", "508", 
  "601", "701", "702", "703", "704", "705", "706", "707", "801", "901", "902"
];

function renderAvailableRooms() {
  const lunchTbody = document.getElementById('lunch-list');
  const afterTbody = document.getElementById('afterschool-list');

  if (!lunchTbody || !afterTbody) return;

  lunchTbody.innerHTML = "";
  afterTbody.innerHTML = "";

  const reservationList = JSON.parse(localStorage.getItem("reservations")) || [];

  allRooms.forEach(roomNum => {
    const isLunchReserved = reservationList.some(res => 
      String(res.year) === String(year) &&
      String(res.month) === String(month) &&
      String(res.day) === String(day) &&
      res.room === roomNum &&
      res.time === "昼休み"
    );

    const isAfterReserved = reservationList.some(res => 
      String(res.year) === String(year) &&
      String(res.month) === String(month) &&
      String(res.day) === String(day) &&
      res.room === roomNum &&
      res.time === "放課後"
    );

    if (!isLunchReserved) {
      const tr = document.createElement('tr');
      tr.style.cursor = "pointer";
      tr.innerHTML = `<td>${roomNum}</td>`;
      tr.addEventListener('click', () => {
        location.href = `reserve.html?year=${year}&month=${month}&day=${day}&room=${roomNum}&time=昼休み`;
      });
      lunchTbody.appendChild(tr);
    }

    if (!isAfterReserved) {
      const tr = document.createElement('tr');
      tr.style.cursor = "pointer";
      tr.innerHTML = `<td>${roomNum}</td>`;
      tr.addEventListener('click', () => {
        location.href = `reserve.html?year=${year}&month=${month}&day=${day}&room=${roomNum}&time=放課後`;
      });
      afterTbody.appendChild(tr);
    }
  });
}