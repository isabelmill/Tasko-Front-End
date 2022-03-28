import axios from 'axios';
// const UPLOAD_URL = "https://api.unsplash.com/search/collections?page=1&query=cats&client_id=7J3v9FUMKbF2KbsE4NhWlimmR9EM6EhJEQb6e0lY1js&w=1500&dpr=2"

// AXIOS
export const uploadImg = async(searchRes = 'background') => {
    try {
        const res = await axios.get(`https://api.unsplash.com/search/photos?&orientation=landscape&page=1&per_page=20&query=${searchRes}&client_id=7J3v9FUMKbF2KbsE4NhWlimmR9EM6EhJEQb6e0lY1js&q=20&w=200`);
        return res.data;
    } catch (err) {
        console.error('ERROR!', err);
    }
};