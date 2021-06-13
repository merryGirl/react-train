export function httpGet(url) {
    return fetch(url).then(res => {
        return res.json()
    })
}

export function httpPost(url, params) {
    return fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/s-www-form-urlencoded",
            "Accept": "application/json,text/plain,*/*"
        },
    }).then(res => {
        return res.json()
    })
}