// ==========================================
// today.html 専用：空き一覧テーブル自動生成コード
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

  // id="today-date" のテキストを更新
  const todayDisplay = document.getElementById("today-date");
  if (todayDisplay) {
    todayDisplay.textContent = `${month}月${day}日 の空き状況`;
  }
  
  // テーブルの中身を書き出す
  renderAvailableRooms();
});

const allRooms = [
  "301", "401", "501", "502", "503", "504", "505", "506", "507", "508", 
  "601", "701", "702", "703", "704", "705", "706", "707", "801", "901", "902"
];

function renderAvailableRooms() {
  // HTML側の新テーブルの受け皿をキャッチ
  const tbody = document.getElementById('today-room-list');

  if (!tbody) return;

  // 最初の中身をリセットして空白にする
  tbody.innerHTML = "";

  const reservationList = JSON.parse(localStorage.getItem("reservations")) || [];

  allRooms.forEach(roomNum => {
    // 昼休みの予約があるかチェック（数値型・文字列型のズレを完全に排除）
    const isLunchReserved = reservationList.some(res => 
      parseInt(res.year, 10) === parseInt(year, 10) &&
      parseInt(res.month, 10) === parseInt(month, 10) &&
      parseInt(res.day, 10) === parseInt(day, 10) &&
      String(res.room).replace("号室", "") === String(roomNum) &&
      res.time === "昼休み"
    );

    // 放課後の予約があるかチェック
    const isAfterReserved = reservationList.some(res => 
      parseInt(res.year, 10) === parseInt(year, 10) &&
      parseInt(res.month, 10) === parseInt(month, 10) &&
      parseInt(res.day, 10) === parseInt(day, 10) &&
      String(res.room).replace("号室", "") === String(roomNum) &&
      res.time === "放課後"
    );
    // 昼も放課後も埋まってたら表示しない
      if (isLunchReserved && isAfterReserved) {
      return;
    }
    // 1つの行（tr）を作って、教室名・昼・放課後を横に並べる
    const tr = document.createElement('tr');
    
    // ① 教室名のマス（全体調整に合わせてフォントサイズを18pxに拡大）
    let htmlContent = `<td class="res-room-name">${roomNum}</td>`;

    // ② 昼休みのマス（CSSクラスに変更）
    if (!isLunchReserved) {
      htmlContent += `<td class="res-maru-cell"><button class="today-res-btn" onclick="goToReservePage('${roomNum}', '昼休み')">〇</button></td>`;
    } else {
      htmlContent += `<td class="res-batsu-cell">✕</td>`;
    }

    // ③ 放課後のマス（CSSクラスに変更）
    if (!isAfterReserved) {
      htmlContent += `<td class="res-maru-cell"><button class="today-res-btn" onclick="goToReservePage('${roomNum}', '放課後')">〇</button></td>`;
    } else {
      htmlContent += `<td class="res-batsu-cell">✕</td>`;
    }

    tr.innerHTML = htmlContent;
    tbody.appendChild(tr); // 綺麗に整った1行をテーブルに合体
  }); 
}   

// ボタンを押した時に安全に予約画面へジャンプする関数
window.goToReservePage = function(roomNum, time) {
  location.href = `reserve.html?year=${year}&month=${month}&day=${day}&room=${roomNum}&time=${time}`;
};