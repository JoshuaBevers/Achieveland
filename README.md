# version 1.0.0.1

## Goals

### Short Term

-- Create incoming and outgoing data verification
-- import a package for yaml to JSON conversion
-- create a short script to scan JSON database and verify data integrity. This can be done locally to save compute time.

### Long Term

-- Make the game-stub page slightly more mobile friendly. Condense info or force page to only display one achievement per line.
-- Add achievement difficulty
-- Add achievement/ game contributor -- potential monitezation point down the line.
-- Material snackbar for a more responsive UI feedback on the claim button so the page doesn't have to reload. https://material-ui.com/components/snackbars/
user controller will have the modified to send a response that the UI listens to.

## Feature List

Get achievements - there will be more
claim achievements

### Tech

MongoDb
Lambda serverless controllers
AWS Amplify deployment
Auth0 Security
a bunch of UI systems implicit.

### Glitches

## Version Updates

-- removed glitch where ui hits mongodb with two requests with only one is required.
