
export const handleCleareLocalStorage = () => {
    // cleare local storage except i18nextLng
    for (var i = 0; i <= localStorage.length; i++) {
        let keyName = localStorage.key(i)
        console.log("keyName", keyName)
        if (keyName !== "i18nextLng") {
            localStorage.removeItem(keyName)
        }
    }
}