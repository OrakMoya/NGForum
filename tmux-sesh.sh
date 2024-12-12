#!/bin/bash

SESH="ngforum_session"
tmux has-session -t $SESH 2>/dev/null

if [ $? != 0 ]; then
	tmux new-session -d -s $SESH -n "editorex"
	tmux send-keys -t $SESH:editorex "nvim ." C-m

	tmux new-window -t $SESH -n "editorfe"
	tmux send-keys -t $SESH:editorfe "cd frontend" C-m
	tmux send-keys -t $SESH:editorfe "nvim ." C-m

	tmux new-window -t $SESH -n "serverex"
	tmux send-keys -t $SESH:serverex "npm run dev" C-m

	tmux new-window -t $SESH -n "serverfe"
	tmux send-keys -t $SESH:serverfe "cd frontend" C-m
	tmux send-keys -t $SESH:serverfe "ng build --watch" C-m
	
	tmux select-window -t $SESH:editorex
fi

tmux attach-session -t $SESH
