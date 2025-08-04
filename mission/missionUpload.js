const fields = ['title', 'description', 'city', 'district', 'starttime','endtime', 'price', 'tag', 'imageUrl', 'petname', 'petage', 'petgender', 'phone'];

fields.forEach(id => {
    document.getElementById(id).addEventListener('input', updatePreview);
});

let selectedFiles = [];

function updatePreview() {
    // 更新文字內容
    document.getElementById('previewTitle').textContent = document.getElementById('title').value;
    document.getElementById('previewPetName').textContent = document.getElementById('petname').value;
    document.getElementById('previewPetAge').textContent = document.getElementById('petage').value;
    document.getElementById('previewPetGender').textContent = document.getElementById('petgender').value;
    document.getElementById('previewPhone').textContent = document.getElementById('phone').value;

    const city = document.getElementById('city').value;
    const district = document.getElementById('district').value;
    document.getElementById('previewLocation').textContent = city + ' ' + district;

    const startTime = document.getElementById('starttime').value;
    const endTime = document.getElementById('endtime').value;
    const formattedStartTime = startTime ? new Date(startTime).toLocaleString('zh-TW', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }) : '';
    const formattedEndTime = endTime ? new Date(endTime).toLocaleString('zh-TW', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }) : '';
    document.getElementById('previewStartTime').textContent = formattedStartTime;
    document.getElementById('previewEndTime').textContent = formattedEndTime;

    document.getElementById('previewPrice').textContent = document.getElementById('price').value;
    document.getElementById('previewTag').textContent = document.getElementById('tag').value;
    document.getElementById('previewDescription').textContent = document.getElementById('description').value;
}

// 多圖上傳與預覽處理
document.getElementById('imageUrl').addEventListener('change', function (event) {
    const newFiles = Array.from(event.target.files);

    if (selectedFiles.length + newFiles.length > 5) {
        alert('最多只能上傳 5 張圖片');
        event.target.value = '';
        return;
    }

    selectedFiles = selectedFiles.concat(newFiles);
    renderImagePreviews();
    event.target.value = '';
});

 function renderImagePreviews() {
    const previewContainer = document.getElementById('previewImages');
    const carousel = document.getElementById('carouselImages');

    previewContainer.innerHTML = '';
    carousel.innerHTML = '';

    selectedFiles.forEach((file, index) => {
        const reader = new FileReader();

        reader.onload = function (e) {
            // 小縮圖預覽 + 刪除
            const wrapper = document.createElement('div');
            wrapper.className = 'position-relative';

            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'img-thumbnail';
            img.style.width = '120px';
            img.style.height = '120px';
            img.style.objectFit = 'cover';

            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '&times;';
            closeBtn.className = 'btn btn-sm position-absolute top-0 end-0';
            closeBtn.style.transform = 'translate(50%, -50%)';
            closeBtn.onclick = () => {
                selectedFiles.splice(index, 1);
                renderImagePreviews();
            };

            wrapper.appendChild(img);
            wrapper.appendChild(closeBtn);
            previewContainer.appendChild(wrapper);

            // 圖片預覽
            const slide = document.createElement('div');
            slide.className = 'carousel-item' + (index === 0 ? ' active' : '');
            slide.innerHTML = `
                <img src="${e.target.result}" class="d-block w-100" style="height: 300px; object-fit: cover;">
            `;
            carousel.appendChild(slide);
        };

        reader.readAsDataURL(file);
    });
}
