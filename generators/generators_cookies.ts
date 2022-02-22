
export const generateCookies = (documentCookies:string)=>{
    const separateWithSemicolon = document.cookie.split(";");
    const cookieIterator = separateWithSemicolon.map(item=>{
        const separateWithEqual = item.split("=");
        return{
            key:separateWithEqual[0].trim(),
            value:separateWithEqual[1].trim()
        }
    });
    const cookies = cookieIterator.reduce((prevValue, currentValue)=>{
        const {key,value} = currentValue;
        return {...prevValue,[key]:value};
    },{});
    return cookies;
}