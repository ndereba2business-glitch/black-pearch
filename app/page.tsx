import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import FeaturedMenu from '@/components/sections/FeaturedMenu'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import Experience from '@/components/sections/Experience'


export default function Home() {
  return (
    <main style={{ background: '#080808' }}>
      <Hero />
      <Marquee />
      <FeaturedMenu />
      <Experience />
      <About />
      <Contact />
    </main>
  )
}
