import { auth, signInWithPopup, provider } from "../auth";
import { initChat } from "../src/chat";

const loginButton = document.getElementById("login") as HTMLButtonElement;
const chatDiv = document.getElementById("chat") as HTMLDivElement;

loginButton.addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    loginButton.style.display = "none";
    chatDiv.style.display = "block";

    initChat(user);
  } catch (err: any) {
    console.error("Erro no login:", err.message);
  }
});
