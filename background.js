// Function to fetch the stored IP address
async function getStoredIP() {
    let data = await browser.storage.local.get('ip');
    return data.ip || '123.45.67.89'; // Default IP if none is stored
}

// Function to check the current IP address against the stored IP
async function checkIP() {
    try {
        const storedIP = await getStoredIP();
        const response = await fetch('https://daechler.net/ip/');
        const currentIP = (await response.text()).trim();

        if (currentIP === storedIP) {
            browser.browserAction.setIcon({ path: 'icons/green.png' });
        } else {
            browser.browserAction.setIcon({ path: 'icons/red.png' });
        }
    } catch (error) {
        console.error('Error fetching or comparing IP:', error);
        // Handle the error, e.g., by setting an error icon or a default icon
        browser.browserAction.setIcon({ path: 'icons/error.png' }); // Ensure this icon exists
    }
}

// Set the alarm when the extension is loaded
browser.alarms.create('checkIP', { periodInMinutes: 1/6 });

// Add a listener for the alarm to trigger the IP check
browser.alarms.onAlarm.addListener(alarm => {
    if (alarm.name === 'checkIP') {
        checkIP();
    }
});

// Check the IP once on startup
checkIP();

