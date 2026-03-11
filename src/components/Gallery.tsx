import { useState, useCallback, useEffect, useRef } from "react";
import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpeg";
import img4 from "../assets/img4.jpeg";
import img5 from "../assets/img5.jpeg";
import img6 from "../assets/img6.jpeg";
import img7 from "../assets/img7.jpeg";
import img8 from "../assets/img8.jpeg";
import img9 from "../assets/img9.jpeg";
import img10 from "../assets/img10.jpeg";
import img11 from "../assets/img11.jpeg";
import img12 from "../assets/img12.jpeg";
import img13 from "../assets/img13.jpeg";
import img14 from "../assets/img14.jpeg";
import img15 from "../assets/img15.jpeg";
import img16 from "../assets/img16.jpeg";
import img17 from "../assets/img17.jpeg";
import img18 from "../assets/img18.jpeg";

const categories = ["Italy","Dubai","London","Berlin","Rome","Lisbon","India","China","Japan"];

const galleryItems = [
  { src: img1, alt: "Gallery Image 1", type: "photo" },
  { src: img2, alt: "Gallery Image 2", type: "photo" },
  { src: img3, alt: "Gallery Image 3", type: "photo" },
  { src: img4, alt: "Gallery Image 4", type: "photo" },
  { src: img5, alt: "Gallery Image 5", type: "photo" },
  { src: img6, alt: "Gallery Image 6", type: "photo" },
  { src: img7, alt: "Gallery Image 7", type: "photo" },
  { src: img8, alt: "Gallery Image 8", type: "photo" },
  { src: img9, alt: "Gallery Image 9", type: "photo" },
  { src: img10, alt: "Gallery Image 10", type: "photo" },
  { src: img11, alt: "Gallery Image 11", type: "photo" },
  { src: img12, alt: "Gallery Image 12", type: "photo" },
  { src: img13, alt: "Gallery Image 13", type: "photo" },
  { src: img14, alt: "Gallery Image 14", type: "photo" },
  { src: img15, alt: "Gallery Image 15", type: "photo" },
  { src: img16, alt: "Gallery Image 16", type: "photo" },
  { src: img17, alt: "Gallery Image 17", type: "photo" },
  { src: img18, alt: "Gallery Image 18", type: "photo" },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; }

  @keyframes g-float { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.05)} 66%{transform:translate(-20px,15px) scale(0.95)} }
  @keyframes g-float-r { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-25px,20px) scale(1.05)} 66%{transform:translate(15px,-25px) scale(0.95)} }
  @keyframes g-pulse { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:0.7;transform:scale(1.1)} }
  @keyframes g-shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes g-bup { 0%{transform:translateY(0) scale(1);opacity:0} 10%{opacity:1} 90%{opacity:0.3} 100%{transform:translateY(-120vh) translateX(-10px) scale(0.8);opacity:0} }
  @keyframes g-bdn { 0%{transform:translateY(0) scale(1);opacity:0} 10%{opacity:1} 90%{opacity:0.3} 100%{transform:translateY(120vh) translateX(10px) scale(0.7);opacity:0} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
  @keyframes scaleIn { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }

  .g-float{animation:g-float 12s ease-in-out infinite}
  .g-float-r{animation:g-float-r 15s ease-in-out infinite}
  .g-pulse{animation:g-pulse 6s ease-in-out infinite}
  .g-shimmer{background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.18) 45%,rgba(255,255,255,0.07) 50%,transparent 55%);background-size:200% 100%;animation:g-shimmer 3s ease-in-out infinite;pointer-events:none}
  .g-bup{animation:g-bup linear infinite}
  .g-bdn{animation:g-bdn linear infinite}

  .gallery-section {
    width:100%; min-height:100vh; position:relative;
    display:flex; align-items:center; justify-content:center;
    padding:4rem 1rem; overflow:hidden;
    background: #000; /* switched to black */
  }
  .gallery-label { font-size:0.72rem; font-weight:600; letter-spacing:0.32em; text-transform:uppercase; color:hsl(245,40%,45%); display:block; margin-bottom:0.75rem; animation: fadeIn 1s 0.2s both; }
  .gallery-heading { font-family:'Playfair Display',serif; font-size:clamp(2rem,5vw,3.6rem); font-weight:700; color:hsl(354, 39%, 27%); margin-bottom:1rem; animation: scaleIn 0.8s 0.3s both; }
  .gallery-sub { color:hsl(220,10%,45%); font-size:clamp(0.9rem,2vw,1.1rem); line-height:1.65; animation: fadeIn 0.8s 0.5s both; }
  .gallery-header { text-align:center; margin-bottom:2.5rem; animation: fadeUp 0.8s both; }

  .pill-wrap { display:flex; flex-wrap:wrap; justify-content:center; gap:0.5rem; margin-bottom:3rem; animation: fadeUp 0.6s 0.6s both; }
  .pill { padding:0.45rem 1.2rem; border-radius:9999px; font-size:0.875rem; font-weight:500; border:1px solid hsl(220,15%,80%); background:rgba(255,255,255,0.6); color:hsl(240,15%,30%); cursor:pointer; backdrop-filter:blur(8px); transition:all 0.25s; font-family:'DM Sans',sans-serif; }
  .pill:hover { border-color:hsl(240,30%,15%); box-shadow:0 2px 10px -2px rgba(0,0,0,0.1); transform:scale(1.04); }
  .pill.active { background:hsl(358, 80%, 48%); color:#fff; border-color:hsl(0, 88%, 54%); box-shadow:0 4px 15px -3px hsla(245,50%,28%,0.4); }

  .carousel-wrap { position:relative; display:flex; align-items:center; justify-content:center; height:clamp(360px,48vw,480px); animation: fadeIn 0.8s 0.8s both; }
  .card-wrap { position:absolute; transition:all 0.55s cubic-bezier(0.34,1.56,0.64,1); }
  .card { position:relative; overflow:hidden; border-radius:1rem; box-shadow:0 15px 40px -10px rgba(0,0,0,0.25),0 0 0 1px rgba(255,255,255,0.1); cursor:pointer; }
  .card img { width:100%; height:100%; object-fit:cover; transition:transform 0.7s; display:block; }
  .card:hover img { transform:scale(1.08); }
  .card-overlay { position:absolute; inset:0; background:linear-gradient(to top, hsl(240,30%,8%), transparent); opacity:0.6; pointer-events:none; }
  .play-btn { position:absolute; bottom:1rem; right:1rem; width:46px; height:46px; background:rgba(255,255,255,0.92); border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 12px rgba(0,0,0,0.15); cursor:pointer; transition:transform 0.2s; animation:g-pulse 2s infinite; }
  .play-btn:hover { transform:scale(1.18); }
  .play-btn svg { margin-left:2px; }

  .dots { display:flex; justify-content:center; gap:0.45rem; margin-top:1.5rem; }
  .dot { border:none; cursor:pointer; border-radius:9999px; background:hsl(220,15%,80%); height:8px; padding:0; transition:all 0.3s; }
  .dot.active { background:hsl(0, 72%, 40%); width:32px !important; }

  .arrows { display:flex; justify-content:center; gap:1rem; margin-top:1.25rem; }
  .arrow-btn { width:44px; height:44px; border-radius:50%; border:1px solid hsl(220,15%,80%); display:flex; align-items:center; justify-content:center; color:hsl(240,15%,30%); background:rgba(255,255,255,0.6); cursor:pointer; backdrop-filter:blur(8px); transition:all 0.25s; font-size:1.1rem; }
  .arrow-btn:hover { border-color:hsl(240,30%,15%); transform:scale(1.1); box-shadow:0 2px 10px -2px rgba(0,0,0,0.1); }

  .bubble { position:absolute; border-radius:50%; border:1px solid hsla(245,50%,60%,0.2); background:hsla(245,50%,75%,0.06); pointer-events:none; }
`;

const BUBBLES = Array.from({ length: 18 }, () => ({
  size: 8 + Math.random() * 40,
  left: Math.random() * 100,
  delay: Math.random() * 12,
  duration: 10 + Math.random() * 14,
  goUp: Math.random() > 0.5,
}));

export default function Gallery() {
  const [active, setActive] = useState("Italy");
  const [center, setCenter] = useState(1);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const prev = useCallback(() => setCenter(p => (p - 1 + galleryItems.length) % galleryItems.length), []);
  const next = useCallback(() => setCenter(p => (p + 1) % galleryItems.length), []);

  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setCenter(p => (p + 1) % galleryItems.length);
    }, 2000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, galleryItems.length]);

  const visible = Array.from({ length: 5 }, (_, i) => {
    const offset = i - 2;
    const index = (center + offset + galleryItems.length) % galleryItems.length;
    return { ...galleryItems[index], offset, originalIndex: index };
  });

  const getCardStyle = (offset) => {
    const abs = Math.abs(offset);
    const isCenter = offset === 0;
    const scale = isCenter ? 1 : abs === 1 ? 0.82 : 0.65;
    const w = isCenter ? "clamp(230px,20vw,320px)" : "clamp(185px,16vw,265px)";
    const h = isCenter ? "clamp(300px,28vw,420px)" : "clamp(240px,23vw,355px)";
    return {
      transform: `translateX(${offset * 230}px) scale(${scale}) rotateY(${offset * -5}deg)`,
      zIndex: 10 - abs,
      opacity: abs <= 1 ? 1 : 0.45,
      filter: abs >= 2 ? "blur(2px)" : "none",
      width: w, height: h,
    };
  };

  return (
    <>
      <style>{styles}</style>
      <section id="gallery" className="gallery-section" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        {/* Glows */}
        <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
          <div className="g-float" style={{position:"absolute",top:"-50%",left:"-25%",width:600,height:600,borderRadius:"50%",background:"hsla(245,60%,70%,0.15)",filter:"blur(120px)"}}/>
          <div className="g-float-r" style={{position:"absolute",bottom:"-33%",right:"-25%",width:500,height:500,borderRadius:"50%",background:"hsla(280,50%,65%,0.12)",filter:"blur(100px)"}}/>
          <div className="g-pulse" style={{position:"absolute",top:"25%",right:"33%",width:300,height:300,borderRadius:"50%",background:"hsla(200,60%,70%,0.1)",filter:"blur(80px)"}}/>
        </div>

        {/* Bubbles */}
        <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
          {BUBBLES.map((b,i)=>(
            <div key={i} className={`bubble ${b.goUp?"g-bup":"g-bdn"}`}
              style={{width:b.size,height:b.size,left:`${b.left}%`,top:b.goUp?"110%":"-10%",animationDelay:`${b.delay}s`,animationDuration:`${b.duration}s`}}/>
          ))}
        </div>

        <div style={{width:"100%",maxWidth:1100,margin:"0 auto", marginTop:"4rem",position:"relative",zIndex:10}}>
          {/* Header */}
          <div className="gallery-header">
            {/* <span className="gallery-label">Gallery</span> */}
            <h2 className="gallery-heading">Company Highlights</h2>
            <p className="gallery-sub">Gallery, Workforce & Achievements</p>
          </div>

          {/* Pills */}
          {/* <div className="pill-wrap">
            {categories.map((cat,i)=>(
              <button key={i} className={`pill${active===cat?" active":""}`} onClick={()=>setActive(cat)}>{cat}</button>
            ))}
            <button className="pill" style={{display:"flex",alignItems:"center",gap:"0.3rem"}}>
              View More <span style={{fontSize:"0.8rem"}}>→</span>
            </button>
          </div> */}

          {/* Carousel */}
          <div className="carousel-wrap">
            {visible.map((item) => (
              <div key={item.originalIndex} className="card-wrap" style={getCardStyle(item.offset)}>
                <div className="card" style={{width:"100%",height:"100%"}}>
                  <img src={item.src} alt={item.alt} />
                  <div className="card-overlay"/>
                  {/* {item.offset === 0 && <div className="g-shimmer" style={{position:"absolute",inset:0}}/>} */}
                  {item.type==="video" && (
                    <div className="play-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="dots">
            {galleryItems.map((_,i)=>(
              <button key={i} className={`dot${i===center?" active":""}`} style={{width:i===center?32:8}} onClick={()=>setCenter(i)}/>
            ))}
          </div>

          {/* Arrows */}
          <div className="arrows">
            <button className="arrow-btn" onClick={prev}>‹</button>
            <button className="arrow-btn" onClick={next}>›</button>
          </div>
        </div>
      </section>
    </>
  );
}