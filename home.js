// Get elements
const loginModal = document.getElementById('login-modal');
const mainContent = document.getElementById('main-content');
const welcomeMessage = document.getElementById('welcome-message');
const logoutButton = document.getElementById('btn-logout');

// Function to check if user is logged in
function checkLoggedIn() {
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
        // User is logged in
        loginModal.style.display = 'none';
        mainContent.style.display = 'block';

        // Parse the currentUser JSON string
        const user = JSON.parse(currentUser);
        welcomeMessage.textContent = `Welcome, ${user.username}!`;
    } else {
        // User is not logged in
        loginModal.style.display = 'block';
        mainContent.style.display = 'none';
    }
}

// Function to handle logout
function logout() {
    localStorage.removeItem('currentUser');
    checkLoggedIn();
}

// Add event listener for logout button
logoutButton.addEventListener('click', logout);

// Check login status when the page loads
document.addEventListener('DOMContentLoaded', checkLoggedIn);