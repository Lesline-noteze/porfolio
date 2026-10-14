// Fonction serverless Vercel
// Cette fonction s'exécute côté serveur.
// La clé API Brevo n'est jamais exposée au navigateur.

// Protection contre l'injection HTML
const esc = (s) =>
  String(s ?? '').replace(/[<>&"]/g, (c) =>
    ({
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;'
    }[c])
  );


export default async function handler(req, res) {

  // =========================
  // 1. POST uniquement
  // =========================

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Méthode non autorisée'
    });
  }


  // =========================
  // 2. Récupération des données
  // =========================

  const {
    name,
    email,
    message,
    website
  } = req.body || {};


  // =========================
  // 3. Anti-robot
  // =========================

  if (website) {
    return res.status(200).json({
      ok: true
    });
  }


  // =========================
  // 4. Validation
  // =========================

  if (!name || !email || !message) {
    return res.status(400).json({
      error: 'Champs manquants'
    });
  }


  // =========================
  // 5. Variables d'environnement
  // =========================

  const API_KEY = process.env.BREVO_API_KEY;
  const SENDER = process.env.SENDER_EMAIL;
  const OWNER = process.env.OWNER_EMAIL;


  // Vérification de configuration
  if (!API_KEY || !SENDER || !OWNER) {

    console.error(
      'Variables Brevo manquantes.'
    );

    return res.status(500).json({
      error: 'Service momentanément indisponible'
    });
  }


  // =========================
  // 6. Fonction d'envoi
  // =========================

  async function sendEmail(payload) {

    const response = await fetch(
      'https://api.brevo.com/v3/smtp/email',
      {
        method: 'POST',

        headers: {
          'api-key': API_KEY,
          'content-type': 'application/json',
          'accept': 'application/json'
        },

        body: JSON.stringify(payload)
      }
    );


    if (!response.ok) {

      const errorText = await response.text();

      console.error(
        'Erreur Brevo:',
        errorText
      );

      throw new Error(
        'Erreur lors de l’envoi'
      );
    }


    return response.json();
  }


  try {

    // =========================
    // EMAIL 1
    // Notification pour toi
    // =========================

    await sendEmail({

      sender: {
        name: 'Portfolio',
        email: SENDER
      },

      to: [
        {
          email: OWNER
        }
      ],

      replyTo: {
        email: email,
        name: name
      },

      subject: `Nouveau contact : ${name}`,

      htmlContent:
        `<h2>Nouveau message depuis votre portfolio</h2>` +

        `<p><strong>Nom :</strong> ${esc(name)}</p>` +

        `<p><strong>Email :</strong> ${esc(email)}</p>` +

        `<p><strong>Message :</strong><br>` +
        `${esc(message).replace(/\n/g, '<br>')}` +
        `</p>`
    });


    // =========================
    // EMAIL 2
    // Confirmation au visiteur
    // =========================

    await sendEmail({

      sender: {
        name: 'Lesline Noteze',
        email: SENDER
      },

      to: [
        {
          email: email,
          name: name
        }
      ],

      subject: 'Merci pour votre message !',

      htmlContent:
        `<p>Bonjour ${esc(name)},</p>` +

        `<p>` +
        `Merci de l'intérêt que vous portez à mon travail. ` +
        `J'ai bien reçu votre message et je reviendrai vers vous ` +
        `dans les meilleurs délais.` +
        `</p>` +

        `<p>` +
        `À très vite,<br>` +
        `Lesline Noteze` +
        `</p>`
    });


    
    return res.status(200).json({
      ok: true
    });

  } catch (error) {

    console.error(
      'Erreur envoi email:',
      error
    );

    return res.status(500).json({
      error: 'Envoi impossible'
    });
  }
}