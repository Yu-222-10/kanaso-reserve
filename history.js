document.addEventListener("DOMContentLoaded", () => {
  displayHistory();
});

// 💡 履歴を表示する関数
function displayHistory() {
  const tbody = document.getElementById("history-list");
  tbody.innerHTML = ""; // 一度リセット

  // ブラウザから予約リストを読み込む
  const reservationList = JSON.parse(localStorage.getItem("reservations")) || [];

  if (reservationList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="padding:20px; color:#999;">予約履歴はありません。</td></tr>`;
    return;
  }

  // データを一件ずつ表の行（tr）にして追加していく
  reservationList.forEach(res => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${res.year}年${res.month}月${res.day}日</td>
      <td>${res.room}</td>
      <td>${res.time}</td>
      <td>${res.group}</td>
      <td>
        <button class="cancel-btn" onclick="cancelReservation('${res.id}')">キャンセル</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// 💡 キャンセルボタンが押されたときの関数
function cancelReservation(id) {
  if (!confirm("この予約をキャンセルしてもよろしいですか？")) {
    return;
  }

  let reservationList = JSON.parse(localStorage.getItem("reservations")) || [];

  // 👈 クリックされたID「以外」のデータだけを残す（＝指定されたIDを消す）
  reservationList = reservationList.filter(res => res.id !== id);

  // 更新されたリストを再保存
  localStorage.setItem("reservations", JSON.stringify(reservationList));

  alert("予約をキャンセルしました。");
  displayHistory(); // 画面の表を更新
}