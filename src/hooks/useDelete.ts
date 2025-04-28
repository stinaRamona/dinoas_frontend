//hook för att ta bort data 

const useDelete = (endpoint: string) => {
    const deleteItem = async (id: string) => {
        try {
            const response = await fetch(`${endpoint}/${id}`, {
                method: "DELETE", 
            }); 

            if(!response.ok) {
                throw new Error("Något gick fel vid radering"); 
            }
            console.log("Raderat innehåll med id" + id); 

        } catch(error) {
            console.log("gick inte att radera: " + error); 
        }
    }; 

    return deleteItem; 
}; 

export default useDelete; 