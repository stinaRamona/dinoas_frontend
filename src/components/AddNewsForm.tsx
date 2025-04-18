import { useState } from "react"

const AddNewsForm = () => {
    
    interface News {
        news_title: string, 
        author: string, 
        news_content: string,
        news_picture: File | null,
    }
    
    const [newsData, setNewsData] = useState<News>({news_title:"", author: "", news_content:"", news_picture: null}); 
    const [info, setInfo] = useState<string []>([]);

    const addNews = async (e: any) => { 
        e.preventDefault(); 

        //tom array för felmeddelanden 
        const infos = []

        //felmeddelanden ifall det saknas information i fält
        if(!newsData.news_title) {
            infos.push("Du måste ange en titel");
        }

        if(!newsData.author) {
            infos.push("Du måste ange en författare"); 
        }

        if(!newsData.news_content) {
            infos.push("Du behöver skriva en text"); 
        }

        //felmeddelanden läggs till i info
        if(infos.length > 0) {
            setInfo(infos); 
        }

        
        console.log(newsData); 

        //göra om till FormData 
        const newsBody = new FormData(); 
        newsBody.append("news_title", newsData.news_title);
        newsBody.append("author", newsData.author);
        newsBody.append("news_content", newsData.news_content);
        newsBody.append("news_picture", e.target.files[0]); 
        
        //posta nyhet
        try {
            const response = await fetch("http://localhost:3000/news", {
                method: "POST", 
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                body: JSON.stringify(newsBody)
            });

            if(!response.ok) {
                infos.push("Kunde inte lägga till nyhet");  
            }

            const data = await response.json();
            console.log(data); 

        } catch(error) {
            info.push("Något gick fel vid skapandet av nyheten. Försök igen senare."); 
        }

    }


    return (
        <>
        <form onSubmit={addNews} encType="multipart/form-data">
            <label htmlFor="title">Nyhetstitel:</label><br />
            <input type="text" name="title" id="title" value={newsData.news_title} 
            onChange={(e) => setNewsData({...newsData, news_title: e.target.value})}
            /><br />

            <label htmlFor="author">Författare:</label><br />
            <input  type="text" name="author" id="author" value={newsData.author}
            onChange={(e) => setNewsData({...newsData, author: e.target.value})}
            /><br />

            <label htmlFor="content">Inlägg:</label><br />
            <input type="text" name="content" id="content" value={newsData.news_content} 
            onChange={(e) => setNewsData({...newsData, news_content: e.target.value})}
            /><br />

            <label htmlFor="image">Bild:</label><br />
            <input type="file" id="image" name="image" 
            onChange={(e) => setNewsData({...newsData, news_picture: e.target.files?.[0] || null})}
            />

            <input type="submit" value="Lägg till"/>
        </form>

        {info.length > 0 && info.map((i, index) => <p key={index}>{i}</p>)}
        </>
    )
}

export default AddNewsForm
