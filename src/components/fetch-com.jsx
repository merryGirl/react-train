import React from 'react'
import { httpGet, httpPost } from "../utils/http"

class FetchCom extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            flag: false,
            imgDatas: []
        }
    }

    componentDidMount() {
        httpGet("https://www.fastmock.site/mock/198c7c6e1e9a42799ccc859dab720686/draw/piclist")
            .then(data => {
                if (data && data.success) {
                    this.setState({
                        imgDatas: data.result || []
                    })
                }
            })

        httpPost("https://www.fastmock.site/mock/198c7c6e1e9a42799ccc859dab720686/draw/source/img/all")
            .then(data => {
                // console.log("post的接口返回的数据据", data)
            })

    }

    render() {
        const imgDatas = this.state.imgDatas
        return (
            <div>
                <h2>fetch组件</h2>
                {imgDatas.map(imgItem => {
                    return <div key={imgItem.id}>
                        {imgItem.pics?.length && (
                            imgItem.pics.map(picItem => {
                                return <img key={picItem.id} scr={picItem.url} alt={picItem.name} />
                            })
                        )}
                    </div>
                })}
            </div>
        )
    }
}

export default FetchCom