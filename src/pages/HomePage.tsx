import BannerContact from "../components/BannerContact"
import GetNews from "../components/GetNews"; 
import homePic from "../assets/plant_and_face.jpg"; 
import "../css/HomePage.css"; 
import { useEffect } from "react";

function HomePage() {

  useEffect(() => {
    const img = new window.Image(); 
    img.src = homePic; 
  }, [])

  return (
    <div>
      <main>
          <div id="home-infoContainer">
            <div id="textContainer">
              <h1>Nej, det är ingen hägring</h1>
                <p>
                  Brödtext. Lorem ipsum dolor sit amet, 
                  consectetur adipisicing elit. Consequatur alias 
                  architecto quaerat officia beatae ducimus velit doloribus 
                  fugit error! Itaque sapiente non illum consequatur nostrum 
                  commodi consequuntur vel, iste corrupti.
                </p>
            </div>
          <div id="imgContainer">
            <img src={homePic} alt="En bild på en upphållen planta med en person i bakgrunden"/>
          </div>
          </div>

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
