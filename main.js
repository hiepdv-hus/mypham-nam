
//Lấy danh sách thú cưng từ localStorage
let petList = JSON.parse(getFromStorage("petList", "[]"));
const danhsachsanpham = document.getElementById('danhsachsanpham');

let currentPage = 1;
const itemsPerPage = 4;

function renderProducts(petList, page = 1){
  danhsachsanpham.innerHTML = ""; 

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToRender = petList.slice(startIndex, endIndex);

  if(productsToRender.length > 0) {
    productsToRender.forEach(product => {
        const productCard = `
        <div class="col-md-3 d-flex">
          <div class="card mb-3 shadow mt-4 text-center">
            <img width="80%" src="admin/images/${product.img}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">Giá: ${product.giave} VND</p>
              <button class="btn btn-dark" onclick="addToCart('${product.id}', ${product.giave})">Thêm vào giỏ hàng</button>
            </div>
          </div>
        </div>
        `;
        danhsachsanpham.innerHTML += productCard;
      });
      renderPagination(petList);
  } else {
    danhsachsanpham.innerHTML = '<p class="text-center mt-5">Không có sản phẩm nào</p>';
  }
  
}

function renderPagination(petList) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(petList.length / itemsPerPage);

  // Tạo nút Previous
  const prevButton = document.createElement("li");
  prevButton.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
  prevButton.innerHTML = `<a class="page-link" href="#">&laquo;</a>`;
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderProducts(petList, currentPage);
    }
  });
  paginationContainer.appendChild(prevButton);

  // Tạo các nút số trang
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("li");
    pageButton.className = `page-item ${i === currentPage ? "active" : ""}`;
    pageButton.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    pageButton.addEventListener("click", () => {
      currentPage = i;
      renderProducts(petList, currentPage);
    });
    paginationContainer.appendChild(pageButton);
  }

  // Tạo nút Next
  const nextButton = document.createElement("li");
  nextButton.className = `page-item ${currentPage === totalPages ? "disabled" : ""}`;
  nextButton.innerHTML = `<a class="page-link" href="#">&raquo;</a>`;
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderProducts(petList, currentPage);
    }
  });
  paginationContainer.appendChild(nextButton);
}


  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function addToCart(id, price) {
    cart.push({ id, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Sản phẩm đã được thêm vào giỏ hàng!');
  }

  function checkout() {
    if (cart.length === 0) {
      alert('Giỏ hàng rỗng!');
      return;
    }
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const checkoutData = {
      date: new Date().toISOString(),
      total,
      items: cart
    };
    localStorage.setItem('checkout', JSON.stringify(checkoutData));
    alert(`Thanh toán thành công! Tổng tiền: ${total} VND`);
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function filterProductsByCategory(category, element) {
    // Lọc sản phẩm
    const filteredProducts = category === 'all' 
      ? petList 
      : petList.filter(product => product.category === category);
      
    renderProducts(filteredProducts);
  
    // Xóa class active khỏi tất cả các nút
    const categoryButtons = document.querySelectorAll('.nav-link');
    categoryButtons.forEach(button => button.classList.remove('active'));
  
    // Thêm class active vào nút hiện tại
    element.classList.add('active');
  }
  
  // Hiển thị tất cả sản phẩm ban đầu
  document.addEventListener("DOMContentLoaded", () => {
    renderProducts(petList);
  });

  document.addEventListener("DOMContentLoaded", () => {
    const cartCount = document.getElementById("cartCount");
    const cartPopup = document.getElementById("cartPopup");
    const cartItemsPopup = document.getElementById("cartItemsPopup");
  
    window.togglePopup = function (show) {
      console.log('vaoday');
      
      cartPopup.style.display = show ? "block" : "none";
      renderCartItemsPopup();
    };
  
    function renderCartItemsPopup() {
      if (cart.length === 0) {
        cartItemsPopup.innerHTML = "<p>Chưa có sản phẩm trong giỏ</p>";
        return;
      }
  
      let cartHtml = `<ul class="list-group">`;
      cart.forEach((item) => {
        const product = petList.find((p) => p.id === item.id);
        cartHtml += `
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <img src="admin/images/${product.img}" alt="${product.name}" width="50">
            ${product.name}
            <span>${item.price} VND</span>
          </li>`;
      });
      cartHtml += `</ul>`;
      cartItemsPopup.innerHTML = cartHtml;
    }
  
    window.addToCart = function (id, price) {
      cart.push({ id, price });
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      alert("Sản phẩm đã được thêm vào giỏ hàng!");
    };
  
    function updateCartCount() {
      cartCount.textContent = cart.length;
    }
  
    window.checkout = function () {
      if (cart.length === 0) {
        alert('Giỏ hàng rỗng!');
        return;
      }
    
      const total = cart.reduce((sum, item) => sum + item.price, 0);
      const checkoutData = {
        date: new Date().toLocaleString(), // Ngày giờ thanh toán
        total,
        items: cart.map(item => {
          const product = petList.find(p => p.id === item.id);
          return {
            id: item.id,
            name: product.name,
            img: product.img,
            price: item.price,
          };
        }),
      };
    
      // Lấy lịch sử thanh toán cũ
      let checkoutHistory = JSON.parse(localStorage.getItem("checkoutHistory")) || [];
      checkoutHistory.push(checkoutData); // Thêm giao dịch mới
      localStorage.setItem("checkoutHistory", JSON.stringify(checkoutHistory));
    
      alert(`Thanh toán thành công! Tổng tiền: ${total} VND`);
      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      togglePopup(false);
      updateCartCount();
    }
  
    updateCartCount(); // Cập nhật số lượng khi tải lại trang
  });