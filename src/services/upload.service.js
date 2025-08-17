import axios from "axios"
export const uploadService = {
    uploadFromSystem
}
async function uploadFromSystem(event) {
    this.file = event.target.files[0]
    let formdata = new FormData()
    formdata.append('file', this.file)
    formdata.append('upload_preset', 'cajan_2022')
    try {
        const res = await axios.post(`https://api.cloudinary.com/v1_1/dw85wdwsw/image/upload`, formdata)
        return res.data
    } catch (err) {
        console.log('ERROR', err)
    }
}