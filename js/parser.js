// parser.js
export function renderContent(blocks, container) {
	//container.innerHTML = ""; // clear previous content

	blocks.forEach(block => {
		let el;

		switch (block.type) {
			case "header":
				el = document.createElement("h1");
				el.innerHTML = block.text;
				el.classList.add("wiki-h1");
				break;

			case "subheader":
				el = document.createElement("h2");
				el.innerHTML = block.text;
				el.classList.add("wiki-h2");
				break;

			case "paragraph":
				el = document.createElement("p");
				el.innerHTML = block.text.replace(/\n/g, "<br>");
				el.classList.add("wiki-p");
				break;

			case "list":
				const listEl = block.style === "ordered"
					? document.createElement("ol")
					: document.createElement("ul");
				listEl.classList.add('wiki-list');

				block.items.forEach(item => {
					const li = document.createElement("li");
					li.textContent = item;
					listEl.appendChild(li);
				});

				el = listEl;
				break;

			case "image":
				el = document.createElement("img");
				el.src = block.src;
				el.alt = block.alt || "";
				el.classList.add("wiki-img");
				break;

			default:
				console.warn("Unknown block type:", block.type);
				return;
		}

		container.appendChild(el);
	});
}