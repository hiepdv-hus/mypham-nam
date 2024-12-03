"use strict";
//Lấy danh sách thú cưng từ localStorage
let arrOrder = JSON.parse(getFromStorage("users", "[]"));


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
      <td>${pet.username}</td>
      <td>${pet.firstName}</td>
      <td>${pet.lastName}</td>
      <td>${pet.password}</td>
      <td>
        <img src="delete.png" type="button" onclick="deletePet('${pet.username}')"/>
      </td>
    `;
    tableBodyEl.appendChild(row);
  });
}

//Hàm delete pet khỏi mảng, cập nhật lại bảng
const deletePet = (username) => {
    // Confirm before deleting the pet
    if (confirm("Are you sure?")) {
      // Tìm vị trí của thú cưng trong mảng dựa vào ID
      const petIndex = petList.findIndex((pet) => pet.username === username);
  
      // Nếu tìm thấy thú cưng, xóa nó khỏi mảng
      if (petIndex !== -1) {
        petList.splice(petIndex, 1); // Xóa 1 phần tử tại vị trí petIndex
        //Lưu petList xuống LocalStorage
        saveToStorage("users", JSON.stringify(petList));
        ///
        renderTableData(petList); // Reload lại bảng sau khi xóa
        // resetHealthyBtn();
        // resetCalculateBMIBtn();
      } else {
        console.log("Pet not found!");
      }
    }
  };

//Thêm animation khi người dùng click vào navbar

const sidebarEl = document.getElementById("sidebar");
if (sidebarEl) {
  sidebarEl.addEventListener("click", function () {
    sidebarEl.classList.toggle("active");
  });
}

