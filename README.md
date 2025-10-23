# Moon\* - IT Student and Company Job Matching Platform

A modern job matching platform built with **vanilla HTML, CSS, and JavaScript** that connects IT students with companies offering internships and entry-level positions.

## 🚀 Features

- **Dual User Roles**: Separate dashboards for students and companies
- **Student Features**:
  - Profile management
  - Job search and matching
  - Application tracking
  - AI-powered job recommendations
- **Company Features**:
  - Job posting management
  - Applicant review and management
  - Analytics dashboard
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean and intuitive interface with smooth animations

## 🛠️ Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom CSS with CSS Variables for theming
- **JavaScript (ES6+)**: Vanilla JavaScript for all functionality
- **No frameworks or libraries required!**

## 📦 Getting Started

### Prerequisites

- Node.js (for live-server, optional)
- A modern web browser

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd MoonAsterik
   ```

2. Install dependencies (optional, for live-server):
   ```bash
   npm install
   ```

### Running the Application

#### Option 1: Using npm (with live-server)

```bash
npm start
# or
npm run dev
```

The application will open at `http://localhost:3000`

#### Option 2: Direct file opening

Simply open `index.html` in your web browser.

#### Option 3: Using any other local server

```bash
# Python 3
python -m http.server 3000

# PHP
php -S localhost:3000
```

## 📁 Project Structure

```
MoonAsterik/
├── index.html          # Main HTML file
├── styles/
│   └── main.css        # All styles and CSS variables
├── js/
│   └── app.js          # Application logic and page templates
├── package.json        # Project metadata and scripts
└── README.md          # This file
```

## 🎨 Color Scheme

- **Primary**: `#00BCD4` (Cyan)
- **Secondary**: `#4DD0E1` (Light Cyan)
- **Dark**: `#263238` (Dark Blue Gray)
- **Gray**: `#78909C` (Blue Gray)
- **Light**: `#ECEFF1` (Light Blue Gray)

## 🔧 Customization

### Modifying Colors

Edit the CSS variables in `styles/main.css`:

```css
:root {
  --primary-color: #00bcd4;
  --secondary-color: #4dd0e1;
  --dark-color: #263238;
  /* ... */
}
```

### Adding New Pages

1. Add a new template function in `js/app.js` under `pageTemplates`
2. Update the routing logic in the `navigate()` method
3. Add navigation links as needed

### Modifying Layout

All layout styles are in `styles/main.css`. The project uses:

- CSS Grid for complex layouts
- Flexbox for component alignment
- CSS Variables for consistent spacing and sizing

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## 📝 License

This project is private and all rights are reserved.

## 👥 Contributing

This is a private project. Contact the repository owner for contribution guidelines.

## 🙏 Acknowledgments

- Icons are inline SVG implementations inspired by Lucide Icons
- Images from Unsplash (replace with your own in production)
