const validatePhoneNumber = (number) => {

    number = cleanPhoneNumber(number);
    const phoneRegex = /^\+?\d{10,}$/;
    return phoneRegex.test(number);

};

const cleanPhoneNumber = (number) => {
    return number.replace(/[^0-9]/g, '');
}


const hasTextContent = (data) => {

    if (!data) return false;
    if (typeof data !== 'string') return false;
    if (data.length < 1) return false;

    return true;
}

const isValidAccessToken = (token) => {

    const ACCESSTOKEN = process.env.ACCESSTOKEN;

    if (!hasTextContent(token)) return false;
    if (token !== ACCESSTOKEN) return false;

    return true;

}

module.exports = {
    validatePhoneNumber,
    hasTextContent,
    isValidAccessToken,
    cleanPhoneNumber
}