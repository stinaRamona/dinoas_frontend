//För att hantera nyheter (uppdatera och radera) 
//Behöver ett formulär för att uppdatera 
import { useState } from "react";
import fetchData from "../hooks/fetchData";
import useDelete from "../hooks/useDelete";
import useUpdate from "../hooks/useUpdate"; 
import "../css/HandleItemStyle.css"; 
import "../css/GeneralFormStyle.css"; 

const HandleNews = ({refreshKey, refreshItemList} : {refreshKey : number; refreshItemList : () => void}) => {

    interface News {
        _id: string,
        news_title: string, 
        author: string, 
        news_content: string,
        news_picture: string, //hur blir det med denna? Behöver jag två för att kunna uppdater (file skickas då)
    }

    const {data: news, loading} = fetchData(`http://localhost:3000/news?refreshKey=${refreshKey}`);
    const deleteNews = useDelete("http://localhost:3000/news");
    const updateNews = useUpdate("http://localhost:3000/news");
    
    const [selectedNews, setSelectedNews] = useState<News | null>(null); 
    const [formValues, setFormValues] = useState({upd_title: "", upd_author: "", upd_content: "", upd_image: null}); 


    const handleDelete = async (id: string) => {
        await deleteNews(id); 
        refreshItemList(); 
    }; 

    const handleUpdateBtnClick = (news: News) => {
        setSelectedNews(news); 
        setFormValues({
            upd_title: news.news_title, 
            upd_author: news.author, 
            upd_content: news.news_content, 
            upd_image: null,
        });

        window.scrollTo({ left: 0, top: document.body.scrollHeight + 200, behavior: "smooth" });
        
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: name === "upd_image" && e.target instanceof HTMLInputElement
                ? (e.target.files ? e.target.files[0] : null)
                : value,
        }));
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 

        if(!selectedNews) return; 

        const updatedData = new FormData(); 
        updatedData.append("news_title", formValues.upd_title); 
        updatedData.append("author", formValues.upd_author); 
        updatedData.append("news_content", formValues.upd_content); 
        if(formValues.upd_image) {
            updatedData.append("file", formValues.upd_image); 
        }; 

        await updateNews(selectedNews._id, updatedData);

        setSelectedNews(null);
        refreshItemList();
        
    };  

    if (loading) {
        return <p>Laddar in nyheter...</p> //ändra till en spinner
    }

    return (
        <>
        {/*Här skrivs nyheter ut för uppdatering och för radering. Hantering.*/}
        <div id="handleItemContainer">
            <h3>Hantera postade nyheter</h3>
            {news.map((item: News)=> (
                <article key={item._id}>
                    <h4>{item.news_title}</h4>
                    <p>{item.author}</p>
                    <p>{item.news_content}</p>
                    {item.news_picture && (
                        <img src={`http://localhost:3000${item.news_picture}`} alt="nyhetsbild" />
                    )}
                    <button id="deleteBtn" onClick={() => handleDelete(item._id)}>Ta bort</button>
                    <button id="updateBtn"onClick={() => {handleUpdateBtnClick(item);}} >Uppdatera</button>
                </article>
            ))} 
        </div>

        <div id="updateForm">
            {/*Formulär för att uppdatera nyhet. Ska synas ifall man klickar på knappen Uppdatera.*/}
            {selectedNews && (
                <form id="generalForm" onSubmit={handleFormSubmit}>
                    <h3>Uppdatera nyhet</h3>
                    <label htmlFor="upd_title">Uppdatera nyhetstitel:</label><br />
                    <input type="text" id="upd_title" name="upd_title" value={formValues.upd_title}
                    onChange={handleFormChange}/><br />

            
                    <label htmlFor="upd_author">Uppdatera författare:</label><br />
                    <input type="text" id="upd_author" name="upd_author" value={formValues.upd_author}
                    onChange={handleFormChange}/><br />
            
                    <label htmlFor="upd_content">Uppdatera inlägg:</label><br />
                    <textarea id="upd_content" name="upd_content" value={formValues.upd_content}
                    onChange={handleFormChange}></textarea><br />
            
                    <label htmlFor="upd_image">Uppdatera bild:</label><br />
                    <input type="file" id="image" name="upd_image" 
                    onChange={handleFormChange}/><br />

                    <button id="saveBtn" type="submit">Spara ändringar</button>
                    <button id="cancelBtn" onClick={() => setSelectedNews(null)}>Avbryt</button>
                </form>
            )}
        </div>

        </>
    )
}

export default HandleNews;