import { useEffect, useRef, useState } from 'react'
import './App.css'
import img1 from './assets/backgroundImgs/img1.jpg'
import img2 from './assets/backgroundImgs/img2.jpg'
import img3 from './assets/backgroundImgs/img3.jpg'
import img4 from './assets/backgroundImgs/img4.jpg'
import img5 from './assets/backgroundImgs/img5.jpg'
import img6 from './assets/backgroundImgs/img6.jpg'


function App() {
  
  const images = [img1, img2, img3, img4, img5, img6];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);
  const [currentPage, setCurrentPage] = useState("Strona główna");
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!isShrunk) startSlideshow();
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, isShrunk]);

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


  const handleClick = (page) => {
    if(page === currentPage) return true; 
    if(currentPage === "Strona główna") shrinkMenu(page);
    else if (page === "Strona główna") expandMenu(page);
    else setCurrentPage(page);
  }

  const shrinkMenu = (page) => {
    setCurrentPage(page);
    setTimeout(() => {
      setIsShrunk(true);
    }, 300)
  }

  const expandMenu = (page) => {
    setTimeout(() => {
      setIsShrunk(false);
      setCurrentPage(page);
    }, 100)
  }

  useEffect(() => {
    if (isShrunk) {
      document.body.classList.remove("hidden");
    }
    else {
      document.body.classList.add("hidden");
    }
  }, [isShrunk]);

  useEffect(() => {
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);



  // Gallery Logic
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);


  return (
    <>
      <div className={`backgroundContainer ${isShrunk ? "fade backgroundIndex" : ""}`}>
        <div className="slide base"
              style={{backgroundImage: `url(${images[nextIndex]})`}}
        ></div>
        <div className={`slide overlay ${isTransitioning ? "fade" : ""}`}
              style={{backgroundImage: `url(${images[currentIndex]})`}}
        ></div>
      </div>
      <div className={`textContainer ${isShrunk ? "shrunk" : "full"}`}>
        <h1>Wikaafotos</h1>
        <p className={`${currentPage === "Strona główna" ? "active" : ""}`} onClick={() => handleClick("Strona główna")}>Strona główna</p>
        <p className={`${currentPage === "Galeria" ? "active" : ""}`} onClick={() => handleClick("Galeria")}>Galeria</p>
        <p className={`${currentPage === "O mnie" ? "active" : ""}`} onClick={() => handleClick("O mnie")}>O mnie</p>
        <p className={`${currentPage === "Kontakt" ? "active" : ""}`} onClick={() => handleClick("Kontakt")}>Kontakt</p>
      </div>
      <div className={`sectionContainer ${currentPage === "Galeria" ? "" : "hide"}`}>
        <h1 className='sectionTitle'>Galeria</h1>
        <div className={`galleryGrid ${isGalleryHovered ? "dimOthers" : ""}`}>
          <div className='galleryOption' onMouseEnter={() => setIsGalleryHovered(true)} onMouseLeave={() => setIsGalleryHovered(false)}>
            <img src={img1} />
            <p>Sesja lorem ipsum dolor</p>
          </div>
          <div className='galleryOption' onMouseEnter={() => setIsGalleryHovered(true)} onMouseLeave={() => setIsGalleryHovered(false)}>
            <img src={img2} />
            <p>Sesja lorem ipsum dolor</p>
          </div>
          <div className='galleryOption' onMouseEnter={() => setIsGalleryHovered(true)} onMouseLeave={() => setIsGalleryHovered(false)}>
            <img src={img3} />
            <p>Sesja lorem ipsum dolor</p>
          </div>
          <div className='galleryOption' onMouseEnter={() => setIsGalleryHovered(true)} onMouseLeave={() => setIsGalleryHovered(false)}>
            <img src={img4} />
            <p>Sesja lorem ipsum dolor</p>
          </div>
          <div className='galleryOption' onMouseEnter={() => setIsGalleryHovered(true)} onMouseLeave={() => setIsGalleryHovered(false)}>
            <img src={img5} />
            <p>Sesja lorem ipsum dolor</p>
          </div>
          <div className='galleryOption' onMouseEnter={() => setIsGalleryHovered(true)} onMouseLeave={() => setIsGalleryHovered(false)}>
            <img src={img6} />
            <p>Sesja lorem ipsum dolor</p>
          </div>
        </div>
      </div>
      <div className={`sectionContainer ${currentPage === "O mnie" ? "" : "hide"}`}>
        <h1 className='sectionTitle'>O mnie</h1>
      </div>
      <div className={`sectionContainer ${currentPage === "Kontakt" ? "" : "hide"}`}>
        <h1 className='sectionTitle'>Kontakt</h1>
      </div>
      {isShrunk && <footer>
        <p>Wikaafotos © 2025. Wszelkie prawa zastrzeżone</p>
      </footer>}
    </>
  )
}
// Yeah
export default App