import { motion } from 'framer-motion'
import { Camera, Award, MapPin, Heart } from 'lucide-react'

const About = () => {
  return (
    <div className="about">
      <motion.section
        className="about-hero"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="about-content">
            <motion.div
              className="about-text"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1>About Me</h1>
              <h2>Aninda - Nature & Wildlife Photographer</h2>
              <p>
                Welcome to my world of photography! I'm Aninda, a passionate nature and wildlife 
                photographer based in the heart of India's wilderness. For over a decade, I've been 
                capturing the raw beauty and untamed spirit of the natural world.
              </p>
              <p>
                My journey began with a simple love for the outdoors and has evolved into a deep 
                commitment to conservation through visual storytelling. Each photograph tells a story 
                of resilience, beauty, and the delicate balance of our ecosystem.
              </p>
              <p>
                When I'm not behind the camera, you'll find me trekking through remote forests, 
                waiting patiently for the perfect light, or sharing stories around a campfire with 
                fellow nature enthusiasts.
              </p>
            </motion.div>
            
            <motion.div
              className="about-image"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop" 
                alt="Aninda - Photographer" 
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="about-stats"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="container">
          <div className="stats-grid">
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Camera size={40} />
              <h3>10+</h3>
              <p>Years of Experience</p>
            </motion.div>
            
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <Award size={40} />
              <h3>25+</h3>
              <p>Awards Won</p>
            </motion.div>
            
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <MapPin size={40} />
              <h3>50+</h3>
              <p>Locations Explored</p>
            </motion.div>
            
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <Heart size={40} />
              <h3>1000+</h3>
              <p>Happy Clients</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="about-philosophy"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="container">
          <div className="philosophy-content">
            <h2>My Philosophy</h2>
            <blockquote>
              "Photography is not just about capturing what you see, but about revealing 
              what you feel. Every frame is an opportunity to connect people with the 
              natural world and inspire them to protect it."
            </blockquote>
            <p>
              I believe in ethical wildlife photography that respects the subjects and their 
              habitat. My work aims to raise awareness about conservation while celebrating 
              the incredible diversity of life on our planet.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default About