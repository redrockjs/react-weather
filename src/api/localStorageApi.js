
export let storageAPI = {
    addStorageItem(payload) {

        let data = JSON.parse(localStorage.getItem('isCloudlyFav'))
        //console.log("payload",payload)
        //console.log("data", !!data)

        if (!!data) {
            data = [ ...data, payload]
            //console.log("data", !!data)
        } else {
            data = [payload]
            //console.log("data", !!data)
        }

        try {
            localStorage.setItem('isCloudlyFav', JSON.stringify(data))
        } catch (e) {
            if (e == "QUOTA_EXCEEDED_ERR") {
                console.error('Превышен лимит локального хранища браузера')
            } else {
                console.log(e)
            }
        }
    },
    getAllStorageItem() {
        let data = JSON.parse(localStorage.getItem('isCloudlyFav'))
        return data

    },
    deleteStorageItem(id) {
        let data = JSON.parse(localStorage.getItem('isCloudlyFav'))
        let result = data.filter( value => value.id !== Number(id))
        localStorage.setItem('isCloudlyFav', JSON.stringify(result))
    }
}