module.exports = {
  apps: [
    {
      name: 'techknowlk-server',
      script: './server/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      // Restart settings
      max_memory_restart: '500M',
      max_restarts: 10,
      min_uptime: '10s',
      
      // Logging
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Auto restart on file changes (disable in production)
      watch: false,
      ignore_watch: ['node_modules', 'public', 'dist', 'logs'],
      
      // Graceful shutdown
      kill_timeout: 5000,
      wait_ready: false,
      listen_timeout: 3000,
    },
  ],

  // Deploy configuration (optional)
  deploy: {
    production: {
      user: 'root',
      host: 'your-vps-ip-address',
      ref: 'origin/main',
      repo: 'https://github.com/YOUR_USERNAME/techknowlk_web.git',
      path: '/home/username/techknowlk_web',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
    },
  },
};
