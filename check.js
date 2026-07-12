document.addEventListener("DOMContentLoaded", () => {
  displayHistory();
});

// 履歴表示
function displayHistory() {

  const tbody = document.getElementById("reservation-list");
  if (!tbody) return;

  tbody.innerHTML = "";

  // ローカルストレージから取得
  const reservationList =
    JSON.parse(localStorage.getItem("reservations")) || [];

  // 🔍 デバッグ（確認用）
  console.log(reservationList);

  // データ無し
  if (reservationList.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="padding:20px; color:#999;">
          予約履歴はありません。
        </td>
      </tr>
    `;
    return;
  }

  // 表示
  reservationList.forEach((reservation) => {

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${reservation.year}年<br>${reservation.month}月${reservation.day}日</td>
      <td>${reservation.room}</td>
      <td>${reservation.time}</td>
      <td>${reservation.group || ""}</td>
      <td>
        <button
          class="cancel-btn"
          onclick="deleteReservation('${reservation.id}')">
          キャンセル
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// キャンセル
function deleteReservation(id) {

  if (!confirm("この予約をキャンセルしますか？")) return;

  let reservationList =
    JSON.parse(localStorage.getItem("reservations")) || [];

  reservationList =
    reservationList.filter(res => res.id !== id);

  localStorage.setItem("reservations", JSON.stringify(reservationList));

  alert("予約をキャンセルしました");

  displayHistory();
}