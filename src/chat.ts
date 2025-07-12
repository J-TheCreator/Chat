import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  DocumentData
} from "firebase/firestore";

import { db } from "../auth";

export function initChat(user: any) {
  const mensagensDiv = document.getElementById("mensagens") as HTMLDivElement;
  const input = document.getElementById("mensagem") as HTMLInputElement;
  const botao = document.getElementById("enviar") as HTMLButtonElement;

  // Escuta mensagens em tempo real
  const q = query(collection(db, "message"), orderBy("data"));

  onSnapshot(q, (snapshot) => {
    mensagensDiv.innerHTML = "";
    snapshot.forEach((doc) => {
      const dados = doc.data() as DocumentData;
      const msg = document.createElement("div");
      msg.textContent = `${dados.usuario.nome || "Anônimo"}: ${dados.texto}`;
      mensagensDiv.appendChild(msg);
    });
    mensagensDiv.scrollTop = mensagensDiv.scrollHeight;
  });

  // Enviar nova mensagem
  botao.addEventListener("click", async () => {
    const texto = input.value.trim();
    if (!texto) return;

    await addDoc(collection(db, "message"), {
      texto,
      usuario: {
        uid: user.uid,
        nome: user.displayName || "Anônimo",
        foto: user.photoURL || ""
      },
      data: serverTimestamp()
    });

    input.value = "";
  });
}
