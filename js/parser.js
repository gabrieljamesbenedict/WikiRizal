export function renderContent(blocks, container) {
	
	container.innerHTML = "";
	
	function parseInlineFormatting(text) {
		return text
			// Internal + External Links [Text](Link)
			.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, url) => {
				const isExternal = /^(https?:)?\/\//i.test(url);
				if (isExternal) {
					return `<a href="${url}" class="wiki-link" target="_blank" rel="noopener">${label}</a>`;
				} else if (url.includes("/")) {
					// Treat as internal: category/slug
					const [category, slug] = url.split("/");
					return `<a href="page.html?category=${category}&slug=${slug}" class="wiki-link">${label}</a>`;
				} else {
					// fallback if URL is malformed
					return `<span class="wiki-link-invalid">${label}</span>`;
				}
			})
			.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // **bold**
			.replace(/\*(.*?)\*/g, "<em>$1</em>"); // *italic*
	}

	function createList(block) {
		const listEl = block.style === "ordered"
			? document.createElement("ol")
			: document.createElement("ul");
		listEl.classList.add("wiki-list");

		block.items.forEach(item => {
			const li = document.createElement("li");

			if (typeof item === "string") {
				li.innerHTML = parseInlineFormatting(item);
			} else {
				li.innerHTML = parseInlineFormatting(item.text || "");
				if (item.subitems) {
					const subList = createList({
						style: block.style,
						items: item.subitems
					});
					li.appendChild(subList);
				}
			}

			listEl.appendChild(li);
		});

		return listEl;
	}

	blocks.forEach(block => {
		let el;

		switch (block.type) {
			case "header":
				el = document.createElement("h1");
				el.innerHTML = parseInlineFormatting(block.text);
				el.classList.add("wiki-h1");
				break;

			case "subheader":
				el = document.createElement("h2");
				el.innerHTML = parseInlineFormatting(block.text);
				el.classList.add("wiki-h2");
				break;

			case "paragraph":
				el = document.createElement("p");
				el.innerHTML = parseInlineFormatting(block.text).replace(/\n/g, "<br>");
				el.classList.add("wiki-p");
				break;

			case "list":
				el = createList(block);
				break;

			case "image":
				el = document.createElement("img");
				el.src = block.src;
				el.alt = block.alt || "";
				el.classList.add("wiki-img");
				break;

			case "hr":
				el = document.createElement("hr");
				el.classList.add("wiki-hr");
				break;

			default:
				console.warn("Unknown block type:", block.type);
				return;
		}

		container.appendChild(el);
	});
}
