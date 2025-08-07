const messages = [
  {
    name: "王小明",
    avatar: "https://picsum.photos/40/40",
    lastMessage: "可以唷～",
    messages: [
      { from: "applicant", text: "我可以申請嗎？", time: "14:30" },
      { from: "owner", text: "可以唷～", time: "14:32" },
      { from: "applicant", text: "我可以申請嗎？", time: "14:33" },
      { from: "owner", text: "可以唷～", time: "14:34" },
      { from: "applicant", text: "我可以申請嗎？", time: "14:35" },
      { from: "owner", text: "可以唷～可以唷～可以唷～可以唷～可以唷～可以唷～可以唷～可以唷～", time: "14:36" },
    ]
  },
  {
    name: "陳小美",
    avatar: "https://picsum.photos/100/100",
    lastMessage: "你養過嗎？",
    messages: [
      { from: "applicant", text: "我很喜歡貓咪～", time: "15:00" },
      { from: "owner", text: "真的嗎？你養過嗎？", time: "15:01" }
    ]
  }
];

const chatToggleBtn = document.getElementById('chat-toggle');
const chatSelector = document.getElementById('chat-selector');
const chatList = document.getElementById('chatList');
const chatWindows = document.getElementById('chatWindows');

let openedChats = {};

// 聊天選擇器
chatToggleBtn.addEventListener('click', function () {
  const currentDisplay = chatSelector.style.display;
  if (currentDisplay === 'none') {
    chatSelector.style.display = 'block';
  } else {
    chatSelector.style.display = 'none';
  }
});

document.addEventListener('click', function (e) {
  const isClickInside = chatSelector.contains(e.target) || chatToggleBtn.contains(e.target);
  if (!isClickInside) {
    chatSelector.style.display = 'none';
  }
});

// chat列表
messages.forEach(function (user, index) {
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex align-items-center';
  li.innerHTML = `
    <img src="${user.avatar}" class="rounded-circle me-2" style="width: 40px; height: 40px; object-fit: cover;">
    <div>
      <strong>${user.name}</strong><br>
      <small class="text-muted">${user.lastMessage}</small>
    </div>
  `;
  li.addEventListener('click', function () {
    openChatWindow(user);
  });
  chatList.appendChild(li);
});

// chat視窗
function openChatWindow(user) {
  if (openedChats[user.name]) return; // 已開啟

  const wrapper = document.createElement('div');
  wrapper.className = 'chat-window position-fixed';
  wrapper.style.width = '300px';
  wrapper.style.bottom = '0px';
  wrapper.style.right = (20 + Object.keys(openedChats).length * 320) + 'px';
  wrapper.style.zIndex = 1050;
  wrapper.setAttribute('data-user', user.name);

  var messagesHTML = user.messages.map(function (m) {
    return `
      <div class="mb-2 ${m.from === 'owner' ? 'text-end' : ''}">
        <div class="p-2 rounded ${m.from === 'owner' ? 'text-black ms-auto' : 'bg-light'} d-inline-block"
             style="max-width: 80%; background-color: burlywood;">
          ${m.text}
        </div>
        <div><small class="text-muted">${m.time}</small></div>
      </div>
    `;
  }).join('');

  wrapper.innerHTML = `
    <div class="chat-header d-flex justify-content-between align-items-center">
      <div>
        <img src="${user.avatar}" class="rounded-circle ms-2" style="width: 40px; height: 40px; object-fit: cover;">
        <span>${user.name}</span>
      </div>
      <button class="btn btn-sm btn-close me-3"></button>
    </div>
 
    <div class="chat-body">
      ${messagesHTML}
    </div>

    <div class="chat-footer d-flex align-items-center">
      <input class="form chat-input ms-2 me-1" placeholder=" Aa" type="text">
      <button class="btn btn-material">
        <span class="material-icons">send</span>
      </button>
    </div>
  `;

  // 關閉
  wrapper.querySelector('.btn-close').addEventListener('click', function () {
    chatWindows.removeChild(wrapper);
    delete openedChats[user.name];
  });

  chatWindows.appendChild(wrapper);
  openedChats[user.name] = wrapper;
}