const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        backToTopBtn.style.display = "flex";
    } else {
        backToTopBtn.style.display = "none";
    }
});

backToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // 往下滑
        navbar.classList.add("hide-navbar");
    } else {
        // 往上滑
        navbar.classList.remove("hide-navbar");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // 防止負值
}, false);


// 卡片的
const missions = [  // 可以從後端 API 拿來的資料
    {
        title: "協助遛黃金獵犬",
        city: "台中市",
        district: "西屯區",
        startTime: "8/2 下午3點",
        endTime: "8/2 下午5點",
        price: 300,
        tag: "遛狗",
        imageUrl: "animal/125075.jpg",
        score:"51"
    },
    {
        title: "短期照顧柴犬",
        city: "台中市",
        district: "南屯區",
        startTime: "8/2 下午3點",
        endTime: "8/2 下午5點",
        price: 600,
        tag: "短期照顧",
        imageUrl: "animal/9E8929FF-4A4E-4884-A76B-33F75F922FB1_1_201_a.webp",
        score:"40"
    },
    {
        title: "短期照顧柴犬",
        city: "台中市",
        district: "南屯區",
        startTime: "8/2 下午3點",
        endTime: "8/2 下午5點",
        price: 600,
        tag: "短期照顧",
        imageUrl: "animal/original.png",
        score:"70"
    }
    ,
    {
        title: "短期照顧柴犬",
        city: "台中市",
        district: "南屯區",
        startTime: "8/2 下午3點",
        endTime: "8/2 下午5點",
        price: 600,
        tag: "短期照顧",
        imageUrl: "animal/content_c07533a8-24bd-4af6-b8ed-ba3912ff2f1c.avif",
        score:"100"
    }
    ,
    {
        title: "短期照顧柴犬",
        city: "台中市",
        district: "南屯區",
        startTime: "8/2 下午3點",
        endTime: "8/2 下午5點",
        price: 600,
        tag: "短期照顧",
        imageUrl: "animal/63c117f19e248b737369b165_puppy-g3237d6104_1920.jpg",
        score:"90"
    }

];

//切換推薦
document.getElementById("showAllBtn").addEventListener("click", () => {
    document.getElementById("all-missions").style.display = "block";
    document.getElementById("recommend-list").style.display = "none";
    document.getElementById("showAllBtn").classList.add("active");
    document.getElementById("showRecommendBtn").classList.remove("active");
});

document.getElementById("showRecommendBtn").addEventListener("click", () => {
    document.getElementById("all-missions").style.display = "none";
    document.getElementById("recommend-list").style.display = "flex";
    document.getElementById("showRecommendBtn").classList.add("active");
    document.getElementById("showAllBtn").classList.remove("active");
});



const missionList = document.getElementById('mission-list');
const recommendList = document.getElementById("recommend-list");

// 所有任務加入missions
missions.forEach(mission => {
    const card = createMissionCard(mission);
    missionList.appendChild(card);

    // 大於70
    if (parseInt(mission.score) >= 70) {
        const recommendCard = createMissionCard(mission);
        recommendList.appendChild(recommendCard);
    }
});

function createMissionCard(mission) {
    const card = document.createElement('div');
    card.className = 'col-12 mb-4';

    // 根據分數給不同樣式
    const score = parseInt(mission.score);
    let scoreColor = "text-muted";
    let scoreLabel = "";

    if (score >= 90) {
        scoreColor = 'style="background-color:rgb(112, 190, 88); "'
    } else if (score >= 70) {
        scoreColor = 'style="background-color:rgb(218, 203, 107); "'
    } else if (score >= 50) {
        scoreColor = 'style="background-color:rgb(219, 120, 120); "'
    } else {
        scoreColor = 'style="background-color: #cfcfcf; "'
    }

    card.innerHTML = `
      <div class="d-flex border shadow-sm p-3 align-items-start">
        <img src="${mission.imageUrl}" alt="任務圖片" style="width: 250px; height: 200px; object-fit: cover;" class="me-3">

        <div class="flex-grow-1">
          <div class = "d-flex justify-content-between align-items-center">
            <h3 class="fw-bold mb-2">${mission.title}</h3>
            <span class="score-circle" ${scoreColor}>${mission.score} </span>
          </div>
          <p class="mb-1 text-muted">地點：${mission.city}${mission.district}</p>
          <p class="mb-1 text-muted">時間：${mission.startTime} ~ ${mission.endTime}</p>
          <p class="mb-1 text-muted">酬勞：$${mission.price}</p>
          
          <div class="d-flex justify-content-between align-items-center mt-5">
            <span class="mission-tag">#${mission.tag}</span>
            <button class="btn btn-sm" style="background-color: burlywood;">查看詳情</button>
          </div>
        </div>
      </div>
    `;
    return card;
}