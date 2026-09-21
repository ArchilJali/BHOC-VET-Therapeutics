import {esc,icon} from '../lib/html.mjs';

export default page=>`<main id="main" class="subpage-main contact-page">
  <section class="page-hero contact-page-hero" aria-labelledby="contact-page-heading"><div><span class="page-eyebrow">${esc(page.eyebrow)}</span><h1 id="contact-page-heading">${esc(page.heading)}</h1><p>${esc(page.lead)}</p></div></section>
  <section class="contact-layout" aria-label="Contact options">
    <div class="contact-form-panel"><span class="option-number">01</span><h2>${esc(page.form.title)}</h2>
      <form class="contact-form" data-contact-email="${esc(page.email)}" data-form-endpoint="https://formsubmit.co/ajax/a3b0556adb6a7d4f4906626acf84aac1" action="contact.html" method="POST" accept-charset="UTF-8">
        <input type="hidden" name="_subject" value="New BHOC Veterinary website enquiry">
        <input type="hidden" name="_template" value="table">
        <input type="hidden" name="_url" value="https://bhocvet.com/contact.html">
        <input class="contact-honeypot" type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true">
        <div class="field-row"><label for="contact-name">Name <span aria-hidden="true">*</span></label><input id="contact-name" name="name" autocomplete="name" required></div>
        <div class="field-row"><label for="contact-email">Email <span aria-hidden="true">*</span></label><input id="contact-email" name="email" type="email" autocomplete="email" required></div>
        <div class="field-row"><label for="contact-organisation">Organisation</label><input id="contact-organisation" name="organisation" autocomplete="organization"></div>
        <div class="field-row"><label for="contact-area">Area of interest</label><select id="contact-area" name="area">${page.form.areas.map(area=>`<option>${esc(area)}</option>`).join('')}</select></div>
        <div class="field-row contact-message-row"><label for="contact-message">Message <span aria-hidden="true">*</span></label><textarea id="contact-message" name="message" rows="5" required></textarea></div>
        <label class="contact-human-check" for="contact-human"><input id="contact-human" name="human_check" type="checkbox" value="confirmed" required><span>I am not a robot</span></label>
        <div class="contact-submit-row"><button class="button" type="submit"><span>${esc(page.form.button)}</span>${icon('arrow')}</button><p class="form-status" aria-live="polite"></p></div>
        <p class="form-note">${esc(page.form.note)}</p>
      </form>
      <div class="contact-success" hidden aria-live="polite">
        <span class="option-number">Sent</span>
        <h2>Thank you.</h2>
        <p>Your message has been sent to BHOC Veterinary.</p>
        <a class="button" href="index.html"><span>Return to BHOC Veterinary</span>${icon('arrow')}</a>
      </div>
    </div>
    <aside class="direct-contact"><span class="option-number">02</span><span class="direct-icon">${icon('mail')}</span><h2>${esc(page.direct.title)}</h2><p>${esc(page.direct.text)}</p><a class="button button-outline" href="mailto:${esc(page.email)}"><span>${esc(page.direct.button)}</span>${icon('arrow')}</a><a class="contact-email-link" href="mailto:${esc(page.email)}">${esc(page.email)}</a></aside>
  </section>
</main>`;
