//För att hantera nyheter (uppdatera och radera)
//behöver hämta in nyheterna igen från databasen. Återanvända prop på något sätt? 
//Behöver det för att kunna trycka och få ut id för att kunna radera eller uppdatera. 
//Kankse borde gjort på annat sätt för att spara på data. Men det här går också bra. Behöver ett formulär för att uppdatera 
//Behöver knapp för att radera.
//Annan fråga är navigering. Hur ska man kunna toggla mellan nyheter, tjänster m.m.

const HandleNews = () => {

    interface News {
        news_title: string, 
        author: string, 
        news_content: string, 
        //hur blir det med denna? Behöver jag två för att kunna uppdater (file skickas då)
    }

    return (
        <>

        </>
    )
}

export default HandleNews;