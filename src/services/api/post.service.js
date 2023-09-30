import axios from "../axios";

class PostService {
    async getAllPosts(page) {
        const response = await axios.get(`/post/all/${page}`);
        return response;
    }
}

export const postService = new PostService();