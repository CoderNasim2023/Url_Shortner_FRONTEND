import axios from "axios"

const MAX_RETRIES = 2;
const RETRY_DELAY = 2000; // 2 seconds between retries

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "https://url-shortner-backend-qoag.onrender.com",
    timeout: 60000, //60seconds or 1min for render fre-tier plan wakeup issue cold start solution 
    withCredentials: true
})

// Response interceptor with automatic retry for cold start network errors
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const config = error.config;

        // Initialize retry count
        if (!config._retryCount) {
            config._retryCount = 0;
        }

        // Auto-retry on network errors (server sleeping / cold start)
        if (!error.response && config._retryCount < MAX_RETRIES) {
            config._retryCount += 1;
            console.log(`Server waking up... Retry ${config._retryCount}/${MAX_RETRIES}`);
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            return axiosInstance(config);
        }

        // Handle different types of errors
        if (error.response) {
            const { status, data } = error.response;
            switch (status) {
                case 400:
                    console.error("Bad Request:", data);
                    break;
                case 401:
                    console.error("Unauthorized:", data);
                    break;
                case 403:
                    console.error("Forbidden:", data);
                    break;
                case 404:
                    console.error("Not Found:", data);
                    break;
                case 500:
                    console.error("Server Error:", data);
                    break;
                default:
                    console.error(`Error (${status}):`, data);
            }
        } else if (error.request) {
            console.error("Network Error: Server may be starting up.", error.request);
        } else {
            console.error("Error:", error.message);
        }

        return Promise.reject({
            message: error.response?.data?.message || 
                     (!error.response ? "Server is starting up, please wait and try again..." : error.message) || 
                     "Unknown error occurred",
            status: error.response?.status,
            data: error.response?.data,
        });
    }
);
export default axiosInstance