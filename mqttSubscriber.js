const mqtt = require('mqtt');
const username = 'gepc-subs-1';
const password = '16bfb2d5c';
const clientId = 'c1d9b92d-930a-4c67-9421-6588f1c584d4';

//local test
//const Url = 'mqtt://test.mosquitto.org:1883';
const Url = '10.246.0.10:1883';
const mqttTopic = 'MC/V1/testing';

// Create an MQTT client
//local test
const mqttClient = mqtt.connect(Url);
//const mqttClient = mqtt.connect(`mqtt://${username}:${password}@${host}`, {
// clientId,
// clean: true,
// rejectUnauthorized: false
//});
let latestMessage = null; // Variable to store the latest MQTT message

// Subscribe to the MQTT topic
mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');

    mqttClient.subscribe(mqttTopic, (err) => {
        if (err) {
            console.error('Error subscribing to topic:', err);
        } else {
            console.log('Subscribed to topic:', mqttTopic);
        }
    });
});

// Listen for MQTT messages
mqttClient.on('message', (topic, message) => {
    console.log('Received message on topic:', topic);
    console.log('Test12:', topic);
    console.log('Received message:', JSON.parse(message.toString()));
    console.log('Test125555:', topic);

    // Update the latest message
    try {
        latestMessage = JSON.parse(message.toString());
        // Process the JSON payload as needed
        console.log('Parsed payload:', latestMessage);
    } catch (error) {
        console.error('Error parsing JSON payload:', error);
    }

});

mqttClient.on('close', () => {
    console.log('Disconnected from MQTT broker');
});

module.exports = {
    getLatestMessage: () => latestMessage, // Function to retrieve the latest message
};