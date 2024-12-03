'use strict';

// Constants
const KEY = "users";

// Load existing users from localStorage
let userArr = getFromStorage(KEY) ? JSON.parse(getFromStorage(KEY)) : [];

// Parse User objects
userArr = userArr.map(userData => parseUser(userData));

// Function to parse User data
function parseUser(userData) {
    return new User(userData.firstName, userData.lastName, userData.username, userData.password);
}

// Function to validate the form
function validateForm(firstName, lastName, username, password, passwordConfirm) {

    console.log(userArr)
    if (!firstName || !lastName || !username || !password || !passwordConfirm) {
        alert("Please fill in all fields");
        return false;
    }

    if (userArr.some(user => user.username === username)) {
        alert("Username already exists");
        return false;
    }

    if (password !== passwordConfirm) {
        console.log('validate')
        alert("Passwords do not match");
        return false;
    }

    if (password.length <= 8) {
        alert("Password must be longer than 8 characters");
        return false;
    }

    return true;
}

// Function to handle form submission
function handleRegister() {
    const firstName = document.getElementById("input-firstname").value;
    const lastName = document.getElementById("input-lastname").value;
    const username = document.getElementById("input-username").value;
    const password = document.getElementById("input-password").value;
    const passwordConfirm = document.getElementById("input-password-confirm").value;

    if (validateForm(firstName, lastName, username, password, passwordConfirm)) {
        const newUser = new User(firstName, lastName, username, password);
        userArr.push(newUser);
        saveToStorage('users', JSON.stringify(userArr));

        alert("Registration successful!");
        window.location.href = './login.html';
    }
}

// Add event listener to the register button
document.addEventListener('DOMContentLoaded', function() {
    const registerButton = document.getElementById("btn-submit");
    if (registerButton) {
        registerButton.addEventListener("click", handleRegister);
    }
});
