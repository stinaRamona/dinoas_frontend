import { useRef } from "react";
import emailjs from '@emailjs/browser';


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
        <h1>Din nya <span id="oasGreen">oas</span> börjar med ett klick</h1>

        <form onSubmit={sendEmail} ref={form}>
            <label htmlFor="firstName">Förnamn:</label><br />
            <input type="text" id="firstName" name="firstName" required /><br />

            <label htmlFor="lastName">Efternamn:</label><br />
            <input type="text" id="lastName" name="lastName" required/><br />

            <label htmlFor="email">Epost:</label><br />
            <input type="email" id="email" name="email" required/><br />

            <label htmlFor="phone">Telefon:</label><br />
            <input type="tel" id="phone" name="phone" /><br />

            <label htmlFor="message">Meddelande:</label><br />
            <textarea name="message" id="message"></textarea><br />

            <input type="submit" value="Let's connect!"/>
        </form>
    </div>
    </>
  )
}

export default ContactForm
