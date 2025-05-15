//För mer info om nyhet, tjänst eller projekt
import { useState } from "react"; 
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import placeholder from "../assets/temp-placeholder.jpg";
import "../css/SinglePageStyle.css"; 
//hur ska jag göra för att den ska veta om det är en tjänst, en nyhet eller ett projekt??

function NewsSingle() {

  interface News {
    _id: string,
    news_title: string,
    author: string,
    news_content: string,
    news_picture: string,
  } 

  const {id} = useParams<{id:string}>(); 
  const [newsInfo, setNewsInfo] = useState<News>({_id: "", news_title: "", author: "", news_content: "", news_picture: ""});
  
  const getSingleNews = async () => {

    try {
      const response = await fetch("http://localhost:3000/news/" + id, {
        method: "GET"
      }); 

      if(!response.ok) {

        console.log("fel vid hämtning av nyhet"); 

      } else {

        const data = await response.json(); 
        setNewsInfo(data);

      }

    } catch(error) {
      console.log(error); 

    }
  }

  useEffect(() => {
    getSingleNews();
  }, [id])

  return (
    <>
      <main>
        <div id="singleArticleContainer">
          <div id="singleImgContainer">
            {
              newsInfo.news_picture ? (
                <img src={`http://localhost:3000${newsInfo.news_picture}`} alt="nyhetsbild"/>
              ) : (
                <img src={placeholder} alt="placeholder" />
              )
            }
          </div>

          <h1>{newsInfo.news_title}</h1>
          <em>Av: {newsInfo.author}</em>
          <article id="singleItemContent">{newsInfo.news_content}</article>
          </div>
      </main>
    </>
  )
}

export default NewsSingle
