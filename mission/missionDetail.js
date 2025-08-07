// 取得網址參數中的 mission ID
const params = new URLSearchParams(window.location.search);
const missionId = params.get("id");

if (!missionId) {
  alert("缺少任務 ID");
} else {
  fetch(`/missions/${missionId}`)
    .then(response => {
      if (!response.ok) throw new Error("資料取得失敗");
      return response.json();
    })
    .then(mission => {
      renderMissionDetail(mission);
      setupPosterInfo(mission.poster); // 發文者資料與 WebSocket 狀態
    })
    .catch(err => {
      console.error("取得任務失敗：", err);
      alert("載入任務資料失敗，請稍後再試。");
    });
}

function renderMissionDetail(mission) {
  // 插入基本文字內容
  document.getElementById('PetPick-title').textContent = mission.title;
  document.getElementById('title').textContent = mission.title;
  document.getElementById('petName').textContent = mission.petName || "—";
  document.getElementById('petAge').textContent = mission.petAge || "—";
  document.getElementById('petGender').textContent = mission.petGender || "—";
  document.getElementById('phone').textContent = mission.contactPhone || "—";
  document.getElementById('location').textContent = `${mission.city} ${mission.district}`;
  document.getElementById('time').textContent = `${formatTime(mission.startTime)} ~ ${formatTime(mission.endTime)}`;
  document.getElementById('price').textContent = mission.price;
  document.getElementById('description').textContent = mission.description || "無詳細描述";

  // 處理標籤陣列（顯示為 #tag1 #tag2）
  const tagEl = document.getElementById('tag');
  if (Array.isArray(mission.tag) && mission.tag.length > 0) {
    tagEl.textContent = mission.tag.map(t => `#${t}`).join(' ');
  } else {
    tagEl.textContent = "#無標籤";
  }

  // 輪播圖片插入
  const carousel = document.getElementById('carouselImages');
  if (Array.isArray(mission.imageUrl) && mission.imageUrl.length > 0) {
    carousel.innerHTML = mission.imageUrl.map((url, idx) => `
      <div class="carousel-item ${idx === 0 ? 'active' : ''}">
        <img src="${url}" class="d-block w-100" style="height: 700px; object-fit: cover;">
      </div>
    `).join('');
  } else {
    carousel.innerHTML = `
      <div class="carousel-item active">
        <img src="/images/default-image.jpg" class="d-block w-100" style="height: 700px; object-fit: cover;">
      </div>
    `;
  }
}

// 顯示發文者資訊與在線狀態
function setupPosterInfo(poster) {
  poster = poster || {
    id: 84,
    name: "ZOO",
    avatarUrl: "/images/default-avatar.png"
  };

  document.getElementById("posterName").textContent = poster.name || "匿名用戶";
  const avatar = document.getElementById("posterAvatar");
  avatar.src = poster.avatarUrl || "/images/default-avatar.png";

  // WebSocket 在線狀態監測
  const ws = new WebSocket(`ws://localhost:8080/online?userId=${poster.id}`);

  ws.onmessage = (event) => {
    const status = event.data === "online" ? "🟢 在線" : "⚪ 離線";
    document.getElementById("userStatus").textContent = status;
  };
  ws.onerror = ws.onclose = () => {
    document.getElementById("userStatus").textContent = "⚪ 離線";
  };
}

// 將 ISO 時間轉換為台灣格式
function formatTime(str) {
  const d = new Date(str);
  return d.toLocaleString('zh-TW', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}