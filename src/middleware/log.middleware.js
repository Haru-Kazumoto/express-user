function logger(request, response, next) {
    console.log(`Ada request dari ${request.url}`);

    next();
}

module.exports = { logger };