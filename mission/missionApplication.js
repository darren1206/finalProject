const myApplications = [
  {
    missionTitle: "陪伴黃金獵犬",
    applicant: "王小明",
    owner: "林小白",
    applyTime: "2025-08-04 10:12",
    status: "pending", // accepted, rejected
    userRole: "applicant", // or "owner"
    contactPhone: "0912-345-678",
    missionId: "M001"
  },
  {
    missionTitle: "幫貓洗澡",
    applicant: "王小明",
    owner: "林小白",
    applyTime: "2025-08-03 15:40",
    status: "accepted",
    userRole: "owner",
    contactPhone: "0987-654-321",
    missionId: "M002"
  }
];

const container = document.getElementById('applicationList');
container.innerHTML = '';

myApplications.forEach(app => {
  const card = document.createElement('div');
  card.className = 'card mb-3';
  
  const badge = app.status === "pending" ? "bg-warning" :
                app.status === "accepted" ? "bg-success" :
                "bg-danger";

  let buttons = '';

  if (app.userRole === "applicant") {
    buttons = `
      <button class="btn btn-sm text-white" style="background-color: burlywood;">查看詳情</button>
      <button class="btn btn-secondary btn-sm"> 聯絡送養人</button>
      <button class="btn btn-sm text-white"  style="background-color: rgb(219, 120, 120);">取消申請</button>
    `;
  } else if (app.userRole === "owner") {
    buttons = `
      <button class="btn btn-sm text-white" style="background-color: burlywood;">查看申請者</button>
      <button class="btn btn-sm text-white" style="background-color: rgb(112, 190, 88); ">接受</button>
      <button class="btn btn-sm text-white" style="background-color: rgb(219, 120, 120);">拒絕</button>
    `;
  }

  card.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">🐾 ${app.missionTitle}</h5>
      <p class="card-text">
        申請時間：${app.applyTime}<br>
        狀態：<span class="badge ${badge}">${app.status}</span><br>
        ${app.userRole === 'applicant' ? `對方：${app.owner}` : `申請者：${app.applicant}`}
      </p>
      <div class="d-flex justify-content-end gap-2">${buttons}</div>
    </div>
  `;

  container.appendChild(card);
});