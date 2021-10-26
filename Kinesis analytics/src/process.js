const AWS = require('aws-sdk')
const dc = new AWS.DynamoDB.DocumentClient()
const TTL = 10

exports.handler = async (event) => {
  let items = []
  let now = Date.now();
  let output = []

  event.records.map(record => {
    let buff = new Buffer.from(record.data, 'base64');
    let text = buff.toString('utf-8');

    let params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        id: record.recordId,
        createdTime: now,
        ttl: now + TTL * 60 * 1000,
        ...JSON.parse(text)
      },
      ConditionExpression: 'attribute_not_exists(id)'
    }

    items.push(dc.put(params).promise())
    output.push({
      result: 'Ok', // Dropped | Ok | ProcessingFailed
      ...record
    })
  })

  try {
    await Promise.all(items)
  } catch (err) {
    console.log(err.message);
  }
  return {
    records: output
  }
}