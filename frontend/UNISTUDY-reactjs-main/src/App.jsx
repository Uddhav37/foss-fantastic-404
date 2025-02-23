
import './App.css'
import CaseStudies from './components/CaseStudies'
import Contact from './components/Contact'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Services from './components/Services'
import Team from './components/Team'
import Testimonials from './components/Testimonials'
import WorkingProcess from './components/WorkingProcess'

function App() {


  return (
    <div className='font-primary overflow-hidden'>
      <Navbar/>
      <Hero/>
      <Services/>
      <CTA/>
      <CaseStudies/>
      <WorkingProcess/>
      <Team/>
      <Testimonials/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default App
