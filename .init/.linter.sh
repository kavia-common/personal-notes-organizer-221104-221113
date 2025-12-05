#!/bin/bash
cd /home/kavia/workspace/code-generation/personal-notes-organizer-221104-221113/notes_manager_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

