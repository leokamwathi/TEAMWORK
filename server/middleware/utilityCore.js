

const statusCodeMessage = (code)=>{
    switch (code) {
        case 200:
            return 'OK';
        case 201:
            return 'Created';
        case 202:
            return 'Accepted';
        case 204:
            return 'No Content returned';
        case 400:
            return 'Bad Request';
        case 401:
            return 'Unauthorized';
        case 403:
            return 'Forbidden';
        case 404:
            return 'Not Found';
        case 500:
            return 'Internal Server Error';
        default:
            return 'Error';
    }
}

const createResponse = (jsonData = {}, statusCode = 400,msg='Bad Request.') => {
try {
    // console.log('CREATE RESPONSE JSON:', jsonData);
    const result = {};
    // result.status = statusCodeMessage(statusCode);
    // result.status = statusCodeMessage(statusCode);
    if (statusCode >= 200 && statusCode < 300) {
        result.status = "Success"
        result.message = `${statusCodeMessage(statusCode)  } : ${  msg}`;
    } else {
        result.status = "Error"
        result.error = `${statusCodeMessage(statusCode)  } : ${  msg}`
    }

    if (jsonData && Object.entries(jsonData).length > 0) {
        // && jsonData.constructor === Object // getting issues when its an array
        result.data = jsonData;
    }

    console.log('CREATE RESPONSE:', result);
    return result;
} catch (error) {
    // console.log("CREATE RESPONSE ERROR:",error)'
    return { serverError: { status: 'Internal Server Error', error: 'The server encounted an error.' } };;
}
}

module.exports = { createResponse};