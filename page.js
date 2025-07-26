// page.js
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  fetch(`data/pages/${slug}.json`)
    .then(response => {
      if (!response.ok) throw new Error("Page not found");
      return response.json();
    })
    .then(data => {
      document.title = data.title;
      //document.getElementById("title").textContent = data.title;

      const contentDiv = document.getElementById("content");
      contentDiv.innerHTML = "";

      data.content.forEach(block => {
        let el;

        switch (block.type) {
          case "header":
            el = document.createElement("h1");
            el.textContent = block.text;
            break;
          case "subheader":
            el = document.createElement("h2");
            el.textContent = block.text;
            break;
          case "paragraph":
            el = document.createElement("p");
            el.textContent = block.text;
            break;
          case "image":
            el = document.createElement("img");
            el.src = block.src;
            el.alt = block.alt || "";
            el.style.maxWidth = "100%";
            break;
          default:
            console.warn("Unknown block type:", block.type);
            return;
        }

        contentDiv.appendChild(el);
        
      });
    })
    .catch(err => {
      document.title = "Not Found";
      document.getElementById("title").textContent = "Page not found";
      document.getElementById("content").textContent = "The page you requested does not exist.";
    });
});