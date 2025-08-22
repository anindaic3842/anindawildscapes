import { useState } from 'react'
import { motion } from 'framer-motion'
import PhotoGallery from '../components/PhotoGallery'
import CategoryFilter from '../components/CategoryFilter'
import { photos, categories } from '../data/photos'

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  return (
    <div className="home">
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <h1>Aninda Wildscapes</h1>
          <p>Capturing the raw beauty of nature through the lens</p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hero-scroll"
          >
            <span>Scroll to explore</span>
          </motion.div>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop" 
            alt="Hero landscape" 
          />
        </div>
      </motion.section>

      <motion.section
        className="gallery-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2>Portfolio</h2>
            <p>Explore my collection of nature and wildlife photography</p>
          </motion.div>

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <PhotoGallery
            photos={photos}
            selectedCategory={selectedCategory}
          />
        </div>
      </motion.section>
    </div>
  )
}

export default Home