import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import FeaturedMenu from '@/components/sections/FeaturedMenu'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main style={{ background: '#080808' }}>
      <Hero />
      <Marquee />
      <FeaturedMenu />
      <About />
      <Contact />
    </main>
  )
}
