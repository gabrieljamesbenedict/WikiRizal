/* wiki.js */
fetch('data/topics.json')
	.then(res => res.json())
	.then(topics => {
		const container = document.getElementById("topics");
		container.innerHTML = '';
		topics.forEach(topic => {
			const link = document.createElement('a');
			link.href = `page.html?slug=${topic.slug}`;
			link.textContent = topic.title;
			container.appendChild(link);
		});
	})
	.catch(err => {
		const container = document.getElementById("topics");
		container.innerHTML = "<p>Failed to load topics. Please check your data file.</p>";
	});
