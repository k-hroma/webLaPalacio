import { Layout } from "../layout/Layout"
import { AboutUs } from "../components/aboutUs/AboutUs"
import { FormConsulta } from "../components/formConsulta/FormConsulta"

const Contacto = () => { 
  return (
    <Layout>
      <AboutUs />
      <FormConsulta />
    </Layout>
  )
}

export { Contacto }