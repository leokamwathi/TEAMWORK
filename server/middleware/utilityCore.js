

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

const formatPostResponseData = (post,msg='retrived') => {
    const data = {};
        if (post.isGif == true) {
            data.message = `GIF image was successfully ${msg}`;
            data.gifId = post.id
            data.createdOn = post.createdAt
            data.title = post.title
            data.imageUrl = post.post
            data.flag = post.flaged
            data.authorId = post.authorId
            if(post.user){
                data.authorName = `${post.user.firstName} ${post.user.lastName}`
            }else{
                data.authorName = 'John Doe'
            }
        } else {
            data.message = `Article was successfully ${msg}`;
            data.articleId = post.id
            data.createdOn = post.createdAt
            data.title = post.title
            data.post = post.post
            data.flag = post.flaged
            data.authorId = post.authorId
            if(post.user){
                data.authorName = `${post.user.firstName} ${post.user.lastName}`
            }else{
                data.authorName = 'John Doe'
            }
        }
        return data
}

const formatCommnetResponseData = (comment)=>{

    const data = {}
    if(comment){
        data.commentId = comment.id
        data.comment = comment.comment
        data.createdOn = comment.createdAt
        data.authorId = comment.authorId
        data.postId = comment.postId
        data.flag = comment.flaged
        if(comment.user){
            data.authorName = `${comment.user.firstName} ${comment.user.lastName}`
        }else{
            data.authorName = 'John Doe'
        }
    }

    return data
}
module.exports = { createResponse,formatPostResponseData,formatCommnetResponseData};