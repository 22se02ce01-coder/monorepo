#!/bin/bash
# Stop all MicroFree preview servers started by run-all.sh
set -u
ROOT="$(cd "$(dirname "$0")" && pwd)"
PIDFILE="$ROOT/.run-pids"

# 1) Kill the npm processes we recorded (and their child vite processes).
if [ -f "$PIDFILE" ]; then
  while read -r pid name port; do
    [ -n "${pid:-}" ] || continue
    pkill -P "$pid" 2>/dev/null   # child vite process
    kill "$pid" 2>/dev/null       # npm wrapper
  done < "$PIDFILE"
fi

# 2) Safety net: free ports 1701-1720 in case anything is lingering.
for port in $(seq 1701 1720); do
  pid="$(lsof -ti tcp:"$port" 2>/dev/null)"
  [ -n "$pid" ] && kill $pid 2>/dev/null
done

: > "$PIDFILE"
echo "All MicroFree sites stopped (ports 1701-1720 freed)."
