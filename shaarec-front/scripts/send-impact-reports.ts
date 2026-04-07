// Notification aux donateurs qu'un nouveau rapport d'impact est disponible
// Planifié : 1er jour du trimestre à 10h (PM2 cron)

async function main() {
  // TODO: récupérer le dernier rapport publié
  // TODO: récupérer tous les donateurs
  // TODO: envoyer l'email de notification via SMTP
  console.log("Impact report notifications sent.");
}

main().catch(console.error);
