exports.errorResponse = function (status, message, data)
{
    return {
        status: status,
        message: message,
        data: data
    }
}