import ProfileCard from './components/ProfileCard';

function App() {

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h1>My Team Portfolio</h1>
      
      {}
      <ProfileCard
        name="Kongpop Boonma"
        role="Student @ CEDT"
        bio="Hi I play monster hunter and a bunch of random stuff"
      />
      
      {}
      <ProfileCard
        name="Reze"
        role="Software Engineer"
        bio="I like to build web application"
      />
    </div>
  );
}

export default App;
