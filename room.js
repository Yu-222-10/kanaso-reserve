// ==========================================
// 1. URLから選ばれた日付（〇月〇日）を取得する
// ==========================================
let year, month, day;

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  
  // URLに日付があればそれを使い、なければ今日の日付にする
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

  // 📄 today.html（空き一覧画面）のタイトルを書き換える
  const todayDisplay = document.getElementById("today-date");
  if (todayDisplay) {
    todayDisplay.textContent = `${month}月${day}日 の空き一覧`;
  }
  
  // 🎯 画面が開かれたら、自動でその日の空き部屋を計算して表を作る！
  renderAvailableRooms();
});

// ==========================================
// 2. すべての教室リスト
// ==========================================
const allRooms = [
  "301", "401", "501", "502", "503", "504", "505", "506", "507", "508", 
  "601", "701", "702", "703", "704", "705", "706", "707", "801", "901", "902"
];

// ==========================================
// 3. 予約データから「その日、その時間に空いている部屋」だけを表に並べる処理
// ==========================================
function renderAvailableRooms() {
  const lunchTbody = document.getElementById('lunch-list');
  const afterTbody = document.getElementById('afterschool-list');

  if (!lunchTbody || !afterTbody) return;

  // 画面のテーブルを一度綺麗にリセット
  lunchTbody.innerHTML = "";
  afterTbody.innerHTML = "";

  // 💾 ブラウザに保存されている「すでに予約されたリスト」を取得
  const reservationList = JSON.parse(localStorage.getItem("reservations")) || [];

  // 全教室（301〜902）をループで1つずつチェック
  allRooms.forEach(roomNum => {
    
    // 🤔 1. この部屋の「昼休み」はすでに誰かに予約されているか？
    const isLunchReserved = reservationList.some(res => 
      String(res.year) === String(year) &&
      String(res.month) === String(month) &&
      String(res.day) === String(day) &&
      res.room === roomNum &&
      res.time === "昼休み"
    );

    // 🤔 2. この部屋の「放課後」はすでに誰かに予約されているか？
    const isAfterReserved = reservationList.some(res => 
      String(res.year) === String(year) &&
      String(res.month) === String(month) &&
      String(res.day) === String(day) &&
      res.room === roomNum &&
      res.time === "放課後"
    );

    // ✅ 昼休みが予約されていなければ（空いていれば）、表にボタンとして追加
    if (!isLunchReserved) {
      const tr = document.createElement('tr');
      tr.style.cursor = "pointer";
      tr.innerHTML = `<td>${roomNum}</td>`;
      
      // クリックしたらその日付・その部屋の情報を持ったまま予約画面（reserve.html）へ
      tr.addEventListener('click', () => {
        location.href = `reserve.html?year=${year}&month=${month}&day=${day}&room=${roomNum}&time=昼休み`;
      });
      lunchTbody.appendChild(tr);
    }

    // ✅ 放課後が予約されていなければ（空いていれば）、表にボタンとして追加
    if (!isAfterReserved) {
      const tr = document.createElement('tr');
      tr.style.cursor = "pointer";
      tr.innerHTML = `<td>${roomNum}</td>`;
      
      // クリックしたらその日付・その部屋の情報を持ったまま予約画面（reserve.html）へ
      tr.addEventListener('click', () => {
        location.href = `reserve.html?year=${year}&month=${month}&day=${day}&room=${roomNum}&time=放課後`;
      });
      afterTbody.appendChild(tr);
    }
  });
}