import { useEffect, useRef, useState } from 'react'
import './App.css'
import img1 from './assets/backgroundImgs/img1.jpg'
import img2 from './assets/backgroundImgs/img2.jpg'
import img3 from './assets/backgroundImgs/img3.jpg'
import img4 from './assets/backgroundImgs/img4.jpg'
import img5 from './assets/backgroundImgs/img5.jpg'

function App() {

  const images = [img1, img2, img3, img4, img5];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    startSlideshow();
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex]);

  const startSlideshow = () => {
    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(prev => (prev+1) % images.length);
        setNextIndex(prev => (prev+1) % images.length);
      },300)
      
    },5000)
  }


  return (
    <>
      <div className='backgroundContainer'>
        <div className="slide base"
              style={{backgroundImage: `url(${images[nextIndex]})`}}
        ></div>
        <div className={`slide overlay ${isTransitioning ? "fade" : ""}`}
              style={{backgroundImage: `url(${images[currentIndex]})`}}
        ></div>
      </div>
      <div className='textContainer'>
        <h1>Wikaafotos</h1>
        <p className='active'>Strona główna</p>
        <p>Galeria</p>
        <p>O mnie</p>
        <p>Kontakt</p>
      </div>
    </>
  )
}

export default App