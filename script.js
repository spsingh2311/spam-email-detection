const spamWords = [
    "free", "win", "winner", "money", "cash", 
    "prize", "click", "offer", "urgent", 
    "lottery", "claim", "congratulations"
];

function checkSpam() {
    const text = document.getElementById("emailText").value.toLowerCase();
    const result = document.getElementById("result");
    const percentage = document.getElementById("percentage");

    if (text.trim() === "") {
        result.innerText = "Please enter email content.";
        percentage.innerText = "";
        return;
    }

    let spamCount = 0;

    spamWords.forEach(word => {
        if (text.includes(word)) {
            spamCount++;
        }
    });

    let spamScore = Math.min((spamCount / spamWords.length) * 100, 100);

    if (spamScore > 30) {
        result.innerText = "⚠️ This email is likely SPAM!";
        result.style.color = "red";
    } else {
        result.innerText = "✅ This email looks safe.";
        result.style.color = "green";
    }

    percentage.innerText = `Spam Probability: ${spamScore.toFixed(2)}%`;

    saveHistory(text, spamScore);
}

function saveHistory(text, score) {
    let history = JSON.parse(localStorage.getItem("spamHistory")) || [];
    history.unshift({
        content: text.substring(0, 40) + "...",
        score: score.toFixed(2) + "%"
    });

    if (history.length > 5) {
        history.pop();
    }

    localStorage.setItem("spamHistory", JSON.stringify(history));
    loadHistory();
}

function loadHistory() {
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "";

    let history = JSON.parse(localStorage.getItem("spamHistory")) || [];

    history.forEach(item => {
        let li = document.createElement("li");
        li.innerText = `${item.content} → ${item.score}`;
        historyList.appendChild(li);
    });
}

function toggleMode() {
    document.body.classList.toggle("dark-mode");
}

window.onload = loadHistory;
