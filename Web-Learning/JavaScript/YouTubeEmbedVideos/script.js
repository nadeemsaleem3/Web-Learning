const form = document.getElementById('linkForm');
const linkInputs = document.getElementById('linkInputs');
const videoContainer = document.getElementById('videoContainer');
const closeAllBtn = document.getElementById('closeAllBtn');
const sameLinkCheckbox = document.getElementById('sameLinkCheckbox');

// Initialize default state
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('numberInput').value = 1;
    generateLinkInputs(1);
    updateCloseAllButtonState();
});

// Generate link input fields
function generateLinkInputs(count) {
    linkInputs.innerHTML = '';
    if (sameLinkCheckbox.checked) {
        // Single input field for same link
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.placeholder = 'Enter YouTube link';
        inputField.classList.add('youtube-link');
        linkInputs.appendChild(inputField);
    } else {
        // Multiple input fields
        for (let i = 0; i < count; i++) {
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.placeholder = `Enter YouTube link #${i + 1}`;
            inputField.classList.add('youtube-link');
            linkInputs.appendChild(inputField);
        }
    }
}

// Handle number input changes
document.getElementById('numberInput').addEventListener('input', (e) => {
    const count = parseInt(e.target.value) || 0;
    generateLinkInputs(count);
    videoContainer.innerHTML = ''; // Clear videos when number input changes
    updateCloseAllButtonState();
});

// Toggle same link option
sameLinkCheckbox.addEventListener('change', () => {
    const count = parseInt(document.getElementById('numberInput').value) || 0;
    generateLinkInputs(count);
});

// Handle form submission to generate videos
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const count = parseInt(document.getElementById('numberInput').value) || 0;
    const links = Array.from(document.querySelectorAll('.youtube-link')).map(input => input.value);

    // Generate videos before clearing inputs
    videoContainer.innerHTML = '';
    if (sameLinkCheckbox.checked && links.length > 0) {
        const videoId = getYouTubeId(links[0]);
        if (videoId) {
            for (let i = 0; i < count; i++) {
                createIframe(videoId);
            }
        }
    } else {
        links.forEach(link => {
            const videoId = getYouTubeId(link);
            if (videoId) {
                createIframe(videoId);
            }
        });
    }

    // After generating iframes, reset inputs
    document.getElementById('numberInput').value = 1;
    generateLinkInputs(1);
    updateCloseAllButtonState();
});

// Create iframe and append to container
function createIframe(videoId) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?controls=1`;
    iframe.width = "560";
    iframe.height = "315";
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.frameBorder = "0";

    const videoWrapper = document.createElement('div');
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.classList.add('close-btn');
    closeBtn.addEventListener('click', () => {
        videoWrapper.remove();
        updateCloseAllButtonState();
    });

    videoWrapper.appendChild(iframe);
    videoWrapper.appendChild(closeBtn);
    videoContainer.appendChild(videoWrapper);
}

// Close all videos
closeAllBtn.addEventListener('click', () => {
    videoContainer.innerHTML = '';
    updateCloseAllButtonState();
});

// Utility function to extract YouTube video ID
function getYouTubeId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Update the state of the close all button
function updateCloseAllButtonState() {
    closeAllBtn.style.display = videoContainer.childElementCount > 1 ? 'block' : 'none';
}