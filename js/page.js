// page.js
import { renderContent } from './parser.js';

const container = document.getElementById("contents");

document.addEventListener("DOMContentLoaded", () => {
	const params = new URLSearchParams(window.location.search);
	const category = params.get("category");
	const slug = params.get("slug");

	if (!category || !slug) {
		setErrorPage("Missing parameters", "No category or slug was provided in the URL.");
		return;
	}

	if (slug === "overview") {
		loadOverviewPage(category);
	} else {
		loadStandardPage(category, slug);
	}
});

function loadStandardPage(category, slug) {
	const path = `data/${category}/pages/${slug}.json`;

	fetch(path)
		.then(response => {
			if (!response.ok) throw new Error("Page not found");
			return response.json();
		})
		.then(data => {
			document.title = data.title || "Untitled";
			container.innerHTML = "";
			renderContent(data.content, container);
		})
		.catch(err => {
			setErrorPage("Page not found", "The page you requested does not exist.");
			console.error(err);
		});
}

function loadOverviewPage(category) {
	const topicsPath = `data/${category}/topics.json`;

	fetch(topicsPath)
		.then(response => {
			if (!response.ok) throw new Error("Topics not found");
			return response.text(); // fetch as text first
		})
		.then(text => {
			if (!text.trim()) throw new Error("Topics file is empty");
			const data = JSON.parse(text); // safe to parse now
			const overviewContent = buildOverviewContent(category, data.topics);
			document.title = `Overview – ${capitalize(category)}`;
			container.innerHTML = "";
			renderContent(overviewContent, container);
		})
		.catch(err => {
			setErrorPage("Overview not found", "Could not load the overview for this category.");
			console.error(err);
		});
}

function buildOverviewContent(category, topics) {
	const introMap = {
		biography: "Explore José Rizal’s journey from childhood to martyrdom.",
		works: "Dive into his novels, essays, and letters that shaped Philippine nationalism.",
		timeline: "Track significant events that occurred during Rizal’s lifetime.",
		gallery: "Browse rare photographs and historical documents of Rizal.",
		trivia: "Discover lesser-known facts and surprising insights about Rizal’s life."
	};

	const intro = introMap[category] || "Explore this category for more insights.";

	return [
		{ type: "header", text: `About ${capitalize(category)}` },
		{ type: "paragraph", text: intro },
		{ type: "subheader", text: "Key Topics" },
		{
			type: "list",
			style: "unordered",
			items: topics.map(topic => `[${topic.title}](${category}/${topic.slug})`)
		}
	];
}

function setErrorPage(titleText, bodyText) {
	document.title = "Not Found";
	document.getElementById("title").textContent = titleText;
	document.getElementById("content").textContent = bodyText;
}

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
