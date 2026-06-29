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

    // 💡【修正②】判定②：マスの文字が「〇」のときだけ次に進める！
    if (targetCell.textContent.trim() === "〇") {
        // 予約画面(reserve.html)へ「日付・部屋・時間」を全部くっつけて移動！
        location.href = `reserve.html?year=${year}&month=${month}&day=${day}&room=${roomNum}&time=${time}`;
    } // 👈【ココ！】文字が「〇」のif文はここで閉じます！
}