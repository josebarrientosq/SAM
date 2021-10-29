import requests
import json

def lambda_handler(event, context):
    r = requests.get('https://api.github.com/events')
    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": r.json() # invoke layer function
        }),
    }