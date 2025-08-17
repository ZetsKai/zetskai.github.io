import { getUserInfo } from "./getUserInfo.js";

export async function requestPosts() {
    // const reqUrl = `https://e621.net/posts.json?login=${username}&api_key=${apiKey}`;
    const user = getUserInfo();
    // const nsfw = 'e621';
    const sfw = 'e926';

    const response = await fetch(`https://${sfw}.net/posts.json?limit=8`, {
        headers: {
            'Authorization': 'Basic ' + btoa(`${user.username}:${user.apiKey}`),
            'User-Agent': 'Foxhole/1.0 (ZetsKai)'
        }
    })
    .then(res => res.json());

    return response;
}

export async function requestSpecificPost(postId) {
    const user = getUserInfo();

    const response = await fetch(`https://e621.net/posts/${postId}.json`, {
        headers: {
            'Authorization': 'Basic ' + btoa(`${user.username}:${user.apiKey}`),
            'User-Agent': 'Foxhole/1.0 (ZetsKai)'
        }
    })
    .then(res => res.json());

    return response;
}
