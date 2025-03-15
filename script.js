import { Client } from "https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.js";

// Vytvoříme klienta bez HF tokenu (pro veřejný Space)
let client = null;
try {
  client = await Client.connect("https://cervenaraketa-image2draw-u-net.hf.space");
  console.log("Spojeno se Space!");
} catch (err) {
  console.error("Chyba při connect:", err);
}

let selectedFile = null;

// Elementy z DOM
const fileInputContainer = document.getElementById("fileInputContainer");
const fileInput = document.getElementById("fileInput");
const sendButton = document.getElementById("sendButton");
const reuploadButton = document.getElementById("reuploadButton");
const downloadButton = document.getElementById("downloadButton");
const spinner = document.getElementById("spinner");
const errorMessage = document.getElementById("errorMessage");

// Nové elementy pro dvě zobrazení obrázků
const uploadedImage = document.getElementById("uploadedImage");
const generatedImage = document.getElementById("generatedImage");
const rightPaneLogo = document.getElementById("rightPaneLogo");

// --- Drag & Drop do levého okna ---
fileInputContainer.addEventListener("click", () => fileInput.click());
fileInputContainer.addEventListener("dragover", (evt) => {
  evt.preventDefault();
  fileInputContainer.style.borderColor = "#0066ff";
});
fileInputContainer.addEventListener("dragleave", () => {
  fileInputContainer.style.borderColor = "transparent";
});
fileInputContainer.addEventListener("drop", (evt) => {
  evt.preventDefault();
  fileInputContainer.style.borderColor = "transparent";

  if (evt.dataTransfer.files && evt.dataTransfer.files[0]) {
    selectedFile = evt.dataTransfer.files[0];
    showSelectedFile(selectedFile);
  }
});

// --- FileInput dialog ---
fileInput.addEventListener("change", (evt) => {
  if (evt.target.files && evt.target.files[0]) {
    selectedFile = evt.target.files[0];
    showSelectedFile(selectedFile);
  }
});

/**
 * Zobrazí náhled nahraného obrázku vlevo
 * a připraví tlačítko Generate.
 */
function showSelectedFile(file) {
  // Zobrazíme náhled nahraného obrázku vlevo
  uploadedImage.src = URL.createObjectURL(file);
  uploadedImage.style.display = "block";

  // Skryjeme kontejner pro nahrání
  fileInputContainer.style.display = "none";

  // Zobrazíme tlačítko "Generate image"
  sendButton.style.display = "inline-block";

  // Skryjeme "Reupload" a "Download", pokud tam náhodou zbyly
  reuploadButton.style.display = "none";
  downloadButton.style.display = "none";
}

// --- Klik na "Generate image" ---
sendButton.addEventListener("click", async () => {
  errorMessage.textContent = "";
  if (!selectedFile) {
    errorMessage.textContent = "Prosím, vyberte obrázek.";
    return;
  }

  spinner.style.display = "block";

  try {
    if (!client) {
      throw new Error("Klient @gradio/client není inicializován. Nelze volat .predict.");
    }

    // Zavoláme model
    const result = await client.predict("/predict", { input_image: selectedFile });
    console.log("Výsledek predikce:", result);

    if (!result || !result.data || !result.data[0]) {
      throw new Error("Výsledek neobsahuje očekávaná data. " + JSON.stringify(result));
    }

    let finalImageSrc = "";
    const imageResult = result.data[0];

    // Rozlišíme formu výstupu (base64, URL, file...)
    if (typeof imageResult === "string") {
      finalImageSrc = imageResult;
    } else if (imageResult && typeof imageResult === "object") {
      if (imageResult.data) {
        // base64
        finalImageSrc = imageResult.data;
      } else if (imageResult.url) {
        finalImageSrc = imageResult.url;
      } else if (imageResult.is_file && imageResult.path) {
        // Stáhneme soubor z Gradio
        const fileBlob = await client.download(imageResult);
        finalImageSrc = URL.createObjectURL(fileBlob);
      } else {
        throw new Error(
          "Nepodařilo se najít base64/url/path v objektu: " + JSON.stringify(imageResult)
        );
      }
    } else {
      throw new Error("Nepodařilo se vyhodnotit výsledek: " + JSON.stringify(imageResult));
    }

    // Nastavíme a zobrazíme vygenerovaný obrázek v pravém okně
    generatedImage.src = finalImageSrc;
    generatedImage.style.display = "block";

    // Skryjeme logo v pravém okně (překryté generovaným obrázkem)
    rightPaneLogo.style.display = "none";

    // Schováme "Generate image", zobrazíme "Reupload" a "Download"
    sendButton.style.display = "none";
    reuploadButton.style.display = "inline-block";

    // Vytvoříme Blob -> blobURL pro "Download" button
    const downloadUrl = await createBlobUrl(finalImageSrc);
    downloadButton.href = downloadUrl;
    downloadButton.style.display = "inline-block";

  } catch (err) {
    errorMessage.textContent = "Chyba: " + err.message;
    console.error(err);
    alert("Chyba při volání predikce:\n" + err.stack);
  } finally {
    spinner.style.display = "none";
  }
});

// --- Klik na "Reupload" ---
reuploadButton.addEventListener("click", () => {
  // Vymažeme vygenerovaný obrázek z pravého okna
  generatedImage.src = "";
  generatedImage.style.display = "none";

  // Obnovíme logo v pravém okně
  rightPaneLogo.style.display = "block";

  // Vymažeme obrázek z levého okna
  uploadedImage.src = "";
  uploadedImage.style.display = "none";

  // Znovu ukážeme kontejner na nahrání vlevo
  fileInputContainer.style.display = "block";

  // Reset vybraného souboru
  selectedFile = null;
  fileInput.value = null;

  // Skryjeme reupload i download
  reuploadButton.style.display = "none";
  downloadButton.style.display = "none";

  // Skryjeme "Generate image"
  sendButton.style.display = "none";

  // Znovu vyvoláme dialog pro výběr
  fileInput.click();
});

/**
 * Vytvoří Blob -> ObjectURL z finalImageSrc (ať už base64 nebo URL).
 */
async function createBlobUrl(finalImageSrc) {
  const base64prefix = "data:image/";

  if (finalImageSrc.startsWith(base64prefix)) {
    // base64
    const base64Data = finalImageSrc.split(",")[1];
    const byteString = atob(base64Data);
    const arr = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      arr[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arr], { type: "image/png" });
    return URL.createObjectURL(blob);

  } else if (finalImageSrc.startsWith("blob:")) {
    // Už je to blob
    return finalImageSrc;

  } else {
    // Je to vzdálená URL (http/https)
    const resp = await fetch(finalImageSrc);
    if (!resp.ok) {
      throw new Error("Chyba při fetch " + finalImageSrc + ": " + resp.statusText);
    }
    const blob = await resp.blob();
    return URL.createObjectURL(blob);
  }
}
