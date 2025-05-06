import { useState } from "react";
import AddServiceForm from "./AddServiceForm";
import HandleServices from "./HandleServices";


const ServiceParent = () => {
    const [refreshKey, setRefreshKey] = useState(0); 

    const refreshItemList = () => {
        setRefreshKey((prevKey) => prevKey + 1); 
    }

    return (
        <>
        <AddServiceForm onServiceAdded={refreshItemList}/>
        <HandleServices refreshKey={refreshKey} refreshItemList = {refreshItemList}/>
        </>
    )
}

export default ServiceParent
