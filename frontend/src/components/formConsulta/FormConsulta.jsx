import { useState } from "react"
import "./formConsulta.css"

const FormConsulta = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    instagram: "",
    whatsapp: "",
    consulta: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);

    // Acá hacer:
    // fetch("/api/contact", { method: "POST", body: JSON.stringify(formData) })

    // Reset
    setFormData({ name: "",
    email: "",
    instagram: "",
    whatsapp: "",
    consulta: "" });
  };


  return (
    <section className="form-consulta">
      <div className="txt-container-form">
        <div className="large-txt-wrapper">
        <p className="large-txt">Dejános</p>
        <p className="large-txt">tu consulta</p>
        </div>
        <p className="small-txt">y te responderemos a la brevedad</p>
        <p className="small-txt">por e-mail, whats app o instagram </p>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="name-email">
            <div>
            <input placeholder="nombre" type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <input placeholder="email" type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          </div>
          <div className="insta-whsapp">
          <div>
            <input placeholder="instagram" type="text" id="instagram" name="instagram" value={formData.instagram} onChange={handleChange} />
          </div>
          <div>
            <input placeholder="whatsapp" type="text" id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleChange}  />
          </div>
          </div>
          <div>
            <label htmlFor="consulta">Mensaje</label>
            <textarea
            id="consulta"
            name="consulta"
            value={formData.consulta}
            onChange={handleChange}
            required
            />
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </section>
  )
}

export { FormConsulta }