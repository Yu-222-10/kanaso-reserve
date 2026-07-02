// 1. 画面ロード時に日付を決定して表示する
let year, month, day;

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  
  // URLに日付が書いてあるかチェック
  if (params.get("year") && params.get("month") && params.get("day")) {
    year = parseInt(params.get("year"));
    month = parseInt(params.get("month"));
    day = parseInt(params.get("day"));
  } else {
    //  なければ「今日の日付」を自動で取得する
    const todayObj = new Date();
    year = todayObj.getFullYear();
    month = todayObj.getMonth() + 1; // 月は0から始まるので+1
    day = todayObj.getDate();
  }

  // 画面の見出しに「〇月〇日の空き一覧」または使用状況を表示する
  const dateDisplay = document.getElementById("selected-date");
  const todayDisplay = document.getElementById("today-date");

  if (dateDisplay) {
    dateDisplay.textContent = `${year}年${month}月${day}日の使用状況`;
    
    // 💾 【新機能】room.html（使用状況画面）が開かれた場合、現在の◯×の状態をブラウザに記憶させる
    saveCurrentRoomStatus();
  }
  
  if (todayDisplay) {
    todayDisplay.textContent = `${month}月${day}日 の空き一覧`;
    
    // 🔄 【新機能】today.html（空き一覧画面）が開かれた場合、記憶したデータから「〇」を復元する
    loadRoomStatusToDOM();
  }
  
  // 💡 日付が決まったあとに、部屋データの振り分けを実行する
  initRoomTable();
});

// ==========================================
// 2. 予約画面へ情報を抱えて飛ぶための関数
// ==========================================
function goReservation(roomNum, time) {
  const suffix = (time === '昼休み') ? '-lunch' : '-after';
  const cellId = roomNum + suffix;
  const targetCell = document.getElementById(cellId);

  if (!targetCell) {
    console.log(`エラー: id="${cellId}" のマスが見つかりません`);
    return;
  }

  // 今日の日付（判定用）
  const todayObj = new Date();
  const todayTarget = new Date(todayObj.getFullYear(), todayObj.getMonth(), todayObj.getDate());
  // 選択（または今日自動設定）された日付
  const selectedTarget = new Date(year, month - 1, day);

  if (selectedTarget < todayTarget) {
    alert("過去の日付は予約できません。");
    return; 
  }

  const cellText = targetCell.textContent.trim();
  if (cellText === "〇" ) {
    location.href = `reserve.html?year=${year}&month=${month}&day=${day}&room=${roomNum}&time=${time}`;
  }
}

// ==========================================
// 3. 元のデータが「◯」なら、部屋名だけを別のテーブルに追加する命令
// ==========================================
function addRoomToTable(element, roomNum, time, tbody) {
  if (element && (element.textContent.trim() === "〇" )) {
    const tr = document.createElement('tr');
    tr.style.cursor = "pointer";
    tr.addEventListener('click', () => {
      goReservation(roomNum, time);
    });
    
    const tdRoom = document.createElement('td');
    tdRoom.textContent = roomNum; 
    
    tr.appendChild(tdRoom);
    tbody.appendChild(tr); 
  }
}

