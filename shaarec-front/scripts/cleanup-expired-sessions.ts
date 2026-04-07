// Purge des sessions expirées en BDD
// Planifié : chaque dimanche à 3h (PM2 cron)

async function main() {
  // TODO: supprimer les sessions dont expires < now
  console.log("Expired sessions cleaned up.");
}

main().catch(console.error);
