// ai-chat-logic.js
document.addEventListener("DOMContentLoaded", () => {
  const chatInput = document.getElementById("chatInput");
  const sendMessageBtn = document.getElementById("sendMessage");
  const chatMessages = document.getElementById("chatMessages");
  const clearChatBtn = document.getElementById("clearChatBtn");
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const micBtn = document.getElementById("micBtn");
  const exportBtn = document.getElementById("exportBtn");
  const importBtn = document.getElementById("importBtn");
  const docsBtn = document.getElementById("docsBtn");

  let chatHistory = JSON.parse(localStorage.getItem("vikai_chat")) || [];

  function appendMessage(role, text) {
    const msg = document.createElement("div");
    msg.className = `message-bubble ${role}-message`;
    msg.innerHTML =
      role === "ai"
        ? `<img src="images/logo.png" alt="AI" /><span>${text}</span>`
        : `<span>${text}</span>`;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    appendMessage("user", text);
    chatInput.value = "";
    appendMessage("ai", "Thinking...");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) throw new Error("Network error");
      const data = await res.json();

      chatMessages.lastChild.innerHTML = `<img src="images/logo.png" alt="AI" /><span>${data.reply}</span>`;

      chatHistory.push({ role: "user", content: text });
      chatHistory.push({ role: "assistant", content: data.reply });
      localStorage.setItem("vikai_chat", JSON.stringify(chatHistory));
    } catch (err) {
      console.error("Error:", err);
      chatMessages.lastChild.innerHTML = `<img src="images/logo.png" alt="AI" /><span>Server not responding. Try again later.</span>`;
    }
  }

  sendMessageBtn.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  clearChatBtn.addEventListener("click", () => {
    chatMessages.innerHTML = "";
    chatHistory = [];
    localStorage.removeItem("vikai_chat");
  });

  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
  });

  micBtn.addEventListener("click", () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported.");
      return;
    }
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.onresult = (e) => {
      chatInput.value = e.results[0][0].transcript;
    };
    recognition.start();
  });

  exportBtn.addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(chatHistory, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vikai_chat.json";
    a.click();
  });

  importBtn.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          chatHistory = JSON.parse(event.target.result);
          localStorage.setItem("vikai_chat", JSON.stringify(chatHistory));
          chatMessages.innerHTML = "";
          chatHistory.forEach((m) =>
            appendMessage(m.role === "assistant" ? "ai" : "user", m.content)
          );
        } catch {
          alert("Invalid file.");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  });

  docsBtn.addEventListener("click", () => {
    window.open("https://vikora.org/docs", "_blank");
  });

  chatHistory.forEach((m) =>
    appendMessage(m.role === "assistant" ? "ai" : "user", m.content)
  );
});
