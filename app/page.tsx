import Hero from '@/components/sections/Hero'
import Intro from '@/components/sections/Intro'
import Space from '@/components/sections/Space'
import FeaturedMenu from '@/components/sections/FeaturedMenu'
import Story from '@/components/sections/Story'
import GuestWords from '@/components/sections/GuestWords'
import Visit from '@/components/sections/Visit'

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Space />
      <FeaturedMenu />
      <Story />
      <GuestWords />
      <Visit />
    </>
  )
}
