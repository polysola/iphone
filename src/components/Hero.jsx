import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { heroVideo, smallHeroVideo } from '../utils';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo)

  const handleVideoSrcSet = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo)
    } else {
      setVideoSrc(heroVideo)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleVideoSrcSet);

    return () => {
      window.removeEventListener('resize', handleVideoSrcSet) // Fixed typo
    }
  }, [])

  useGSAP(() => {
    // Use shorter delays on mobile
    const delay = window.innerWidth < 760 ? 1 : 2;

    gsap.set('#hero', { opacity: 0 });
    gsap.set('#cta', { opacity: 0, y: 20 });

    const tl = gsap.timeline();

    tl.to('#hero', {
      opacity: 1,
      delay,
      duration: 1,
      ease: 'power2.out'
    })
      .to('#cta', {
        opacity: 1,
        y: -50,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.5'); // Slightly overlap animations
  }, [])

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title opacity-0">iPhone 15 Pro on TON</p>
        <img className='w-24 mb-12 sm:mb-0' src="/ton.jpg" alt="Ton Logo" />
        <div className="md:w-10/12 w-9/12">
          <video
            className="pointer-events-none"
            autoPlay
            muted
            playsInline={true}
            key={videoSrc}
            preload="auto"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      <div
        id="cta"
        className="flex flex-col items-center opacity-0"
      >
        <a href="https://groypfi.io/terminal" className="btn">Buy</a>
        <a style={{ marginTop: '0rem', marginBottom: '1rem' }} className="mt-0 btn" href="https://t.me/iTonOfficial_Portal" >Telegram</a>
        <p className="font-normal text-xl">From Groypfi</p>
      </div>
    </section>
  )
}

export default Hero