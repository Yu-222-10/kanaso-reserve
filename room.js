// ==========================================
// room.html 専用の処理（アコーディオン画面用）
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
　
  const dateDisplay = document.getElementById("selected-date");
  if (dateDisplay) {
    dateDisplay.textContent = `${year}年${month}月${day}日の使用状況`;
  }

  // ページが開かれたら、ローカルストレージの予約データをもとに〇✕を最新状態に書き換える
  updateRoomTableStatus();
});

// アコーディオンの〇✕マスをクリックした時に予約画面へ飛ばす命令
function goReservation(roomNum, time) {
  // 今日の日付（判定用）
  const todayObj = new Date();
  const todayTarget = new Date(todayObj.getFullYear(), todayObj.getMonth(), todayObj.getDate());
  const selectedTarget = new Date(year, month - 1, day);

  if (selectedTarget < todayTarget) {
    alert("過去の日付は予約できません。");
    return; 
  }

  // 予約状況をチェックして、空いていれば予約画面へ
  const suffix = (time === '昼休み') ? '-lunch' : '-after';
  const cellId = roomNum + suffix;
  const targetCell = document.getElementById(cellId);

  if (targetCell && targetCell.textContent.trim() === "〇") {
    location.href = `reserve.html?year=${year}&month=${month}&day=${day}&room=${roomNum}&time=${time}`;
  }
}

// 💾 予約データを見て、画面上のテーブルの〇✕をリアルタイムに更新する関数
function updateRoomTableStatus() {
  const reservationList = JSON.parse(localStorage.getItem("reservations")) || [];
  
  const allRooms = ["301", "401", "501", "502", "503", "504", "505", "506", "507", "508", "601", "701", "702", "703", "704", "705", "706", "707", "801", "901", "902"];

  allRooms.forEach(room => {
    const lunchEl = document.getElementById(`${room}-lunch`);
    const afterEl = document.getElementById(`${room}-after`);

    // 昼休みの予約があるかチェック
    const hasLunch = reservationList.some(res => 
      String(res.year) === String(year) && String(res.month) === String(month) && String(res.day) === String(day) && String(res.room).replace("号室", "") === String(room) && res.time === "昼休み"
    );
    if (lunchEl) {
      lunchEl.textContent = hasLunch ? "×" : "〇"; // 予約があれば✕、なければ〇
    }

    // 放課後の予約があるかチェック
    const hasAfter = reservationList.some(res => 
      String(res.year) === String(year) && String(res.month) === String(month) && String(res.day) === String(day) && String(res.room).replace("号室", "") === String(room) && res.time === "放課後"
    );
    if (afterEl) {
      afterEl.textContent = hasAfter ? "×" : "〇"; // 予約があれば✕、なければ〇
    }
  });
}