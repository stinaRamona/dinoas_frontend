import { useState } from "react";
import "../css/GeneralFormStyle.css"; 

const AddNewsForm = ({onNewsAdded} : {onNewsAdded: () => void}) => {
    
    interface News {
        news_title: string, 
        author: string, 
        news_content: string,
        file: File | null,
    }
      
    const [newsData, setNewsData] = useState<News>({news_title:"", author: "", news_content:"", file: null}); 
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
            return; 
        }

        console.log(newsData); 

        //göra om till FormData 
        const newsBody = new FormData(); 
        newsBody.append("news_title", newsData.news_title);
        newsBody.append("author", newsData.author);
        newsBody.append("news_content", newsData.news_content);
        if(newsData.file) {
            newsBody.append("file", newsData.file); 
        }
        
        //posta nyhet
        try {
            const response = await fetch("https://din-oas-api.onrender.com/news", {
                method: "POST", 
                body: newsBody,
            });

            if(!response.ok) {
                infos.push("Kunde inte lägga till nyhet");  
            }

            const data = await response.json();
            console.log(data);  


            //rensning av forulär vid tilläggning av nyhet
            setNewsData({news_title:"", author: "", news_content:"", file: null});
            setInfo(["Nyheten är tillagd!"]);
            setTimeout(() => setInfo([]), 1500);
            onNewsAdded();

        } catch(error) {
            setInfo(["Något gick fel vid skapandet av nyheten. Försök igen senare."]);
            console.log(error); 
            info.push("Något gick fel vid skapandet av nyheten. Försök igen senare."); 
        }

    }


    return (
        <>
        <h3>Lägg till en nyhet</h3>
        <div id="generalFormContainer">
            <form onSubmit={addNews} encType="multipart/form-data" id="generalForm">
                <label htmlFor="title">Nyhetstitel:</label><br />
                <input type="text" name="title" id="title" value={newsData.news_title} 
                onChange={(e) => setNewsData({...newsData, news_title: e.target.value})}
                /><br />

                <label htmlFor="author">Författare:</label><br />
                <input  type="text" name="author" id="author" value={newsData.author}
                onChange={(e) => setNewsData({...newsData, author: e.target.value})}
                /><br />

                <label htmlFor="content">Inlägg:</label><br />
                <textarea name="content" id="content" value={newsData.news_content} 
                onChange={(e) => setNewsData({...newsData, news_content: e.target.value})}
                ></textarea><br />

                <label htmlFor="image">Bild:</label><br />
                <input type="file" id="image" name="image" 
                onChange={(e) => setNewsData({...newsData, file: e.target.files?.[0] || null})}
                />

                <input type="submit" value="Lägg till"/>
            </form>
        </div>


        {info.length > 0 && info.map((i, index) => <p key={index}>{i}</p>)}
        </>
    )
}

export default AddNewsForm
