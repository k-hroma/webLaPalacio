import bannergender from '../../assets/img/banner.png'
import bannergendersmall from '../../assets/img/bannerSmall.png'
import './banner.css'

const BannerGender = () => {
  return (
    <section className="banner-container">
      <img className='banner-gender-big' src={bannergender} alt="banner-gender" />
      <img className='banner-gender-small' src={bannergendersmall} alt="banner-gender-small" />
    </section>
  )
 }

export { BannerGender }