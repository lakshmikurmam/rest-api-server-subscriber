const mqtt = require('mqtt');

const mqttBrokerUrl = 'mqtt://test.mosquitto.org:1883';
const mqttTopic = 'MC/V1/testing';

// Create an MQTT client
const mqttClient = mqtt.connect(mqttBrokerUrl);

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