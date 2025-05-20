// assets/google-sheets.js

const SPREADSHEET_ID = '1MJZkAls4O-Tv8sUwWI0A3SrR3c2XdgVwwa3C0tueNwU';
const CLIENT_ID = '771396866536-746ok97bc786uns41fh0n06q08um5ib3.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAMQuF-rsvREUAgf6RzvLPOhLoLHVBIKEI';
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

// Load the Google API client library
function loadClient() {
    gapi.load('client:auth2', initClient);
}

// Initialize the client with API key and OAuth2 info
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4']
    }).then(function() {
        // Listen for sign-in state changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        // Handle initial sign-in state
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

// Update UI based on sign-in status
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        // User is signed in, you can now make API calls
        console.log('User is signed in');
    } else {
        // User is not signed in, show sign-in button
        console.log('User is not signed in');
    }
}

// Sign in the user
function handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
}

// Sign out the user
function handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut();
}

// Example function to read data
function readData(sheetName, range) {
    return gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!${range}`
    });
}

// Example function to write data
function writeData(sheetName, range, values) {
    return gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!${range}`,
        valueInputOption: 'USER_ENTERED',
        resource: { values: values }
    });
}

// Load the API client when the page loads
window.onload = function() {
    loadClient();
};