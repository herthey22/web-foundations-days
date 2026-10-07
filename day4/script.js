// --- DOM Element References ---
const noteText = document.getElementById("note-text");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const clearBtn = document.getElementById("clear-btn");
const themeToggle = document.getElementById("theme-toggle");

// --- Helper Functions ---

// 1. Update Character and Word Counts + Classes
function updateCounts() {
    const text = noteText.value;
    const charLength = text.length;

    // Character Count Display
    charCount.textContent = `${charLength} / 200 characters`;

    // Warning (< 180 normal, 181-200 warning, > 200 over)
    charCount.classList.remove("warning", "over");
    if (charLength > 200) {
        charCount.classList.add("over");
    } else if (charLength > 180) {
        charCount.classList.add("warning");
    }

    // Word Count Calculation
    const trimmedText = text.trim();
    const words = trimmedText === "" ? 0 : trimmedText.split(/\s+/).length;
    wordCount.textContent = `${words} ${words === 1 ? "word" : "words"}`;
}

// 2. Clear All Inputs and Local Storage Draft
function clearNote() {
    noteText.value = "";
    localStorage.removeItem("noteDraft");
    updateCounts();
}

// 3. Set Theme
function setTheme(isDark) {
    if (isDark) {
        document.body.classList.add("dark");
        themeToggle.textContent = "Light mode";
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark");
        themeToggle.textContent = "Dark mode";
        localStorage.setItem("theme", "light");
    }
}

// --- Event Listeners ---

// Real-time Textarea Input Handling
noteText.addEventListener("input", () => {
    updateCounts();
    localStorage.setItem("noteDraft", noteText.value);
});

// Clear Button Action
clearBtn.addEventListener("click", clearNote);

// Escape Key inside Textarea Clears Note
noteText.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        clearNote();
    }
});

// Theme Toggle Action
themeToggle.addEventListener("click", () => {
    const isCurrentlyDark = document.body.classList.contains("dark");
    setTheme(!isCurrentlyDark);
});

// --- Page Load Initialization ---
function init() {
    // Restore Saved Theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        setTheme(true);
    } else {
        setTheme(false);
    }

    // Restore Saved Note Draft
    const savedDraft = localStorage.getItem("noteDraft");
    if (savedDraft) {
        noteText.value = savedDraft;
    }

    // Update Counters on Initial Load
    updateCounts();
}

// Initialize on Script Load
init();