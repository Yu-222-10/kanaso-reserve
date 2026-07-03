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

  // ⭕ 履歴を正しくテーブルに表示する処理の例
reservationList.forEach((reservation) => {
  const tr = document.createElement("tr");

  // 保存したデータ（year, month, day, time, room, group）を順番にトントンと入れる
  tr.innerHTML = `
    <td>${reservation.year}年${reservation.month}月${reservation.day}日</td>
    <td>${reservation.time}</td>
    <td>${reservation.room}</td>
    <td>${reservation.group}</td>
    <td><button onclick="deleteReservation('${reservation.id}')" class="cancel-btn">キャンセル</button></td>
  `;
  
  // テーブルの要素（tbodyなど）に追加する
  document.getElementById("reservation-table-body").appendChild(tr);
});

    
}

// 💡 キャンセルボタンが押されたときの関数
function deleteReservation(id) {
  if (!confirm("この予約をキャンセルしてもよろしいですか？")) {
    return;
  }

  let reservationList = JSON.parse(localStorage.getItem("reservations")) || [];

  //  クリックされたID「以外」のデータだけを残す（＝指定されたIDを消す）
  reservationList = reservationList.filter(res => res.id !== id);

  // 更新されたリストを再保存
  localStorage.setItem("reservations", JSON.stringify(reservationList));

  alert("予約をキャンセルしました。");
  displayHistory(); // 画面の表を更新
}