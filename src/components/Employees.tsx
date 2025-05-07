//Komponent för bild och roll för anställda 
import emp1 from "../assets/person1.jpg"; 
import emp2 from "../assets/person2.jpg";
import emp3 from "../assets/person3.jpg";
import "../css/TheeGridLayot.css"; 


const Employees = () => {
  return (
    <>
      <h2>Vårat gäng</h2>
      <div id="gridContainer">
        <article className="employeeCard">
            <img src={emp1} alt="Antälld" className="empImg"/>
            <p>Namn Namnsson</p>
            <em>Projektledare</em>
        </article>

        <article className="employeeCard">
            <img src={emp2} alt="Anställd" className="empImg"/>
            <p>Namn Namnsson</p>
            <em>Trädgårdsmästare</em>
        </article>

        <article className="employeeCard">
            <img src={emp3} alt="Anställd" className="empImg"/>
            <p>Namn Namnsson</p>
            <em>Trädgårdsmästare</em>
        </article>
      </div>

      <style>{`
        h2 {
            text-align: center;
        }
        
        .empImg {
            width: 100%; 
            max-width: 200px; 
            height: auto; 
            border-radius: 50%;
        }
        
        .employeeCard {
            margin: 0 auto; 
            text-align: center;
            padding-bottom: 2em; 
        }

        .employeeCard p {
            font-size: 1.2em;
        }

      `}</style>
    </>
  )
}

export default Employees
