import { useState } from "react";
import { useEffect } from "react";
import "../css/TheeGridLayot.css";
import placeholder from "../assets/temp-placeholder.jpg";
import { useNavigate } from "react-router-dom";

const GetNews = () => {

    const navigate = useNavigate(); 

    interface News {
        _id: string,
        news_title: string,
        author: string,
        news_content: string,
        news_picture: string,
    }

    const [newsData, setNewsData] = useState<News[]>([{_id: "", news_title:"", author:"", news_content:"", news_picture: ""}]); 
    const [info, setInfo] = useState<string[]>([]); 

    const getNews = async () => {
        try {
            const response = await fetch("http://localhost:3000/news", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                setInfo(["Kunde inte hämta nyheter! Försök igen senare"]); 
            } else {
                const data = await response.json(); 
                setNewsData(data.reverse()); 
            }

        } catch(error) {
            setInfo(["Kunde inte hämta nyheter! Försök igen senare"]); 
            console.log(error); 
        }
    }

    const goToSingle = (id:string) => {
        navigate("/news/" + id); 
    }

    useEffect(() => {
        getNews(); 
    }, []); 
    return (
        <>
        <div id="gridContainer" title="Läs mer">
            {
            //visar tre nyheter på startsidan och alla nyheter på nyhetssidan
            newsData.slice(0, window.location.pathname === "/" ? 3 : newsData.length).map((news, index) => (
                <article key={index} className="gridItem" onClick={() => goToSingle(news._id)}>
                {news.news_picture ? (
                    <img src={`http://localhost:3000${news.news_picture}`} alt="nyhetsbild" />
                ) : (
                    <img src={placeholder} alt="placeholder image"/>
                )}
                <h2>{news.news_title}</h2>
                <em>Av {news.author}</em>
                <p>{news.news_content.length > 100 ? news.news_content.substring(0, 100) + "..." : news.news_content}</p>
                </article>
            ))
            }
            
            {info.length > 0 && info.map((i, index) => <p key={index}>{i}</p>)}
        </div>
        </>
    )
}

export default GetNews; 