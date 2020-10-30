
export let storageAPI = {
    addStorageItem(payload) {
        try {
            localStorage.setItem(payload.id, JSON.stringify(payload))
        } catch (e) {
            if (e == "QUOTA_EXCEEDED_ERR") {
                console.error('Превышен лимит локального хранища браузера');
            }
        }
    },
    getAllStorageItem() {
        let arr=[]
        for(let key in localStorage) {
            if (!localStorage.hasOwnProperty(key)) {
                continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
            }
            arr = [...arr, JSON.parse(localStorage.getItem(key))]
        }
        return arr
    },
    deleteStorageItem(id) {
        localStorage.removeItem(id)
    }
}