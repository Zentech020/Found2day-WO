let backend_origin;
if (process.env.ENV_TYPE === "PRODUCTION") {
 backend_origin = 'https://found2day-wo.herokuapp.com';
} else {
 backend_origin = 'https://dev-found2day-wo.herokuapp.com';
}

export const API_URL = backend_origin;
