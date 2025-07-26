// page.js
import { renderContent } from './parser.js';

const container = document.getElementById("contents");

document.addEventListener("DOMContentLoaded", () => {
	const params = new URLSearchParams(window.location.search);
	const category = params.get("category");
	const slug = params.get("slug");

	if (!category || !slug) {
		document.title = "Page Not Found";
		document.getElementById("title").textContent = "Missing parameters";
		document.getElementById("content").innerHTML = "No category or slug was provided in the URL.";
		return;
	}

	const path = `data/${category}/pages/${slug}.json`;

	fetch(path)
		.then(response => {
			if (!response.ok) throw new Error("Page not found");
			return response.json();
		})
		.then(data => {
			document.title = data.title;s
			container.innerHTML = "";
			
			data.content.forEach(block => {
				renderContent(data.content, container)
			});
		})
		.catch(err => {
			document.title = "Not Found";
			document.getElementById("title").textContent = "Page not found";
			document.getElementById("content").textContent = "The page you requested does not exist.";
			console.log(err);
		});
});
