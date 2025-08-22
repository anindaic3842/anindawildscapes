import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const PhotoGallery = ({ photos, selectedCategory }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [filteredPhotos, setFilteredPhotos] = useState(photos)

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredPhotos(photos)
    } else {
      setFilteredPhotos(photos.filter(photo => photo.category === selectedCategory))
    }
  }, [selectedCategory, photos])

  const openModal = (photo) => {
    setSelectedPhoto(photo)
  }

  const closeModal = () => {
    setSelectedPhoto(null)
  }

  const navigatePhoto = (direction) => {
    const currentIndex = filteredPhotos.findIndex(photo => photo.id === selectedPhoto.id)
    let newIndex
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredPhotos.length
    } else {
      newIndex = currentIndex === 0 ? filteredPhotos.length - 1 : currentIndex - 1
    }
    
    setSelectedPhoto(filteredPhotos[newIndex])
  }

  // Debug: Log the photos to console
  console.log('PhotoGallery - filteredPhotos:', filteredPhotos)
  console.log('PhotoGallery - selectedCategory:', selectedCategory)

  return (
    <>
      <div className="photo-gallery">
        {filteredPhotos.length === 0 ? (
          <div className="no-photos">
            <p>No photos found for category: {selectedCategory}</p>
          </div>
        ) : null}
        <AnimatePresence>
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="photo-item"
              onClick={() => openModal(photo)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src={photo.src} 
                alt={photo.title} 
                loading="lazy"
                onError={(e) => {
                  e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  e.target.style.display = 'flex'
                  e.target.style.alignItems = 'center'
                  e.target.style.justifyContent = 'center'
                  e.target.style.color = 'white'
                  e.target.style.fontSize = '14px'
                  e.target.innerHTML = 'Image not available'
                }}
              />
              <div className="photo-overlay">
                <h3>{photo.title}</h3>
                <p>{photo.category}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={closeModal}>
                <X size={24} />
              </button>
              
              <button className="modal-nav prev" onClick={() => navigatePhoto('prev')}>
                <ChevronLeft size={24} />
              </button>
              
              <img src={selectedPhoto.src} alt={selectedPhoto.title} />
              
              <button className="modal-nav next" onClick={() => navigatePhoto('next')}>
                <ChevronRight size={24} />
              </button>
              
              <div className="modal-info">
                <h3>{selectedPhoto.title}</h3>
                <p>{selectedPhoto.description}</p>
                <span className="category-tag">{selectedPhoto.category}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default PhotoGallery