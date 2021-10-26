exports.lambdaHandler = async (event) => {
  event.Records.map(record => console.log(JSON.stringify(record)))
  return JSON.stringify(event);
}