import { useRef } from "react";
import emailjs from '@emailjs/browser';
import "../css/ContactForm.css"; 

const ContactForm = () => {
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
            },
            (error) => {
              console.log('Något gick fel...', error.text);
            },
          );
        } else {
          console.error('Form reference is null.');
        }
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

            <input type="submit" value="Let's connect!"/>
        </form>
    </div>
    </>
  )
}

export default ContactForm
