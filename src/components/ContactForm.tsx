import { useRef } from "react";
import emailjs from '@emailjs/browser';
import "../css/ContactForm.css"; 
import { useState } from "react";

const ContactForm = () => {
    const [info, setInfo] = useState<String>(""); 
    const form = useRef<HTMLFormElement | null>(null);

    const sendEmail = (e: any) => {
        e.preventDefault();  

        if (form.current) {
          emailjs
          .sendForm('service_nxc4i2r', 'template_ksm66fz', form.current, {
            publicKey: 'uuRFe2U3_JDwNDd22',
          })
          .then(
            () => {
              console.log('Mail skickat!');
              setInfo("Ditt meddelande har skickats! Du får snart en bekräftelse på angiven e-postadress");
            },
            (error) => {
              console.log('Något gick fel...', error.text);
              setInfo("Något gick fel, försök igen senare.");
            },
          );
        } else {
          console.error('Form reference is null.');
        }

        form.current?.reset(); //Återställer formuläret efter att det skickats
    };

  return (
    <>
    <div id="contactFormWrapper">
        <h1 id="contatHeadeing">Din nya <span id="oasGreen">oas</span> börjar med ett klick</h1>

        <form onSubmit={sendEmail} ref={form}>
            <h2>Kontakta oss</h2>
            <div className="formRow">
              <div className="inputWrapper">
                <input type="text" id="firstName" name="firstName" required placeholder=" "/>
                <label htmlFor="firstName">Förnamn</label>
                <div className="cover"></div>
              </div>

              <div className="inputWrapper">
                <input type="text" id="lastName" name="lastName" required placeholder=" "/>
                <label htmlFor="lastName">Efternamn</label>
                <div className="cover"></div>
              </div>

            </div>

            <div className="formRow">
              <div className="inputWrapper">
                <input type="email" id="email" name="email" required placeholder=" "/>
                <label htmlFor="email">E-post</label><br />
                <div className="cover"></div>
              </div>

              <div className="inputWrapper">
                <input type="tel" id="phone" name="phone" placeholder=" "/>
                <label htmlFor="phone">Telefon</label>
                <div className="cover"></div>
              </div>
            </div>

            <div className="inputWrapper">
              <textarea name="message" id="message" placeholder=" "></textarea>
              <label htmlFor="message">Meddelande</label>
              <div className="cover"></div>
            </div>

            <input type="submit" value="Let's connect!"/><br /><br />

            {/* Ifall något meddelande finns så visas det här */}
            {info && <em id="infoMsg">{info}</em>}  
        </form>
    </div>
    </>
  )
}

export default ContactForm
