import GradientLayout from '../components/gradientLayout'

const Home = () => {
  return (
    <GradientLayout
      color="pink"
      subtitle="Profile"
      title="Rebeca Diaconu"
      description="15 public playlists"
      image="https://frontendmasters.github.io/fullstack-app-next-website/images/profile.png"
      roundImage
    >
      <div>Homepage</div>
    </GradientLayout>
  )
}

export default Home
