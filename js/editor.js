import { renderContent } from './parser.js';

const pageTitleInput = document.getElementById("pageTitle");
const blocksContainer = document.getElementById("blocksContainer");
const addBlockBtn = document.getElementById("addBlockBtn");
const generateBtn = document.getElementById("generateBtn");
const jsonOutput = document.getElementById("jsonOutput");
const slugOutput = document.getElementById("slugOutput");
const previewContainer = document.getElementById("previewContainer");

const pageData = [];

pageTitleInput.addEventListener("input", () => {
	const slug = pageTitleInput.value
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
	slugOutput.textContent = slug;
});

addBlockBtn.addEventListener("click", () => {
	const blockWrapper = document.createElement("div");
	blockWrapper.className = "block";

	const typeSelect = document.createElement("select");
	typeSelect.innerHTML = `
		<option value="paragraph">Paragraph</option>
		<option value="header">Header</option>
		<option value="subheader">Subheader</option>
		<option value="list">List</option>
		<option value="image">Image</option>
		<option value="hr">Horizontal Rule</option>
	`;

	const dynamicFields = document.createElement("div");
	dynamicFields.className = "dynamic-fields";

	typeSelect.addEventListener("change", () => {
		const type = typeSelect.value;
		dynamicFields.innerHTML = "";

		switch (type) {
			case "paragraph":
			case "header":
			case "subheader":
				dynamicFields.innerHTML = `
					<label>Text:</label>
					<textarea name="text"></textarea>
				`;
				break;

			case "list":
				dynamicFields.innerHTML = `
					<label>Style:</label>
					<select name="style">
						<option value="unordered">Unordered</option>
						<option value="ordered">Ordered</option>
					</select>
					<label>Items (one per line):</label>
					<textarea name="items"></textarea>
				`;
				break;

			case "image":
				dynamicFields.innerHTML = `
					<label>Image URL:</label>
					<input type="text" name="src" />
					<label>Alt Text:</label>
					<input type="text" name="alt" />
				`;
				break;

			case "hr":
				dynamicFields.innerHTML = `<p>No additional input required for horizontal rule.</p>`;
				break;
		}
	});

	typeSelect.dispatchEvent(new Event("change"));

	blockWrapper.appendChild(typeSelect);
	blockWrapper.appendChild(dynamicFields);
	blocksContainer.appendChild(blockWrapper);
});

generateBtn.addEventListener("click", () => {
	const pageTitle = pageTitleInput.value.trim();
	const slug = pageTitle
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");

	const content = [];
	const blocks = blocksContainer.querySelectorAll(".block");

	blocks.forEach(block => {
		const type = block.querySelector("select").value;
		const fields = block.querySelector(".dynamic-fields");

		switch (type) {
			case "paragraph":
			case "header":
			case "subheader":
				content.push({
					type,
					text: fields.querySelector("textarea[name='text']").value
				});
				break;

			case "list":
				content.push({
					type,
					style: fields.querySelector("select[name='style']").value,
					items: fields
						.querySelector("textarea[name='items']")
						.value
						.split("\n")
						.filter(line => line.trim() !== "")
				});
				break;

			case "image":
				content.push({
					type,
					src: fields.querySelector("input[name='src']").value,
					alt: fields.querySelector("input[name='alt']").value
				});
				break;

			case "hr":
				content.push({ type });
				break;
		}
	});

	const pageJson = {
		title: pageTitle,
		content
	};

	const topicJson = {
		title: pageTitle,
		slug
	};

	// Set output to their respective fields
	document.getElementById("pageJsonOutput").value = JSON.stringify(pageJson, null, 2);
	document.getElementById("topicJsonOutput").value = JSON.stringify(topicJson);
    
    previewContainer.innerHTML = "";
    renderContent(content, previewContainer);
});