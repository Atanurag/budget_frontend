import { notification } from "antd";
const ALLOWED_METHODS = ["GET","POST","PUT","DELETE"];

/**
 * Common configuration for all notifications triggered
 * @param type String denoting the type of notification
 * @param description  String denoting the content of the notification
 */
export const notificationDisplay = (type, description) => {
    let title = "";
    switch (type) {
        case "success":
            title = "Success";
            break;
        case "info":
            title = "Information";
            break;
        case "warning":
            title = "Warning";
            break;
        case "error":
            title = "Error";
            break;
        default:
            title = "Error";
            type = "error";
            description = "Incorrect notification type passed.";
        break;
    }

    notification.config({
        placement: "bottomRight",
        bottom: 50
    });

    notification[type]({
        message: title,
        description: description
    });
};

  
/**
 * Uses fetch to make API calls, with basic handling
 * @param url String containing the API endpoint
 * @param type String containing the http method - GET, POST
 * @param payload Object containing payload for POST calls
 * @param contentType String to handle different content types required for the API
 * @returns json data object
 */
export const handleAPICall = async (url, type, payload = {}, contentType = "application/json") => {

    const pathname = window.location.pathname.toLowerCase();
    // const history = useHistory();
    const authToken = localStorage.getItem('token');
    const apiType = type.toUpperCase();

    // To handle if user clears cache after authentication
    if(authToken === null && pathname !== '/login'){
        // history.push('/login');
        window.location.pathname = "/login";
        return;
    }

    // To handle only basic method definitions for now
    if (!ALLOWED_METHODS.includes(apiType)) {
        console.error("This API type is not defined in handlingAPICAll");
        return;
    }

    let options = {
        method: apiType,
        headers: { 
            "Content-Type": contentType,
            "Authorization": `Bearer ${authToken}`
        }
    };

    if (apiType === "POST" || apiType === "PUT") {
        options.body = JSON.stringify(payload);
    }

    let response = await fetch(url, options);

    //To catch and throw server errors
    if (!response.ok) {
        let errMsg = "";
        switch (response.status) {
            case 400:
                errMsg = "Invalid values have been entered. Please check and try again.";
                break;
            case 500:
                errMsg = "There seems to be something wrong at our end. Please try again in a while."
                break;
            default:
                errMsg = "Something went wrong!";
                break;
        }
        notificationDisplay("error", errMsg);
        throw Error(`${response.status}: ${response.statusText}`);
    }

    return await response.json();
};
  