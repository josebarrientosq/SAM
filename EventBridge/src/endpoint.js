const model = {
  "type": "translate",
  "data": "This string should be translated",
  "language": "es"
}

const AWS = require('aws-sdk');
const eventbridge = new AWS.EventBridge();


exports.lambdaHandler = async (event) => {
  try {
    let requestData = JSON.parse(event.body)
    let params = {
      Entries: [{
        Detail: JSON.stringify(requestData),
        DetailType: requestData.type,
        Source: "TextEndpoint",
        EventBusName: process.env.EVENT_BUS_NAME
      }]
    }

    if (requestData) await eventbridge.putEvents(params).promise()

    console.log('Pushed data to EventBridge');
    console.log(params);

    return {
      "message": "data received",
      "data": requestData
    }
  } catch (err) {
    console.log(err.message);
    return {
      "message": "Error submitting data",
      "error": err.message
    }
  }
}