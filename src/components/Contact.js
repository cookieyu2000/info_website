import { useLanguage } from '../context/LanguageContext';

function Contact() {
  const { content } = useLanguage();
  const { contact } = content;
  const contactEmail = 'pyyu2000891109@gmail.com';
  const contactItems = [
    {
      label: contact.labels.email,
      value: contactEmail,
      href: `mailto:${contactEmail}`,
    },
    {
      label: contact.labels.github,
      value: 'cookieyu2000',
      href: 'https://github.com/cookieyu2000',
    },
    {
      label: contact.labels.linkedin,
      value: 'pingyen-yu-a5870226b',
      href: 'https://www.linkedin.com/in/pingyen-yu-a5870226b',
    },
    {
      label: contact.labels.phone,
      value: '0968383664',
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name')?.toString().trim() ?? '';
    const email = formData.get('email')?.toString().trim() ?? '';
    const message = formData.get('message')?.toString().trim() ?? '';
    const separator = contact.form.separator;
    const body = [
      `${contact.form.labels.name}${separator}${name || contact.form.empty}`,
      `${contact.form.labels.email}${separator}${email || contact.form.empty}`,
      `${contact.form.labels.message}${separator}${message || contact.form.empty}`,
    ].join('\n');
    const subject = `${contact.form.subject} - ${name || contact.form.visitor}`;
    const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
    event.currentTarget.reset();
  };

  return (
    <section className="section py-5 py-lg-6 fade-up delay-4" id="contact">
      <div className="container">
        <div className="row align-items-end g-4 section-header">
          <div className="col-lg-7">
            <p className="section-eyebrow">{contact.eyebrow}</p>
            <h2>{contact.title}</h2>
          </div>
          <div className="col-lg-5">
            <p className="section-description">{contact.description}</p>
          </div>
        </div>
        <div className="row g-4 mt-1 align-items-stretch">
          <div className="col-lg-5">
            <div className="card contact-card h-100 border-0">
              <div className="card-body d-flex flex-column">
                <h3>{contact.quickTitle}</h3>
                <p className="text-muted">{contact.quickDescription}</p>
                <div className="contact-lines mt-auto">
                  {contactItems.map((item) => (
                    <div className="contact-line" key={item.label}>
                      <span className="contact-label">{item.label}</span>
                      {item.href ? (
                        <a className="contact-value" href={item.href}>
                          {item.value}
                        </a>
                      ) : (
                        <span className="contact-value">{item.value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <form className="card contact-form h-100 border-0" onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">{contact.form.labels.name}</label>
                    <input
                      className="form-control"
                      name="name"
                      type="text"
                      placeholder={contact.form.placeholders.name}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">{contact.form.labels.email}</label>
                    <input
                      className="form-control"
                      name="email"
                      type="email"
                      placeholder={contact.form.placeholders.email}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">{contact.form.labels.message}</label>
                    <textarea
                      className="form-control"
                      name="message"
                      rows="5"
                      placeholder={contact.form.placeholders.message}
                    ></textarea>
                  </div>
                  <div className="col-12 d-flex flex-wrap align-items-center gap-3">
                    <button className="btn btn-primary" type="submit">
                      {contact.form.submit}
                    </button>
                    <p className="form-note mb-0">{contact.form.note}</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
