async function sendMessage() {
  const input = document.getElementById("user-input");
  const userText = input.value.trim();
  if (!userText) return;

  // Adiciona mensagem do usuário
  const chat = document.getElementById("chat");
  const userMsg = document.createElement("div");
  userMsg.className = "msg user";
  userMsg.innerText = userText;
  chat.appendChild(userMsg);
  input.value = "";

  // Requisição para Together.ai (Novita)
  const response = await fetch("https://api.together.xyz/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY_HERE",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistralai/novita",
      messages: [
        { role: "system", content: "Você é um assistente educado, rápido e engraçado. Sempre responda com clareza." },
        { role: "user", content: userText }
      ],
      temperature: 0.7,
    })
  });

  const data = await response.json();
  const botText = data.choices?.[0]?.message?.content || "Erro ao responder.";

  const botMsg = document.createElement("div");
  botMsg.className = "msg bot";
  botMsg.innerText = botText;
  chat.appendChild(botMsg);

  // Rolar para o final
  chat.scrollTop = chat.scrollHeight;
}
