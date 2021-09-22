export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const trimFirstCharacter = (string) => {
    return string.substr(1);
}

export const removeSpacesFromString = (string) => {
    return string.replace(/\s/g, '');
}

export const formatDate = (date) => {
    const unformattedDate = date ? new Date(date) : new Date()
    return unformattedDate.toISOString().split('T')[0]
}