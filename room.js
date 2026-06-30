//room.html
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  const year = params.get("year");
  const month = params.get("month");
  const day = params.get("day");

  // 2. 画面の見出しに日付を表示する
  const dateDisplay = document.getElementById("selected-date");
  if (dateDisplay && year && month && day) {
      dateDisplay.textContent = `${year}年${month}月${day}日 使用状況`;
  }
});

// 3. 予約画面へ情報を抱えて飛ぶための関数
function goReservation(roomNum, time) {
    // 💡【修正①】URLから選択された「年・月・日」の文字を数字(Int)に変換してここで読み込む
    const params = new URLSearchParams(window.location.search);
    const year = parseInt(params.get('year'));
    const month = parseInt(params.get('month'));
    const day = parseInt(params.get('day'));

    // 今クリックされたマスのIDを組み立てて、中身をチェックする
    const suffix = (time === '昼休み') ? '-lunch' : '-after';
    const cellId = roomNum + suffix;
    const targetCell = document.getElementById(cellId);

    // ⚠️ 安全対策：HTML側にIDがない、または打ち間違いの時は処理を止める
    if (!targetCell) {
        console.log(`エラー: id="${cellId}" のマスが見つかりません`);
        return;
    }

    // 今日の日付（時間・分・秒をゼロにリセットしたもの）を作成
    const today = new Date();
    const todayTarget = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // 選択された日付（時間・分・秒をゼロにしたもの）を作成
    const selectedTarget = new Date(year, month - 1, day);

    // 判定①：選択された日付が「今日より前」ならブロックする
    if (selectedTarget < todayTarget) {
        alert("過去の日付は予約できません。");
        return; // ここで処理を終了し、予約画面には飛ばさない
    }



//today.html
const todayString = `${month}月${date}日 の空き一覧`;
// HTMLの id="today-date" の場所に表示させる
document.getElementById('today-date').textContent = todayString;
    // マスの文字が「〇」のときだけ次に進めむ
    if (targetCell.textContent.trim() === "〇") {
        // 予約画面(reserve.html)へ「日付・部屋・時間」を全部くっつけて移動
        location.href = `reserve.html?year=${year}&month=${month}&day=${day}&room=${roomNum}&time=${time}`;
    } // 文字が「〇」のif文はここで閉じる



const lunchTbody = document.getElementById('lunch-list');
const afterTbody = document.getElementById('afterschool-list');

// 💡 HTML側に該当のidがあるときだけ動かす（エラー防止）
if (lunchTbody && afterTbody) {
  lunchTbody.innerHTML = "";
  afterTbody.innerHTML = "";

//  昼休みのデータ取得
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
const after301 = document.getElementById("301-afternoon");
const after401 = document.getElementById("401-afternoon");
const after501 = document.getElementById("501-afternoon");
const after502 = document.getElementById("502-afternoon");
const after503 = document.getElementById("503-afternoon");
const after504 = document.getElementById("504-afternoon");
const after505 = document.getElementById("505-afternoon");
const after506 = document.getElementById("506-afternoon");
const after507 = document.getElementById("507-afternoon");
const after508 = document.getElementById("508-afternoon");
const after601 = document.getElementById("601-afternoon");
const after701 = document.getElementById("701-afternoon");
const after702 = document.getElementById("702-afternoon");
const after703 = document.getElementById("703-afternoon");
const after704 = document.getElementById("704-afternoon");
const after705 = document.getElementById("705-afternoon");
const after706 = document.getElementById("706-afternoon");
const after707 = document.getElementById("707-afternoon");
const after801 = document.getElementById("801-afternoon");
const after901 = document.getElementById("901-afternoon");
const after902 = document.getElementById("902-afternoon");

function addRoomToTable(element, roomNum, time, tbody) {
  // ※記号の「◯」と漢数字の「〇」どちらでも動く
  if (element && (element.textContent.trim() === "〇" || element.textContent.trim() === "◯")) {
    const tr = document.createElement('tr');
    
    const tdRoom = document.createElement('td');
    tdRoom.textContent = roomName; 
   
    tr.appendChild(tdRoom);
    tbody.appendChild(tr); 
  }
}

tr.addEventListener('click', () => {
     location.href = `reserve.html?year=${year}&month=${month}&day=${date}&room=${roomNum}&time=${time}`;
    });

// 昼休みの表（lunchTbody）へ振り分け
if (lunchTbody) {
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
}

// 放課後の表（afterTbody）へ振り分け
if (afterTbody) {
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