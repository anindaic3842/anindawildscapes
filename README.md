# Aninda Wildscapes - Photography Portfolio

A modern, responsive photography portfolio website showcasing nature and wildlife photography. Built with React, Node.js, and modern web technologies.

## 🌟 Features

- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Photo Gallery**: Grid layout with hover effects and image enlargement
- **Category Filtering**: Filter photos by type (landscapes, portraits, events)
- **Lightbox Modal**: Full-screen photo viewing with navigation
- **About Section**: Professional bio with statistics and philosophy
- **Contact Form**: Validated form with email notifications
- **Modern Animations**: Smooth transitions using Framer Motion
- **SEO Optimized**: Clean URLs and meta tags
- **Fast Loading**: Optimized images and lazy loading

## 🚀 Live Demo

- **Frontend**: https://work-1-oaofybnkjbpvsjhy.prod-runtime.all-hands.dev
- **Backend API**: https://work-2-oaofybnkjbpvsjhy.prod-runtime.all-hands.dev

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **CSS3** - Modern styling with Grid and Flexbox

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Nodemailer** - Email service
- **Express Validator** - Input validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

## 📁 Project Structure

```
anindawildscapes/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── PhotoGallery.jsx
│   │   │   └── CategoryFilter.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   └── Contact.jsx
│   │   ├── data/            # Static data
│   │   │   └── photos.js
│   │   ├── App.jsx          # Main app component
│   │   ├── App.css          # Global styles
│   │   └── main.jsx         # Entry point
│   ├── public/              # Static assets
│   ├── package.json
│   └── vite.config.js       # Vite configuration
├── backend/                 # Node.js backend API
│   ├── routes/              # API routes
│   │   └── contact.js
│   ├── models/              # Data models
│   │   └── contact.js
│   ├── utils/               # Utility functions
│   │   └── emailService.js
│   ├── data/                # Data storage (JSON files)
│   ├── server.js            # Express server
│   ├── package.json
│   ├── .env                 # Environment variables
│   └── .env.example         # Environment template
└── README.md                # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anindaic3842/anindawildscapes.git
   cd anindawildscapes
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your email configuration (optional)
   ```

### Development

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on http://localhost:12001

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on http://localhost:12000

### Production Build

1. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start the backend in production mode**
   ```bash
   cd backend
   NODE_ENV=production npm start
   ```

## 📧 Email Configuration

The contact form can send email notifications. Configure these environment variables in `backend/.env`:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@anindawildscapes.com
EMAIL_TO=contact@anindawildscapes.com
```

**Note**: For Gmail, you'll need to use an App Password instead of your regular password.

## 🎨 Customization

### Adding Photos
1. Update `frontend/src/data/photos.js` with your photo URLs and metadata
2. Photos should be hosted on a CDN or image service (Unsplash, Cloudinary, etc.)

### Styling
- Main styles are in `frontend/src/App.css`
- Colors, fonts, and layout can be customized
- Responsive breakpoints: 768px (tablet), 480px (mobile)

### Content
- Update the About page content in `frontend/src/pages/About.jsx`
- Modify contact information in `frontend/src/pages/Contact.jsx`
- Change the site title and meta tags in `frontend/index.html`

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure redirects for client-side routing

### Backend (Heroku/Railway/DigitalOcean)
1. Set environment variables on your hosting platform
2. Deploy the backend folder
3. Update CORS origins in the backend configuration

### Full-Stack (Docker)
```dockerfile
# Example Dockerfile for backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 12001
CMD ["npm", "start"]
```

## 🔧 API Endpoints

### Contact Form
- **POST** `/api/contact` - Submit contact form
- **GET** `/api/contact/submissions` - Get all submissions (admin)

### Health Check
- **GET** `/api/health` - Server health status

## 🎯 Performance Optimizations

- **Image Optimization**: Use WebP format and responsive images
- **Lazy Loading**: Images load as they enter the viewport
- **Code Splitting**: React components are loaded on demand
- **Caching**: Static assets are cached with proper headers
- **Compression**: Gzip compression for all text assets

## 🔒 Security Features

- **Helmet.js**: Security headers
- **CORS**: Configured for specific origins
- **Input Validation**: Server-side validation for all inputs
- **Rate Limiting**: Prevent spam submissions (can be added)
- **XSS Protection**: Sanitized user inputs

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support or questions, please contact:
- Email: contact@anindawildscapes.com
- Website: [anindawildscapes.com](https://anindawildscapes.com)

## 🙏 Acknowledgments

- Photos from [Unsplash](https://unsplash.com) for demo purposes
- Icons from [Lucide](https://lucide.dev)
- Animations powered by [Framer Motion](https://framer.com/motion)

---

**Built with ❤️ by Aninda** - Wildlife & Nature Photographer