// ==========================================
// 4. テーブル振り分けのメイン処理
// ==========================================
function initRoomTable() {
  const lunchTbody = document.getElementById('lunch-list');
  const afterTbody = document.getElementById('afterschool-list');

  if (lunchTbody && afterTbody) {
    lunchTbody.innerHTML = "";
    afterTbody.innerHTML = "";

    // 昼休みのデータ取得
    const lunch301 = document.getElementById("301-lunch");
    const lunch401 = document.getElementById("401-lunch");
    const lunch501 = document.getElementById("501-lunch");
    const lunch502 = document.getElementById("502-lunch");
    const lunch503 = document.getElementById("503-lunch");
    const lunch504 = document.getElementById("504-lunch");
    const lunch505 = document.getElementById("505-lunch");
    const lunch506 = document.getElementById("506-lunch");
    const lunch507 = document.getElementById("507-lunch");
    const lunch508 = document.getElementById("508-lunch");
    const lunch601 = document.getElementById("601-lunch");
    const lunch701 = document.getElementById("701-lunch");
    const lunch702 = document.getElementById("702-lunch");
    const lunch703 = document.getElementById("703-lunch");
    const lunch704 = document.getElementById("704-lunch");
    const lunch705 = document.getElementById("705-lunch");
    const lunch706 = document.getElementById("706-lunch");
    const lunch707 = document.getElementById("707-lunch");
    const lunch801 = document.getElementById("801-lunch");
    const lunch901 = document.getElementById("901-lunch");
    const lunch902 = document.getElementById("902-lunch");

    // 放課後のデータ取得
    const after301 = document.getElementById("301-after");
    const after401 = document.getElementById("401-after");
    const after501 = document.getElementById("501-after");
    const after502 = document.getElementById("502-after");
    const after503 = document.getElementById("503-after");
    const after504 = document.getElementById("504-after");
    const after505 = document.getElementById("505-after");
    const after506 = document.getElementById("506-after");
    const after507 = document.getElementById("507-after");
    const after508 = document.getElementById("508-after");
    const after601 = document.getElementById("601-after");
    const after701 = document.getElementById("701-after");
    const after702 = document.getElementById("702-after");
    const after703 = document.getElementById("703-after");
    const after704 = document.getElementById("704-after");
    const after705 = document.getElementById("705-after");
    const after706 = document.getElementById("706-after");
    const after707 = document.getElementById("707-after");
    const after801 = document.getElementById("801-after");
    const after901 = document.getElementById("901-after");
    const after902 = document.getElementById("902-after");

    // 昼休みの表へ振り分け
    addRoomToTable(lunch301, "301", "昼休み", lunchTbody);
    addRoomToTable(lunch401, "401", "昼休み", lunchTbody);
    addRoomToTable(lunch501, "501", "昼休み", lunchTbody);
    addRoomToTable(lunch502, "502", "昼休み", lunchTbody);
    addRoomToTable(lunch503, "503", "昼休み", lunchTbody);
    addRoomToTable(lunch504, "504", "昼休み", lunchTbody);
    addRoomToTable(lunch505, "505", "昼休み", lunchTbody);
    addRoomToTable(lunch506, "506", "昼休み", lunchTbody);
    addRoomToTable(lunch507, "507", "昼休み", lunchTbody);
    addRoomToTable(lunch508, "508", "昼休み", lunchTbody);
    addRoomToTable(lunch601, "601", "昼休み", lunchTbody);
    addRoomToTable(lunch701, "701", "昼休み", lunchTbody);
    addRoomToTable(lunch702, "702", "昼休み", lunchTbody);
    addRoomToTable(lunch703, "703", "昼休み", lunchTbody);
    addRoomToTable(lunch704, "704", "昼休み", lunchTbody);
    addRoomToTable(lunch705, "705", "昼休み", lunchTbody);
    addRoomToTable(lunch706, "706", "昼休み", lunchTbody);
    addRoomToTable(lunch707, "707", "昼休み", lunchTbody);
    addRoomToTable(lunch801, "801", "昼休み", lunchTbody);
    addRoomToTable(lunch901, "901", "昼休み", lunchTbody);
    addRoomToTable(lunch902, "902", "昼休み", lunchTbody);

    // 放課後の表へ振り分け
    addRoomToTable(after301, "301", "放課後", afterTbody);
    addRoomToTable(after401, "401", "放課後", afterTbody);
    addRoomToTable(after501, "501", "放課後", afterTbody);
    addRoomToTable(after502, "502", "放課後", afterTbody);
    addRoomToTable(after503, "503", "放課後", afterTbody);
    addRoomToTable(after504, "504", "放課後", afterTbody);
    addRoomToTable(after505, "505", "放課後", afterTbody);
    addRoomToTable(after506, "506", "放課後", afterTbody);
    addRoomToTable(after507, "507", "放課後", afterTbody);
    addRoomToTable(after508, "508", "放課後", afterTbody);
    addRoomToTable(after601, "601", "放課後", afterTbody);
    addRoomToTable(after701, "701", "放課後", afterTbody);
    addRoomToTable(after702, "702", "放課後", afterTbody);
    addRoomToTable(after703, "703", "放課後", afterTbody);
    addRoomToTable(after704, "704", "放課後", afterTbody);
    addRoomToTable(after705, "705", "放課後", afterTbody);
    addRoomToTable(after706, "706", "放課後", afterTbody);
    addRoomToTable(after707, "707", "放課後", afterTbody);
    addRoomToTable(after801, "801", "放課後", afterTbody);
    addRoomToTable(after901, "901", "放課後", afterTbody);
    addRoomToTable(after902, "902", "放課後", afterTbody);
  }
}

// 💡 予約処理用の関数
function dorequestReservation() {
  const groupName = document.getElementById("group-name").value.trim();
  if (!groupName) {
    alert("団体名を入力してください。");
    return;
  }

  const newReservation = {
    id: Date.now(),
    year: year,
    month: month,
    day: day,
    room: roomNum,
    time: time,
    group: groupName
  };

  let reservationList = JSON.parse(localStorage.getItem("reservations")) || [];
  reservationList.push(newReservation);
  localStorage.setItem("reservations", JSON.stringify(reservationList));

  alert("予約が完了しました！履歴画面へ移動します。");
  location.href = "history.html";
}

// 💡 【新機能】データ連動用の関数セット
const allRooms = ["301", "401", "501", "502", "503", "504", "505", "506", "507", "508", "601", "701", "702", "703", "704", "705", "706", "707", "801", "901", "902"];

function saveCurrentRoomStatus() {
  const statusData = {};
  allRooms.forEach(room => {
    const lunchEl = document.getElementById(`${room}-lunch`);
    const afterEl = document.getElementById(`${room}-after`);
    if (lunchEl) statusData[`${room}-lunch`] = lunchEl.textContent.trim();
    if (afterEl) statusData[`${room}-after`] = afterEl.textContent.trim();
  });
  localStorage.setItem("room_status_snapshot", JSON.stringify(statusData));
}

function loadRoomStatusToDOM() {
  const savedData = JSON.parse(localStorage.getItem("room_status_snapshot"));
  if (!savedData) return;

  const hiddenDiv = document.getElementById("hidden-data-container");
  if (!hiddenDiv) return;

  Object.keys(savedData).forEach(idKey => {
    let el = document.getElementById(idKey);
    if (!el) {
      el = document.createElement("div");
      el.id = idKey;
      hiddenDiv.appendChild(el);
    }
    el.textContent = savedData[idKey];
  });
}