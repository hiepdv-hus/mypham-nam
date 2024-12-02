'use strict';

// Hàm lưu dữ liệu xuống localStorage
function saveToStorage(key, value) {
    localStorage.setItem(key, value);
}

// Hàm lấy dữ liệu từ localStorage
function getFromStorage(key) {
    return localStorage.getItem(key);
}

// Hàm xóa dữ liệu từ localStorage
function removeFromStorage(key) {
    localStorage.removeItem(key);
}'use strict'
