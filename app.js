function processImage() {
    const fileInput = document.getElementById('fileInput');
    const outputText = document.getElementById('outputText');
    const preview = document.getElementById('preview');

    if (fileInput.files.length === 0) {
        alert("Vänligen välj en bild att bearbeta.");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        // Visa förhandsgranskning av bilden
        preview.src = event.target.result;

        // Bearbeta bilden med Tesseract.js
        Tesseract.recognize(event.target.result, 'eng', {
            logger: (m) => console.log(m)  // Logga processens framsteg
        }).then(({ data: { text } }) => {
            outputText.innerText = text;  // Visa OCR-extraherad text
        }).catch(err => {
            outputText.innerText = "Fel vid bearbetning: " + err.message;
        });
    };

    reader.readAsDataURL(file);
}
