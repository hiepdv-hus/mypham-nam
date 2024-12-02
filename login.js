'use strict'
// Lấy các elements
const inputUsername = document.getElementById('input-username');
const inputPassword = document.getElementById('input-password');
const btnSubmit = document.getElementById('btn-submit');

// Bắt sự kiện click vào nút Login
btnSubmit.addEventListener('click', function() {
    // Lấy dữ liệu nhập vào
    const username = inputUsername.value.trim();
    const password = inputPassword.value.trim();
    console.log('login')

    // Validate dữ liệu
    if (username === '' || password === '') {
        alert('Vui lòng nhập đầy đủ username và password!');
        return;
    }

    // Lấy danh sách users từ localStorage
    const users = getFromStorage('users') || [];
    console.log("users", users)

    // Kiểm tra thông tin đăng nhập
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Đăng nhập thành công
        alert('Đăng nhập thành công!');

        // Lưu thông tin người dùng hiện tại vào localStorage
        saveToStorage('currentUser', user);

        // Chuyển về trang Home
        window.location.href = './index.html';
    } else {
        // Đăng nhập thất bại
        alert('Username hoặc password không đúng!');
    }
});

// Hàm lưu dữ liệu vào localStorage
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Hàm lấy dữ liệu từ localStorage
function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}