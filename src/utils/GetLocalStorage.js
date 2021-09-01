import { DateTime } from 'luxon';

/**
 * @param {String} key - chave de identificação
 */

const GetLocalStorage = key => {
    for (let idx = 0; idx < localStorage.length; idx++) {
        const item = JSON.parse(localStorage.getItem(localStorage.key(idx)));

        if(DateTime.fromISO(item.expires) < DateTime.fromMillis(Date.now())){
            localStorage.removeItem(localStorage.key(idx));
        }
    }

    return JSON.parse(localStorage.getItem(key));
}

export default GetLocalStorage;