const CustomAPIError = require('./custom-error');
const BadRequestError = require('./bad-request');
const UnauthenticatedError = require('./unautheticated');
const NotFoundError = require('./not-found');

module.export = {
    CustomAPIError,
    BadRequestError,
    UnauthenticatedError,
    NotFoundError
}