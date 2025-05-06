import { useState } from "react"
import { useEffect } from "react";

const GetNews = () => {

    interface News {
        news_title: string,
        author: string,
        news_content: string,
        news_picture: string,
    }

    const [newsData, setNewsData] = useState<News[]>([{news_title:"", author:"", news_content:"", news_picture: ""}]); 
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
                setNewsData(data); 
            }

        } catch(error) {
            setInfo(["Kunde inte hämta nyheter! Försök igen senare"]); 
            console.log(error); 
        }
    }

    useEffect(() => {
        getNews(); 
    }, []); 
    return (
        <>
        <div id="newsContainer">
            {
                newsData.map((news, index) => (
                    <article key={index} className="newsItem">
                        <h2>{news.news_title}</h2>
                        <p>{news.author}</p>
                        <p>{news.news_content}</p>
                        {news.news_picture && (
                            <img src={`http://localhost:3000${news.news_picture}`} alt="nyhetsbild" />
                        )}
                    </article>
                ))
            }
            
            {info.length > 0 && info.map((i, index) => <p key={index}>{i}</p>)}
        </div>
        </>
    )
}

export default GetNews; 