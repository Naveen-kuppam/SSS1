import "../Style/Contact.css";
import Navbar from "../components/Navbar";
import aboutImg from "../assets/watch-5.jpg";
import ContactSection from "../components/ContactSection";
import FooterSection from "../components/FooterSection";

function Contact() {
  return (
   <div>   
        <div><Navbar/></div>
      <div
        className="about-home"
        style={{ backgroundImage: `url(${aboutImg})` }}
      >
        <p className="about-subtitle">GET IN TOUCH</p>
        <h1 className="about-heading">
          Contact <span>SSS</span>
        </h1>
        <p className=" text-light ">We'd love to hear from you. Reach out to us for any inquiries about our luxury timepieces.</p>
      </div>
            <div>
                <div className="container py-5">
  <div className="row g-4">


    <div className="col-lg-3">
      <div className="contact-card">
        <div className="icon-circle">
          <i className="fa-solid fa-location-dot"></i>
        </div>
        <h4>Visit Us</h4>
        <p>
          Nizampet
          Bachupally
           in Hyderabad.
        </p>
      </div>
    </div>

   
    <div className="col-lg-3">
      <div className="contact-card">
        <div className="icon-circle">
          <i className="fa-solid fa-phone"></i>
        </div>
        <h4>Call Us</h4>
        <p>
          +1 (555) 123-4567 
        </p>
      </div>
    </div>

    <div className="col-lg-3">
      <div className="contact-card">
        <div className="icon-circle">
          <i className="fa-solid fa-envelope"></i>
        </div>
        <h4>Email Us</h4>
        <p>
          hello@sss-watches.com 
        </p>
      </div>
    </div>

  
    <div className="col-lg-3">
      <div className="contact-card">
        <div className="icon-circle">
          <i className="fa-solid fa-clock"></i>
        </div>
        <h4>Working Hours</h4>
        <p>
          Sun - Sat : 9:30 AM - 10 PM <br />
      
        </p>
      </div>
    </div>

  </div>
</div>
            </div>
             <div>
              <ContactSection/>
              <FooterSection/>
             </div>
              </div>
   
  );
}

export default Contact;
