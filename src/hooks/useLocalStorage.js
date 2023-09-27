/* eslint-disable no-case-declarations */
const useLocalStorage = (key, type) => {
    try {
        let output;
        switch (type) {
            case 'get':
                const item = localStorage.getItem(key);
                output = item ? JSON.parse(item) : '';
                break;

            case 'set':
                const setValue = (newValue) => { localStorage.setItem(key, JSON.stringify(newValue)); };
                output = [setValue];
                break;

            default:
                const deleteValue = () => { localStorage.removeItem(key); };
                output = [deleteValue];
                break;
        }

        return output;
    } catch (error) {
        console.log(error);
    }
}

export default useLocalStorage;