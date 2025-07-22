import { Layout } from "../layout/Layout"
import { HomeLatestBooks } from "../components/books/LatestBooks"
import { Header } from '../components/header/Header'
import { HomeWriters } from "../components/writers/HomeWriters"
import { BannerGender } from '../components/banners/BannerGender'
import { AboutUs } from "../components/aboutUs/AboutUs"
const Home = () => { 
  return (
    <Layout>
      <Header/>
      <HomeLatestBooks />
      <HomeWriters />
      <BannerGender />
      <AboutUs/>
    </Layout>
  )
}

export { Home }