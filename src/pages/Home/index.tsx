import HomeLayout from '../../components/Layout/HomeLayout'
import InforBar from '../../components/Layout/InfoBar'
import { MainContainer } from '../../styles/globalStyles'

const Home = () => {
  return (
    <>
      <MainContainer>
        <HomeLayout />
        <InforBar />
      </MainContainer>
    </>
  )
}

export default Home
