import BannerContact from "../components/BannerContact"
import GetNews from "../components/GetNews"; 

function HomePage() {
  return (
    <div>
      <main>
          <h1>Startsidan</h1>

          <h2>H2 rubrik</h2>
          <p>Brödtext Lorem ipsum dolor sit amet, 
          consectetur adipisicing elit. Consequatur alias 
          architecto quaerat officia beatae ducimus velit doloribus 
          fugit error! Itaque sapiente non illum consequatur nostrum 
          commodi consequuntur vel, iste corrupti.
          </p>
      </main>


        <BannerContact />

        <main>
          <h2>Nyheter från oss</h2>
          {/* GetNews men ska bara läsa in tre nyheter */}
          <div>
            <GetNews/>
          </div>
          
        </main>
    </div>
  )
}

export default HomePage
