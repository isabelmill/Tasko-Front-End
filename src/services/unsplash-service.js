import axios from 'axios';
const UPLOAD_URL = "https://api.unsplash.com/search/collections?page=1&query=cats&client_id=7J3v9FUMKbF2KbsE4NhWlimmR9EM6EhJEQb6e0lY1js&w=1500&dpr=2"

// AXIOS
export const uploadImg = async () => {
    try {
        const res = await axios.get(UPLOAD_URL);
        return res.data;
    } catch (err) {
        console.error('ERROR!', err);
    }
};