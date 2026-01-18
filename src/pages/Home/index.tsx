import HomeLayout from '../../components/Layout/HomeLayout'
import InforBar from '../../components/Layout/InfoBar'
import { ContentWrapper } from '../../styles/globalStyles'

const Home = () => {
  return (
    <>
      <ContentWrapper>
        <HomeLayout />
        <InforBar variant="default" />
      </ContentWrapper>
    </>
  )
}

export default Home
