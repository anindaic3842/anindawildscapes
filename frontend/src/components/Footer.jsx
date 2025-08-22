import { motion } from 'framer-motion'
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="footer-content"
        >
          <div className="footer-section">
            <h3>Aninda Wildscapes</h3>
            <p>Capturing the beauty of nature through photography</p>
          </div>
          
          <div className="footer-section">
            <h4>Follow Me</h4>
            <div className="social-links">
              <a href="#" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="mailto:contact@anindawildscapes.com" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="footer-bottom"
        >
          <p>&copy; 2024 Aninda Wildscapes. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer