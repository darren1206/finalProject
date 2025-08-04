const matches = [
    {
        name: "王小明",
        petname: "小白",
        messages: [
            { from: "applicant", text: "我可以申請嗎？", time: "14:30" },
            { from: "owner", text: "可以唷～", time: "14:32" },
            { from: "applicant", text: "我可以申請嗎？", time: "14:33" },
            { from: "owner", text: "可以唷～", time: "14:34" },
            { from: "applicant", text: "我可以申請嗎？", time: "14:35" },
            { from: "owner", text: "可以唷～可以唷～可以唷～可以唷～可以唷～可以唷～可以唷～可以唷～", time: "14:36" },
        ],
        info: {
            age: "25 歲",
            phone: "0912-345-678",
            intro: "我從小就照顧動物，非常有經驗。"
        }
    },
    {
        name: "陳小美",
        petname: "小橘",
        messages: [
            { from: "applicant", text: "我很喜歡貓咪～", time: "15:00" },
            { from: "owner", text: "真的嗎？你養過嗎？", time: "15:01" }
        ],
        info: {
            age: "30 歲",
            phone: "0987-654-321",
            intro: "家中環境適合養寵物，已經準備好了。"
        }
    }
];

// 媒合清單
const matchList = document.getElementById("matchList");

matches.forEach(function(match, index) {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = match.name;
    li.addEventListener("click", function() {
        updateDetail(index);
        updateActiveState(li);
    });
    matchList.appendChild(li);
});

// 切換聊天與申請資訊
function updateDetail(index) {
    const match = matches[index];
    const chatMessagesDiv = document.getElementById("chatMessages");
    const applicantCard = document.querySelector(".card.mt-3 .card-body");
    const chatName = document.getElementById("chatName");
    chatName.textContent = match.name;

    // 聊天內容
    chatMessagesDiv.innerHTML = "";
    match.messages.forEach(function(msg) {
        const div = document.createElement("div");
        if (msg.from === "owner") {
            div.className = "mb-2 text-end";
            div.innerHTML = `
                <div class=" p-2 rounded w-25 ms-auto" style="background-color: burlywood;">
                    ${msg.text}
                </div>
                <small class="text-muted d-block text-end">你 ${msg.time}</small>
            `;
        } else {
            div.className = "mb-2";
            div.innerHTML = `
                <div class="bg-white p-2 rounded w-25">
                    ${msg.text}
                </div>
                <small class="text-muted d-block">${match.name} ${msg.time}</small>
            `;
        }
        chatMessagesDiv.appendChild(div);
    });

    // 申請人資訊
    applicantCard.innerHTML = `
    <p><strong>姓名：</strong>${match.name}</p>
    <p><strong>年齡：</strong>${match.info.age}</p>
    <p><strong>電話：</strong>${match.info.phone}</p>
    <p><strong>自我介紹：</strong>${match.info.intro}</p>
    <div class="d-flex justify-content-end">
      <button class="btn me-2" style="background-color: burlywood">✅ 接受申請</button>
    </div>
  `;
}

function updateActiveState(selectedLi) {
    document.querySelectorAll("#matchList .list-group-item").forEach(function(li) {
        if (li !== selectedLi && li.textContent !== "媒合列表") {
            li.classList.remove("active");
        }
    });
    selectedLi.classList.add("active");
}