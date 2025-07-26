// index.js
import { renderContent } from './parser.js';

const container = document.getElementById("contents");
fetch('../data/home.json')
	.then(response => {
		if (!response.ok) throw new Error("Failed to load home page content.");
		return response.json();
	})
	.then(data => {
		document.title = data.title || "Rizal Wiki";
		renderContent(data.content, container);
	})
	.catch(err => {
		document.title = "Not Found";
		document.getElementById("title").textContent = "Page not found";
		document.getElementById("content").textContent = "The page you requested does not exist.";
		console.log(err);
	});
