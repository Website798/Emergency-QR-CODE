let contactCount = 0;

window.onload = () => {
  addContact();
  addContact();
  addContact();

  loadSavedData();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }
};

function addContact() {
  contactCount++;

  const container = document.getElementById('contactsContainer');

  const div = document.createElement('div');
  div.className = 'contact-card';

  div.innerHTML = `
    <h3>Contact ${contactCount}</h3>

    <input type="text" class="contact-name" placeholder="Name">
    <input type="text" class="contact-relationship" placeholder="Relationship">
    <input type="text" class="contact-address" placeholder="Address">
    <input type="text" class="contact-number" placeholder="Contact Number">
    <input type="text" class="contact-socmed" placeholder="Social Media">
  `;

  container.appendChild(div);
}

function generateQR() {
  const contacts = document.querySelectorAll('.contact-card');

  let emergencyContacts = '';

  contacts.forEach((contact, index) => {
    emergencyContacts += `
Emergency Contact ${index + 1}
Name: ${contact.querySelector('.contact-name').value}
Relationship: ${contact.querySelector('.contact-relationship').value}
Address: ${contact.querySelector('.contact-address').value}
Contact Number: ${contact.querySelector('.contact-number').value}
Social Media: ${contact.querySelector('.contact-socmed').value}

`;
  });

  const data = `
PERSONAL INFORMATION
-------------------------
Name: ${document.getElementById('name').value}
Birthday/Age: ${document.getElementById('birthday').value}
Address: ${document.getElementById('address').value}
Contact Number: ${document.getElementById('contact').value}
Email: ${document.getElementById('email').value}
Social Media: ${document.getElementById('socmed').value}
School/Company ID: ${document.getElementById('school').value}
Religion: ${document.getElementById('religion').value}
Organ Donor: ${document.getElementById('donor').value}

MEDICAL INFORMATION
-------------------------
Blood Type: ${document.getElementById('blood').value}
Allergies: ${document.getElementById('allergies').value}
Medical Conditions: ${document.getElementById('conditions').value}
Current Medications: ${document.getElementById('medications').value}
Doctor/Hospital: ${document.getElementById('doctor').value}
Insurance: ${document.getElementById('insurance').value}
Special Instructions: ${document.getElementById('instructions').value}

${emergencyContacts}
`;

  document.getElementById('output').value = data;

  localStorage.setItem('emergencyData', data);

  const qr = document.getElementById('qrcode');
  qr.innerHTML = '';

  new QRCode(qr, {
    text: data,
    width: 256,
    height: 256
  });
}

function downloadQR() {
  const img = document.querySelector('#qrcode img');

  if (!img) {
    alert('Generate QR first!');
    return;
  }

  const link = document.createElement('a');
  link.href = img.src;
  link.download = 'emergency-qr.png';
  link.click();
}

function clearForm() {
  location.reload();
}

function loadSavedData() {
  const saved = localStorage.getItem('emergencyData');

  if (saved) {
    document.getElementById('output').value = saved;
  }
}
