#!/bin/bash

# Your deployment ID
CWD="$(pwd)"
cd $CWD
DEPLOYMENT_ID="AKfycbyRGIpRjYG-Puznx4z9T83ov-nkVQEAVXcAE9O-9xyQgEwCrZsBv7IuYcjrBg2YVtUykw"

# Push local files to Apps Script project
echo "Pushing project to Google Apps Script..."
clasp push

# Deploy using the deployment ID
echo "Deploying to deployment ID: $DEPLOYMENT_ID"
clasp deploy --deploymentId "$DEPLOYMENT_ID"

echo "Deployment complete."