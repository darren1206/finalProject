const matches = [
  {
    userRole: "owner", // or "applicant"
    owner: {
      name: "林小白",
      avatar: "https://picsum.photos/40/40"
    },
    applicant: {
      name: "王小明",
      avatar: "https://picsum.photos/30/30",
      age: "25 歲",
      phone: "0912-345-678",
      intro: "我從小就照顧動物，非常有經驗。"
    },
    petname: "小白",
    messages: [
      { from: "applicant", text: "我可以申請嗎？", time: "14:30" },
      { from: "owner", text: "可以唷～", time: "14:32" },
      { from: "applicant", text: "謝謝", time: "14:33" }
    ]
  },
  {
    userRole: "applicant",
    owner: {
      name: "陳小美",
      avatar: "https://picsum.photos/100/100"
    },
    applicant: {
      name: "王小明",
      avatar: "https://picsum.photos/40/40",
      age: "25 歲",
      phone: "0900-111-222",
      intro: "我有多年照顧經驗，住家寬敞。"
    },
    petname: "小橘",
    messages: [
      { from: "applicant", text: "我很喜歡貓咪～", time: "15:00" },
      { from: "owner", text: "真的嗎？你養過嗎？", time: "15:01" }
    ]
  }
];

// 媒合清單
const matchList = document.getElementById("matchList");

matches.forEach(function (match, index) {
  const li = document.createElement("li");
  li.className = "list-group-item";

  const isOwner = match.userRole === "owner";
  const displayName = isOwner ? match.applicant.name : match.owner.name;
  const avatar = isOwner ? match.applicant.avatar : match.owner.avatar;
  const lastMsg = match.messages.at(-1)?.text || "";

  li.innerHTML = `
    <div class="d-flex align-items-center">
      <img src="${avatar}" class="rounded-circle me-2" width="36" height="36">
      <div>
        <strong>${displayName}</strong><br>
        <small class="text-muted">${lastMsg}</small>
      </div>
    </div>
  `;

  li.addEventListener("click", function () {
    updateDetail(index);
    updateActiveState(li);
  });

  matchList.appendChild(li);
});

// 更新詳細聊天內容與申請人資訊
function updateDetail(index) {
  const match = matches[index];
  const isOwner = match.userRole === "owner";

  const other = isOwner ? match.applicant : match.owner;

  const chatMessagesDiv = document.getElementById("chatMessages");
  const applicantCard = document.querySelector(".card.mt-3 .card-body");
  const chatName = document.getElementById("chatName");

  chatName.textContent = other.name;
  chatMessagesDiv.innerHTML = "";

  match.messages.forEach(function (msg) {
    const isMe = (isOwner && msg.from === "owner") || (!isOwner && msg.from === "applicant");
    const whoLabel = isMe ? "你" : other.name;

    const div = document.createElement("div");
    div.className = `mb-2 ${isMe ? "text-end" : ""}`;
    div.innerHTML = `
      <div class="${isMe ? "ms-auto" : ""} p-2 rounded w-25" style="background-color: ${isMe ? "burlywood" : "white"};">
        ${msg.text}
      </div>
      <small class="text-muted d-block ${isMe ? "text-end" : ""}">${whoLabel} ${msg.time}</small>
    `;
    chatMessagesDiv.appendChild(div);
  });

  // 申請人資訊卡片
  applicantCard.innerHTML = `
    <p><strong>姓名：</strong>${match.applicant.name}</p>
    <p><strong>年齡：</strong>${match.applicant.age}</p>
    <p><strong>電話：</strong>${match.applicant.phone}</p>
    <p><strong>自我介紹：</strong>${match.applicant.intro}</p>
    <div class="d-flex justify-content-end">
      ${
        isOwner
          ? `<button class="btn me-2" style="background-color: burlywood;">✅ 接受申請</button>`
          : `<button class="btn btn-outline-danger">❌ 取消申請</button>`
      }
    </div>
  `;
}

// 清除其他 active 狀態
function updateActiveState(selectedLi) {
  document.querySelectorAll("#matchList .list-group-item").forEach(function (li) {
    li.classList.remove("active");
  });
  selectedLi.classList.add("active");
}