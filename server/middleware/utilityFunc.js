

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
const statusCodeStatus = (code) => {
    const status = {};
    status.status = 'error';
    if (code>=200 && code < 300){
        status.status = 'success';
    }
    status.message = statusCodeMessage(code);
    return status;

}


const prepareResult = (jsonData={}, statusCode = 400) => {

    const result = {};
    const status = statusCodeStatus(statusCode);

    result.status = status.status;
    result.statusMessage = status.message;

    if (jsonData.statusMessage){
        result.message = jsonData.statusMessage;
    }
    result.data = jsonData;
    /*
    if (jsonData && statusCode == 200) {
        result.status = status.status;
        result.statusMessage = status.message;
        result.data = jsonData;
    } else {
        result.status = status.status;
        result.statusMessage = status.message;
        result.message = jsonData.message;
    }
    */
    return result;
}

const jsonMessage = (msg) => {
    const result = {};
    result.statusMessage = msg
    return result;
}

module.exports = {jsonMessage, prepareResult};