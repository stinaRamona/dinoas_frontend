//hook för att uppdatera innehåll 

const useUpdate = (endpoint: string) => {
    const updateItem = async (id: string, data: any) => {
        try {
            const response = await fetch(`${endpoint}/${id}`, {
                method: "PUT", 
                headers: {
                    "Content-Type": "multipart/form-data"
                }, 
                body: data
            }); 
            if(!response.ok) {
                throw new Error("Något gick fel vid uppdatering av innehåll med id" + id); 
            }
            console.log("Uppdaterat innehåll med id: " + id); 
        } catch(error) {
            console.log("gick inte att uppdatera: " + error); 
        }
    }; 

    return updateItem; 
}

export default useUpdate; 