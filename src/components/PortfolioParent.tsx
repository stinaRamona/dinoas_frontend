import { useState } from "react";
import AddPortfolioForm from "./AddPortfolioForm";
import HandlePortfolio from "./HandlePortfolio";


const PortfolioParent = () => {
    const [refreshKey, setRefreshKey] = useState(0); 

    const refreshItemList = () => {
        setRefreshKey((prevKey) => prevKey + 1); 
    }


    return (
        <>
        <AddPortfolioForm onProjectAdded={refreshItemList}/>
        <HandlePortfolio refreshKey={refreshKey} refreshItemList={refreshItemList}/>
        </>
    )
}

export default PortfolioParent
