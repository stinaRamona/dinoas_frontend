//För att hantera nyheter (uppdatera och radera)
//behöver hämta in nyheterna igen från databasen. Återanvända prop på något sätt? 
//Behöver det för att kunna trycka och få ut id för att kunna radera eller uppdatera. 
//Kankse borde gjort på annat sätt för att spara på data. Men det här går också bra. Behöver ett formulär för att uppdatera 
//Behöver knapp för att radera.
//Annan fråga är navigering. Hur ska man kunna toggla mellan nyheter, tjänster m.m.
import fetchData from "../hooks/fetchData";
import useDelete from "../hooks/useDelete";
import useUpdate from "../hooks/useUpdate"; 

const HandleNews = () => {
    interface News {
        _id: string,
        news_title: string, 
        author: string, 
        news_content: string,
        news_picture: string, //hur blir det med denna? Behöver jag två för att kunna uppdater (file skickas då)
    }

    const {data: news, loading} = fetchData("http://localhost:3000/news");
    const deleteNews = useDelete("http://localhost:3000/news");
    const updateNews = useUpdate("http://localhost:3000/news");

    if (loading) {
        return <p>Laddar in nyheter...</p> //ändra till en spinner
    }

    const handleDelete = async (id: string) => {
        await deleteNews(id); 
    }; 

    const handleUpdate = async (id: string) => {
        const updatedData = new FormData(); 
        await updateNews(id, updatedData); 
    }; 

    return (
        <>
        {/*Här skrivs nyheter ut för uppdatering och för radering. Hantering.*/}
        <div>
            <h3>Hantera postade nyheter</h3>
            {news.map((item: News)=> (
                <article key={item._id}>
                    <h4>{item.news_title}</h4>
                    <p>{item.author}</p>
                    <p>{item.news_content}</p>
                    {item.news_picture && (
                        <img src={`http://localhost:3000${item.news_picture}`} alt="nyhetsbild" />
                    )}
                    <button onClick={() => handleDelete(item._id)}>Ta bort</button>
                    <button onClick={() => handleUpdate(item._id)}>Uppdatera</button> 
                </article>
            ))}
        </div>
        </>
    )
}

export default HandleNews;