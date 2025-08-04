const mission = {
  title: "協助遛黃金獵犬",
  city: "台中市",
  district: "西屯區",
  startTime: "2025-08-02T15:00:00",
  endTime: "2025-08-02T17:00:00",
  price: 300,
  tag: "遛狗",
  imageUrl: ["animal/original.png","animal/original.png","animal/original.png"],
  description: "我家的狗狗很親人，請幫忙遛狗兩小時。",
  petName: "小黃",
  petAge: "0.5歲",
  petGender: "公",
  phone: "0912345678"
};

// 插入圖片輪播
const carousel = document.getElementById('carouselImages');
carousel.innerHTML = mission.imageUrl.map(function(url, idx) {
  return `
    <div class="carousel-item ${idx === 0 ? 'active' : ''}">
      <img src="${url}" class="d-block w-100" style="height: 700px; object-fit: cover;">
    </div>
  `;
}).join('');

// 插入文字資訊
document.getElementById('title').textContent = mission.title;
document.getElementById('petName').textContent = mission.petName;
document.getElementById('petAge').textContent = mission.petAge;
document.getElementById('petGender').textContent = mission.petGender;
document.getElementById('phone').textContent = mission.phone;
document.getElementById('location').textContent = `${mission.city} ${mission.district}`;
document.getElementById('time').textContent = `${formatTime(mission.startTime)} ~ ${formatTime(mission.endTime)}`;
document.getElementById('price').textContent = mission.price;
document.getElementById('description').textContent = mission.description;
document.getElementById('tag').textContent = `#${mission.tag}`;

// 時間格式處理
function formatTime(str) {
  const d = new Date(str);
  return d.toLocaleString('zh-TW', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}