// NUMERO RANDOM
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// NUMERO PARI O DISPARI
function isEven(num) {
    if (num % 2 === 0) {
        return true;
    } else {
        return false;
    }
}

// NOTIFICA DI ERRORE
function notificationError(msgError, elem, selector) {
    const alerta = document.createElement(elem);
    alerta.className = selector;
    alerta.innerHTML = msgError;
    return alerta;
}

// NOTIFICA DI SUCCESSO
function notificationSuccess(msgSuccess) {
    const success = document.createElement('div');
    success.className = 'alert alert-success';
    success.innerHTML = msgSuccess;
    return success;
}

// RIMOZIONE NOTIFICA
function removeFirstNotification() {
    const alertToRemove = document.querySelector('.alert');
    if (alertToRemove) alertToRemove.remove();
}