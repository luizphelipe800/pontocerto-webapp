
import { DateTime } from 'luxon';

/**
 * @param {String} key - chave de identificação do objeto
 * @param {String} value - valor do objeto
 * @param {Object} user - um objeto com os dados do usuario logado
 * @param {Number} expiredIn - tempo de vida do objeto em dias
 */

const SetLocalStorage = (key, token, user, expiredIn) => {
    const expires = DateTime.fromMillis(Date.now()).plus({ days: expiredIn });
    const values = { token, user, expires }
    
    localStorage.setItem(key, JSON.stringify(values));
}

export default SetLocalStorage;