const AWS = require('aws-sdk');
const comprehend = new AWS.Comprehend();

exports.lambdaHandler = async (event) => {
  try {
    let params = {
      LanguageCode: event.detail.language,
      Text: event.detail.data
    }
    let sentiment = await comprehend.detectSentiment(params).promise()
    console.log(sentiment.Sentiment)
  } catch (err) {
    console.log(err.message)
  }
  return {
    "success": true
  }
}