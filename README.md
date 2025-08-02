# WikiRizal 🇵🇭

A comprehensive digital encyclopedia dedicated to Dr. Jose Rizal, the national hero of the Philippines. This interactive website provides detailed information about his life, works, family, medical practice, and lasting impact on Philippine history.

## 🌟 Features

- **Modern Dark Theme**: Sleek, minimalist design with mobile responsiveness
- **Comprehensive Content**: Life, works, timeline, trivia, family tree, medical practice, literary analysis, and colonial education
- **Interactive Elements**: Crossword puzzles and games
- **Mobile-First Design**: Optimized for all devices
- **Educational Resources**: Detailed analysis and historical context

## 🚀 Live Demo

Visit the live website: [WikiRizal](https://your-domain.com) *(Replace with your actual URL)*

## 📁 Project Structure

```
WikiRizal/
├── index.html              # Homepage
├── page.html              # Dynamic content pages
├── crossword.html         # Interactive crossword game
├── editor.html           # Content editor (for contributors)
├── credits.html          # Credits and acknowledgments
├── wiki.css             # Main stylesheet
├── README.md            # This file
├── assets/
│   └── images/          # All images and placeholders
├── data/               # JSON content files
│   ├── home.json
│   ├── credits.json
│   ├── biography/      # Rizal's life and biography
│   ├── works/          # Literary works
│   ├── timeline/       # Historical timeline
│   ├── trivia/         # Fun facts and trivia
│   ├── family/         # Family tree and relationships
│   ├── medical/        # Medical practice and career
│   ├── literary/       # Literary analysis
│   ├── education/      # Colonial education system
│   └── gallery/        # Image galleries
└── js/                 # JavaScript files
    ├── index.js
    ├── page.js
    ├── editor.js
    ├── credits.js
    └── parser.js
```

## 🤝 How to Contribute

We welcome contributions to make WikiRizal even better! Here's how you can help:

### 📝 Adding New Content Pages

#### 1. Understanding the JSON Structure

All content is stored in JSON files with a specific structure:

**Topic Overview (`topics.json`)**:
```json
{
  "title": "Section Title",
  "description": "Brief description of the section",
  "topics": [
    {
      "title": "Page Title",
      "slug": "page-url-slug",
      "description": "Page description",
      "image": "assets/images/page-image.jpg"
    }
  ]
}
```

**Individual Pages**:
```json
{
  "title": "Page Title",
  "content": [
    {
      "type": "h1",
      "text": "Main Heading"
    },
    {
      "type": "p",
      "text": "Paragraph content with detailed information."
    },
    {
      "type": "h2",
      "text": "Subheading"
    },
    {
      "type": "img",
      "src": "assets/images/image-name.jpg",
      "alt": "Image description"
    },
    {
      "type": "list",
      "items": [
        "List item 1",
        "List item 2",
        "**Bold item** with formatting"
      ]
    }
  ]
}
```

#### 2. Content Types Available

| Type | Usage | Example |
|------|-------|---------|
| `h1` | Main headings | `{"type": "h1", "text": "Jose Rizal's Education"}` |
| `h2` | Subheadings | `{"type": "h2", "text": "University Years"}` |
| `p` | Paragraphs | `{"type": "p", "text": "Detailed paragraph..."}` |
| `img` | Images | `{"type": "img", "src": "path/to/image.jpg", "alt": "Description"}` |
| `list` | Bullet lists | `{"type": "list", "items": ["Item 1", "Item 2"]}` |

#### 3. Adding a New Section

1. **Create the directory structure**:
   ```bash
   mkdir data/new-section
   mkdir data/new-section/pages
   ```

2. **Create `topics.json`**:
   ```json
   {
     "title": "New Section",
     "description": "Description of the new section",
     "topics": [
       {
         "title": "First Page",
         "slug": "first-page",
         "description": "Description of the first page",
         "image": "assets/images/first-page-placeholder.jpg"
       }
     ]
   }
   ```

3. **Create individual page files** in `data/new-section/pages/`:
   - File name should match the slug: `first-page.json`

4. **Update navigation** in all HTML files:
   ```html
   <li><a href="page.html?category=new-section&slug=overview">New Section</a></li>
   ```

### 🖼️ Adding Images

#### 1. Image Guidelines

- **Format**: JPG, PNG, or WebP
- **Size**: Optimize for web (recommended max width: 1200px)
- **Naming**: Use descriptive, kebab-case names
- **Location**: Place all images in `assets/images/`

#### 2. Image Naming Convention

```
assets/images/
├── rizal-portrait.jpg              # Main portraits
├── noli-me-tangere-cover.jpg       # Book covers
├── ateneo-manila-1870s.jpg         # Historical places
├── familia-rizal-1890.jpg          # Family photos
├── medical-instruments-19th.jpg     # Historical artifacts
└── *-placeholder.jpg               # Temporary placeholders
```

#### 3. Adding Images to Content

```json
{
  "type": "img",
  "src": "assets/images/your-image-name.jpg",
  "alt": "Descriptive alt text for accessibility"
}
```

#### 4. Creating Placeholder Images

For temporary layouts, create placeholder files:
```bash
touch assets/images/your-content-placeholder.jpg
```

### 🌐 Adding New Web Pages

#### 1. Static Pages

For completely new static pages (like crossword.html):

1. **Create the HTML file**:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <title>Page Title - WikiRizal</title>
     <link rel="stylesheet" href="wiki.css" />
   </head>
   <body>
     <!-- Copy navigation from existing pages -->
     <header>
       <nav class="navbar">
         <!-- Navigation content -->
       </nav>
     </header>
     
     <main>
       <!-- Your content here -->
     </main>
   </body>
   </html>
   ```

2. **Update navigation** in all existing HTML files

3. **Add corresponding JavaScript** if needed in the `js/` folder

#### 2. Dynamic Content Pages

Dynamic pages use the existing `page.html` structure and load content from JSON files. This is the recommended approach for most content.

### 🎨 Styling Guidelines

#### 1. CSS Classes Available

| Class | Purpose | Usage |
|-------|---------|-------|
| `.wiki-h1` | Main headings | Automatically applied to h1 elements |
| `.wiki-h2` | Subheadings | Automatically applied to h2 elements |
| `.wiki-p` | Paragraphs | Automatically applied to p elements |
| `.wiki-img` | Images | Automatically applied to images |
| `.wiki-list` | Lists | Automatically applied to lists |

#### 2. Color Scheme

```css
/* Main colors used in the theme */
--background: #0a0a0a
--secondary-bg: #1a1a1a
--accent: #64b5f6
--text: #e0e0e0
--border: #333
```

### 📱 Mobile Responsiveness

All new content automatically inherits mobile responsiveness. Key breakpoints:

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

### ✅ Content Quality Guidelines

#### 1. Historical Accuracy
- Verify all facts with reliable sources
- Include proper historical context
- Cite sources when possible

#### 2. Writing Style
- Use clear, accessible language
- Break up long paragraphs
- Include relevant subheadings
- Maintain consistent tone

#### 3. Image Usage
- Ensure images are historically relevant
- Include descriptive alt text
- Respect copyright laws
- Use high-quality images when possible

## 🛠️ Development Setup

### Prerequisites
- Modern web browser
- Text editor (VS Code recommended)
- Basic knowledge of HTML, CSS, and JSON
- Local web server (optional, for testing)

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Bleu24/WikiRizal.git
   cd WikiRizal
   ```

2. **Open in a local server**:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Or simply open index.html in your browser
   ```

3. **Make your changes** following the contribution guidelines above

4. **Test thoroughly** on different screen sizes

### Using the Content Editor

The website includes a built-in content editor at `editor.html`:

1. Open `editor.html` in your browser
2. Create your content using the visual editor
3. Copy the generated JSON
4. Paste into the appropriate JSON file
5. Test the changes

## 📋 Contribution Checklist

Before submitting your contribution:

- [ ] Content is historically accurate
- [ ] JSON syntax is valid
- [ ] Images are optimized and properly named
- [ ] Alt text is provided for all images
- [ ] Content is mobile-friendly
- [ ] Navigation is updated if needed
- [ ] Changes are tested in multiple browsers
- [ ] Spelling and grammar are correct

## 🚀 Deployment

The website is designed to work with static hosting services:

- **GitHub Pages**: Automatic deployment from main branch
- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **Any static hosting**: Upload files via FTP

## 📞 Support

If you need help contributing:

1. **Check existing issues** on GitHub
2. **Create a new issue** for bugs or feature requests
3. **Join discussions** in the repository
4. **Review the wiki** for detailed examples

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Dr. Jose Rizal** - The inspiration for this project
- **Philippine historians** - For preserving Rizal's legacy
- **Contributors** - Everyone who helps improve this resource
- **Educators** - Who use this resource to teach about Philippine history

## 📊 Project Status

- ✅ Basic website structure
- ✅ Dark theme implementation
- ✅ Mobile responsiveness
- ✅ Core content sections
- ✅ Interactive crossword
- 🔄 Additional content pages (ongoing)
- 🔄 Image collection (ongoing)
- 📋 Advanced features (planned)

---

