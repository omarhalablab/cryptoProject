document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error uploading file:', error);
    }
});

document.getElementById('downloadButton').addEventListener('click', async () => {
    const fileId = 'your-file-id'; // Replace with the actual file ID
    window.location.href = `/download/${fileId}`;
});
