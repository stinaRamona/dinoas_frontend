//Hook för att hämta data från olika endpoint i webbtjänsten 

import { useState, useEffect } from "react";

const fetchData = (endpoint: string) => {
    const [data, setdata] = useState<any[]>([]); 
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const response = await fetch(endpoint); 
                const result = await response.json(); 
                setdata(result); 
            } catch(error) {
                console.log(error); 
            } finally {
                setLoading(false);
            }
        }; 

        getData(); 
    }, [endpoint]); 

    return { data, loading}; 
}

export default fetchData;