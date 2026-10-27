export const formatPhoneNumber = (phoneNumber: string) : string => {
    const cleanPattern = /[^\d+]/g;
    const cleanPhoneNumber = phoneNumber.replace(cleanPattern, '');
    const pattern = /(\+\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/;
    return cleanPhoneNumber.replace(pattern, "$1 $2 $3 $4 $5");
};