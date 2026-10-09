// Global state
let users = [];

// DOM Elements
const filterInput = document.getElementById("filter-input");
const usersList = document.getElementById("users-list");
const loadingSpinner = document.getElementById("loading-spinner");
const errorMessage = document.getElementById("error-message");

// 1. Render Users Array
function renderUsers(list) {
    usersList.textContent = ""; // Clear existing list

    if (list.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.className = "no-users";
        emptyItem.textContent = "No users match your filter.";
        usersList.appendChild(emptyItem);
        return;
    }

    list.forEach(user => {
        const card = document.createElement("li");
        card.className = "user-card";

        const name = document.createElement("h3");
        name.textContent = user.name;

        const username = document.createElement("p");
        username.textContent = `@${user.username}`;

        const email = document.createElement("p");
        email.textContent = `📧 ${user.email}`;

        const company = document.createElement("p");
        company.textContent = `🏢 ${user.company ? user.company.name : "N/A"}`;

        card.appendChild(name);
        card.appendChild(username);
        card.appendChild(email);
        card.appendChild(company);

        usersList.appendChild(card);
    });
}

// 2. Fetch Users from API
async function loadUsers() {
    //const url = "https://jsonplaceholder.typicode.com/users-broken"; // Intentionally broken URL for testing error handling
    const url = "https://jsonplaceholder.typicode.com/users"; // Correct URL
    loadingSpinner.style.display = "block";
    errorMessage.textContent = "";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        users = await response.json();
        renderUsers(users);
    } catch (error) {
        console.error("Failed to load users:", error);
        errorMessage.textContent = "Failed to load user data. Please check your internet connection or try again later.";
    } finally {
        loadingSpinner.style.display = "none";
    }
}

// 3. Filter Event Listener
filterInput.addEventListener("input", () => {
    const searchTerm = filterInput.value.toLowerCase().trim();
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.username.toLowerCase().includes(searchTerm)
    );
    renderUsers(filteredUsers);
});

// Load users on script execution
loadUsers();