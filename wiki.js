/* wiki.js */

//alert("hello world")

fetch('data/topics.json')
  .then(res => res.json())
  .then(topics => {
    const container = document.getElementById("topics");
    topics.forEach(topic => {
      const link = document.createElement('a');
      link.href = `page.html?slug=${topic.slug}`;
      link.textContent = topic.title;
      container.appendChild(link);
    });
  });