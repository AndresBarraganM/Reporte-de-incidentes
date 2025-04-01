export const validatePhoneFormat = (phoneNumber) => {
    const e164Regex = /^\+[1-9]\d{1,14}$/;
    return e164Regex.test(phoneNumber);
  };
  
  export const sanitizePhoneNumber = (phone) => {
    return phone.replace(/[^\d+]/g, '');
  };