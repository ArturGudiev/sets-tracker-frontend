#!/bin/sh
# Write runtime env.js from environment variables (parametrized in docker-compose)
API_BASE_URL="${API_BASE_URL:-}"
API_HOST="${API_HOST:-http://localhost}"
API_PORT="${API_PORT:-8080}"
echo "window.__env = { \"API_BASE_URL\": \"$API_BASE_URL\", \"API_HOST\": \"$API_HOST\", \"API_PORT\": \"$API_PORT\" };" > /usr/share/nginx/html/env.js

# HTTP Basic Auth: create .htpasswd from AUTH_USER / AUTH_PASS (default: admin / admin)
AUTH_USER="${AUTH_USER:-admin}"
AUTH_PASS="${AUTH_PASS:-admin}"
htpasswd -cb /etc/nginx/.htpasswd "$AUTH_USER" "$AUTH_PASS"

exec nginx -g "daemon off;"



# API_HOST="${API_HOST:-http://localhost}"
# API_PORT="${API_PORT:-5173}"
# echo "window.__env = { \"API_HOST\": \"$API_HOST\", \"API_PORT\": \"$API_PORT\" };" > /usr/share/nginx/html/env.js
# exec nginx -g "daemon off;"

