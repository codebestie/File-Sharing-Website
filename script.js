// Get DOM elements

const fileInput = document.getElementById("fileInput");
const uploadButton = document.getElementById("uploadButton");
const shareableLink = document.getElementById("shareableLink");

// Update file input label with selected filenames
fileInput.addEventListener("change", () => {
  const selectedFiles = fileInput.files;
  if (selectedFiles.length > 0) {
    const filenames = Array.from(selectedFiles)
      .map((file) => file.name)
      .join(", ");
    const label = document.querySelector(".custom-file-lab");
    label.innerHTML = filenames;
  }
});

// Event listener for uplaod button

uploadButton.addEventListener("click", async () => {
  const file = fileInput.files[0];
  if (file) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      //Show loading state
      uploadButton.disabled = true;
      uploadButton.textContent = "Sharing...";

      const response = await fetch("https://file.io/?expires=1d", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        const link = `<p>Download File <a href="${data.link}" target="_blank">${data.link}</a><p/>`;
        shareableLink.innerHTML = link;
      } else {
        shareableLink.innerHTML = "File share failed. Please try again";
      }
    } catch (error) {
      shareableLink.textContent = "An error occured. Please try again later.";
      console.error("Error sharing file:", error);
    } finally {
      // Reset laoding state
      uploadButton.disabled = false;
      uploadButton.textContent = "Share";
    }
  } else {
    shareableLink.textContent = "Please upload a file to share.";
  }
});
