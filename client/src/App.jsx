import Footer from './components/common/footer/Footer'
import Header from './components/common/header/Header'
import Home from './components/home/Home'

export default function App() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="main-content">
                    <Home />
                </main>
                <Footer />
            </div>
        </>
    )
}