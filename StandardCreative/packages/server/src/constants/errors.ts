const errorMessages = {
	FULL_NAME_REQUIRED: 'Full name is required.',
	FIRST_NAME_REQUIRED: 'First name is required.',
	LAST_NAME_REQUIRED: 'Last name is required.',
	USERNAME_REQUIRED: 'Username is required.',
	USERNAME_IN_USE: 'Username already in use.',
	EMAIL_REQUIRED: 'Email is required',
	EMAIL_IN_USE: 'Email already in use.',
	EMAIL_INVALID: 'Email is invalid.',
	MESSAGE_REQUIRED: 'Message is required.',
	PASSWORD_REQUIRED: 'Password is required.',
	INVALID_PASSWORD: 'Password must be at least 8 characters and include 1 upper case letter (A-Z) and 1 number (0-9).',
	PW_CONFIRMATION_REQUIRED: 'Password Confirmation is required.',
	PW_CONFIRMATION_NOT_MATCH: 'Password Confirmation isn’t match.',
	PHONE_NUMBER_IN_USE: 'Phone number is already in use.',
	PERSONAL_EMAIL_REQUIRED: 'Personal email is required.',
	PERSONAL_EMAIL_INVALID: 'Personal email is invalid.',
	PERSONAL_EMAIL_EXIST: 'Personal email already exists.',
	PERSONAL_EMAIL_NOT_VERIFIED: 'Personal email isn’t verified yet.',
	PERSONAL_EMAIL_ALREADY_VERIFIED: 'Email is already verified.',
	INCORRECT_EMAIL: 'Error: Incorrect email.',
	INCORRECT_USERNAME: 'Error: Incorrect username.',
	INCORRECT_PASSWORD: 'Error: Password does not match our records.',
	SUSPEND_MESSAGE: 'Error: your account has been suspended! Please contact to admin.',
	REFRESH_TOKEN_REQUIRED: 'Refresh token is required.',
	INVALID_REFRESH_TOKEN: 'Refresh token is invalid.',
	VERIFY_TOKEN_REQUIRED: 'Verification token is required.',
	USER_NOT_FOUND: 'Can’t find the user with this email address',
	USER_NOT_FOUND_BY_ID: 'Can’t find the user.',

	BAD_REQUEST: 'Bad request. Please check params.',
	UNKNOWN_ERROR: 'An unknown error occurred, Please contact support!',

	INVALID_CREDENTIALS: 'Invalid Credentials.',

	NO_AUCTION_PAGE: 'Auction page is required.',
	NO_AUCTION_PAGE_SIZE: 'Auction page size is required.',
	NO_IPFS: 'Ipfs hash is required.',
	NO_TRANSACTION_HASH: 'Transaction Hash is required.',
	NO_IMAGE_URL: 'Image URL is required.',
	NO_TITLE: 'Title is required',
	NO_COMMENTS: 'Comments is required',
	NO_LIKES: 'Likes is required',
	NO_SHORT_CODE: 'Short code is required',
	NO_TOKENID: 'Token Id is required',
	NO_USERNAME: 'There is no user with such username',
	INVALID_AUCTION_ID: 'There is no auction with this id',
	INVALID_URL: 'There is no offer with this url',

	CODE_REQUIRED: 'code is required',
	REDIRECT_URI_REQUIRED: 'redirect_uri is required',
	NO_URL: 'Post URL is required',
	NO_PAGE: 'Page is required',
	NO_PAGESIZE: 'Size is required',
	NO_PRICE: 'Price is required',
	NO_SOURCE: 'Media url is required',
	NO_STATUS: 'Status is required',
	NO_ID: 'Id is required',
	POST_ALREADY_TAKEN: 'This post is already sold'
};

const errorCodes = {
	INPUT_VALIDATION_FAILED: 422,
	AUTH_FAILED: 401,
	PERSONAL_EMAIL_NOT_VERIFIED: 403,
	PERSONAL_EMAIL_ALREADY_VERIFIED: 409,
	INVALID_REFRESH_TOKEN: 401,
	NOT_FOUND: 404,

	BAD_REQUEST: 400,
	UNKNOWN_ERROR: 500,
};

export { errorMessages, errorCodes };
