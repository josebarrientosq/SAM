//const crypto = require('crypto');
mate = require('./mate')


let response;

exports.lambdaHandler = async (event, context) => {
    try {
        //const uuid = crypto.randomUUID();
        const uuid = mate.add(1, 2)
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                unique_id: uuid,
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};