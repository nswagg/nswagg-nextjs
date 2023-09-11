/* 'use client'

export default function Contact() {
  
  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      const response = await fetch('/api/contact', {
        method: 'post',
        body: new URLSearchParams(data),
      });
      if (!response.ok) {
        throw new Error(`Invalid response: ${response.status}`);
      }
      alert('Thanks for contacting us, we will get back to you soon!');
    } catch (err) {
      console.error(err);
      alert("We can't submit the form, try again later?");
    }
  }


  return (
    <form className="container" onSubmit={handleSubmit}>
      <h1>Send an Email</h1>
      <div className="email block" >
        <label htmlFor="frm-email">Email</label>
        <input 
          id="frm-email"
          type="email"
          name="email"
          autoComplete="email"
          required
        />
      </div>
      <div className="name block">
        <div>
          <label htmlFor="frm-first">First Name</label>
          <input 
            id="frm-first"
            type="text"
            name="first"
            autoComplete="given-name"
            required
          />
        </div>
        <div>
          <label htmlFor="frm-last">Last Name</label>
          <input 
            id="frm-last"
            type="text"
            name="last"
            autoComplete="family-name"
            required
          />
        </div>
        <div className="message block">
          <label htmlFor="frm-message">Message</label>
          <textarea id="frm-message" rows="6" name="message"/>
        </div>
        <div className="button block">
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  )
} */