const mqtt = require('mqtt');
const express = require('express');

// MQTT broker details
const brokerUrl = 'mqtt://test.mosquitto.org:1883';
//const brokerPort = 1883;
const topic = 'MC/V1/testing';

// Create MQTT client
const client = mqtt.connect(brokerUrl);

// Retained messages array
const retainedMessages = [];

// MQTT client connection event
client.on('connect', () => {
  console.log('Retrieving message ....');
  client.subscribe(topic);
});

// MQTT message event
client.on('message', (receivedTopic, message) => {
  // Store the received retained message
  //retainedMessages.push({
    //topic: receivedTopic,
   // message: message.toString(),
   let payload;
   try {
     payload = JSON.parse(message.toString());
   } catch (error) {
     console.error('Error parsing JSON payload:', error);
     return;
   }
 
   // Store the received retained message
   retainedMessages.push({
     topic: receivedTopic,
     payload: payload,
  });
});

// Start Express server
const app = express();
const port = 3000;

app.get('/retained-messages', (req, res) => {
  res.json(retainedMessages);
});

app.listen(port, () => {
  console.log(`REST API server listening on port ${port}`);
});

// Disconnect MQTT client on program termination
process.on('SIGINT', () => {
  client.end();
  process.exit();
});
