// When the popup loads, fill the IP address field with the stored value
function updateInputWithStoredIP() {
    browser.storage.local.get('ip', function(result) {
        document.getElementById('ipAddress').value = result.ip || '';
    });
}

// Save the IP address when the save button is clicked
document.getElementById('save').addEventListener('click', function() {
    const ipAddress = document.getElementById('ipAddress').value;
    browser.storage.local.set({ ip: ipAddress }, function() {
        console.log('IP Address saved!');
        // Optionally, trigger a refresh after saving
        checkIP();
    });
});

// Send a message to the background script to refresh the IP check
document.getElementById('refresh').addEventListener('click', function() {
    browser.runtime.sendMessage({ command: "refresh" });
    window.close(); // Close the popup after triggering a refresh
});

// Load the stored IP address when the popup is opened
document.addEventListener('DOMContentLoaded', updateInputWithStoredIP);

