const AWS = require('aws-sdk')
const dc = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event) => {
  let items = []
  let now = Date.now();

  event.records.map(record => {
    let buff = new Buffer.from(record.data, 'base64');
    let text = JSON.parse(buff.toString('utf-8'));

    let params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        id: text.resourcePath.replace("/", '')
      },
      AttributeUpdates: {
        count: {
          Action: "ADD",
          Value: text.LINK_COUNT
        },
        updated: {
          Action: "PUT",
          Value: now
        }
      }
    }

    items.push(dc.update(params).promise())
  })

  try {
    await Promise.all(items)
  } catch (err) {
    console.log(err.message);
  }
  return null;
}