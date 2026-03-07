import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from '../pages/Home/Home'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop/ScrollToTop'
import './App.css'

// Lazy load Gallery page for faster initial load
const Gallery = lazy(() => import('../pages/Gallery/Gallery').then(m => ({ default: m.Gallery })))

// Lazy load case study pages
const TrainTrekCaseStudy = lazy(() => import('../pages/CaseStudy/TrainTrek').then(m => ({ default: m.TrainTrekCaseStudy })))
const TikTokCaseStudy = lazy(() => import('../pages/CaseStudy/tiktok').then(m => ({ default: m.TikTokCaseStudy })))
const InstagramCaseStudy = lazy(() => import('../pages/CaseStudy/instagram').then(m => ({ default: m.InstagramCaseStudy })))
const WordletCaseStudy = lazy(() => import('../pages/CaseStudy/wordlet').then(m => ({ default: m.WordletCaseStudy })))
const EACaseStudy = lazy(() => import('../pages/CaseStudy/ea').then(m => ({ default: m.EACaseStudy })))



function App() {
    useEffect(() => {
        // Prefetch Gallery component on app load
        // This starts downloading the Gallery chunk in the background
        import('../pages/Gallery/Gallery');
    }, []);

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/play"
                    element={
                        <Suspense fallback={null}>
                            <Gallery />
                        </Suspense>
                    }
                />
                <Route
                    path="/traintrek"
                    element={
                        <Suspense fallback={null}>
                            <TrainTrekCaseStudy />
                        </Suspense>
                    }
                />
                <Route
                    path="/tiktok"
                    element={
                        <Suspense fallback={null}>
                            <TikTokCaseStudy />
                        </Suspense>
                    }
                />
                <Route
                    path="/instagram-events"
                    element={
                        <Suspense fallback={null}>
                            <InstagramCaseStudy />
                        </Suspense>
                    }
                />
                <Route
                    path="/wordlet"
                    element={
                        <Suspense fallback={null}>
                            <WordletCaseStudy />
                        </Suspense>
                    }
                />
                <Route
                    path="/ea"
                    element={
                        <Suspense fallback={null}>
                            <EACaseStudy />
                        </Suspense>
                    }
                />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default App
