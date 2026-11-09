#!/bin/bash
# Start all 20 MicroFree sites, each on its own port (01 -> 1701 ... 20 -> 1720).
# Each site keeps running continuously until you stop it with ./stop-all.sh
#
# Usage:  bash run-all.sh
#
# Site NN  ->  http://localhost:17NN   (e.g. 01 -> 1701, 20 -> 1720)

set -u
ROOT="$(cd "$(dirname "$0")" && pwd)"
LOGDIR="$ROOT/.run-logs"
PIDFILE="$ROOT/.run-pids"
mkdir -p "$LOGDIR"
: > "$PIDFILE"

echo "Starting MicroFree sites from: $ROOT"
echo "------------------------------------------------------------"

for dir in "$ROOT"/[0-9][0-9]-*/; do
  name="$(basename "$dir")"
  num="${name:0:2}"                 # "01".."20"
  port=$((1700 + 10#$num))          # 10# = force base-10 (so 08/09 don't error)

  # Make sure the production build exists; build it if missing.
  if [ ! -f "$dir/dist/index.html" ]; then
    echo "[$num] building $name (no dist yet)..."
    ( cd "$dir" && npm run build > "$LOGDIR/$name.build.log" 2>&1 ) \
      || { echo "[$num] BUILD FAILED -> see $LOGDIR/$name.build.log"; continue; }
  fi

  # Start the preview server in the background, surviving terminal close (nohup).
  nohup npm --prefix "$dir" run preview -- \
      --port "$port" --strictPort --host 0.0.0.0 \
      > "$LOGDIR/$name.log" 2>&1 &
  pid=$!
  echo "$pid $name $port" >> "$PIDFILE"
  echo "[$num] $name  ->  http://localhost:$port   (pid $pid)"
done

echo "------------------------------------------------------------"
echo "All sites launched. They keep running in the background."
echo "Logs:    $LOGDIR/<site>.log"
echo "Stop:    bash $ROOT/stop-all.sh"
echo "Status:  cat $PIDFILE"
