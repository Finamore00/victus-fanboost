#!/bin/bash

# This script is tasked only with invoking the fanboost
# script through pkexec. Written to have an easier time
# defining polkit actions and rules.

INSTALL_DIR=$(pwd)

pkexec $INSTALL_DIR/fanboost.sh
