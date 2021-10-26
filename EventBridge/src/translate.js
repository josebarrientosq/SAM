const AWS = require('aws-sdk');
const translate = new AWS.Translate();

exports.lambdaHandler = async (event) => {
  try {
    let params = {
      SourceLanguageCode: "auto",
      TargetLanguageCode: event.detail.language,
      Text: event.detail.data
    }
    let translation = await translate.translateText(params).promise()
    console.log(translation.TranslatedText)
  } catch (err) {
    console.log(err.message)
  }
  return {
    "success": true
  }
}