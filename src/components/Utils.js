import { notification } from "antd";
const ALLOWED_METHODS = ["GET","POST","PUT","DELETE"];
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

export const handleAPICall = async (url, type, payload = {}, contentType = "application/json") => {

    const pathname = window.location.pathname.toLowerCase();
    const authToken = localStorage.getItem('token');
    const apiType = type.toUpperCase();

    if(authToken === null && pathname !== '/login'){
        window.location.pathname = "/login";
        return;
    }
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
  