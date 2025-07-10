#!/bin/bash
cd /home/kavia/workspace/code-generation/live-video-insight-platform-b19be3ee/video_questions_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

