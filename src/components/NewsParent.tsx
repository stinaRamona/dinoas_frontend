//Föräldrakomponent som innehåller barn-komponenter för hantering av nyheter för adminsidan
//Se separata barn-komponenter för kod gällande hantering av nyheter och formulär för att skapa nyheter
import { useState } from "react";
import AddNewsForm from "./AddNewsForm";
import HandleNews from "./HandleNews";

const NewsParent = () => {
    const [refreshKey, setRefreshKey] = useState(0); 

    const refreshItemList = () => {
        setRefreshKey((prevKey) => prevKey + 1); 
    }

    return (
        <div>
            <AddNewsForm onNewsAdded={refreshItemList} />
            <HandleNews refreshKey = {refreshKey} refreshItemList = {refreshItemList}/>
        </div>
    );
}

export default NewsParent;