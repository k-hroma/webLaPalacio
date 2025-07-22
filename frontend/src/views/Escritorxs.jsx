import { AllWriters } from "../components/writers/AllWriters"
import { Layout } from "../layout/Layout"
import { BannerGender } from "../components/banners/BannerGender"
const Escritorxs = () => { 
  return (
    <Layout>
      <AllWriters/>
      <BannerGender/>
    </Layout>
  )
}

export { Escritorxs }