"use strict";
//Lấy danh sách thú cưng từ localStorage
let arrOrder = JSON.parse(getFromStorage("checkoutHistory", "[]"));


const tableBodyEl = document.getElementById("tbody"); //id của thân bảng

if (tableBodyEl) {
  renderTableData(arrOrder); //Hiển thị thông tin bảng mỗi lần tải lại trang
  // renderBreed(breedArr);
}

//Hàm hiển thị danh sách thú cưng lên bảng
function renderTableData(arrOrder) {
  tableBodyEl.innerHTML = "";
  let ind = 1
  arrOrder.forEach((pet) => {
    pet.dateAdded = new Date(pet.dateAdded);

    const row = document.createElement("tr");
    row.innerHTML = `
      <th scope="row">${ind++}</th>
      <td>${pet.total}</td>
      <td>${pet.date}</td>
    `;
    tableBodyEl.appendChild(row);
  });
}

//Thêm animation khi người dùng click vào navbar

const sidebarEl = document.getElementById("sidebar");
if (sidebarEl) {
  sidebarEl.addEventListener("click", function () {
    sidebarEl.classList.toggle("active");
  });
}

