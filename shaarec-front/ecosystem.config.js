module.exports = {
  apps: [
    {
      name: "shaarec-front",
      script: "node_modules/.bin/next",
      args: "start",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
    {
      name: "shaarec-campaign-reminders",
      script: "npx",
      args: "tsx scripts/send-campaign-reminders.ts",
      cron_restart: "0 9 * * 1",
      autorestart: false,
    },
    {
      name: "shaarec-impact-reports",
      script: "npx",
      args: "tsx scripts/send-impact-reports.ts",
      cron_restart: "0 10 1 1,4,7,10 *",
      autorestart: false,
    },
    {
      name: "shaarec-cleanup",
      script: "npx",
      args: "tsx scripts/cleanup-expired-sessions.ts",
      cron_restart: "0 3 * * 0",
      autorestart: false,
    },
  ],
};
