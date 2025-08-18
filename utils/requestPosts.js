import { getUserInfo } from "./getUserInfo.js";

// const sites = {
//     e621: {
//         specificPost:`https://e621.net/posts/${postId}.json`,
//         posts: 'https://e621.net/posts.json?'
//     },
//     e926: {
//         specificPost:`https://e926.net/posts/${postId}.json`,
//         posts: 'https://e926.net/posts.json?'
//     },
//     rule34: {
//         specificPost: 'https://api.rule34.xxx/index.php?page=dapi&s=post&q=index',
//         posts: `${this.specificPost}&id=${postId}`
//     }
// }

function setPageApi(site, postId) {
    const sites = {
        e621: {
            specificPost:`https://e621.net/posts/${postId}.json`,
            posts: 'https://e621.net/posts.json?'
        },
        e926: {
            specificPost:`https://e926.net/posts/${postId}.json`,
            posts: 'https://e926.net/posts.json?'
        },
        rule34: {
            specificPost: 'https://api.rule34.xxx/index.php?page=dapi&s=post&q=index',
            posts: `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&id=${postId}`
        }
    };

    return sites[site];
}


export async function requestPosts() {
    const user = getUserInfo();
    // const site = setPageApi
    const limit = 8;
    // const reqUrl = `https://e926.net/posts.json?login=${username}&api_key=${apiKey}`;

    const response = await fetch(`https://e926.net/posts.json?limit=${limit}`, {
        headers: {
            // 'Authorization': 'Basic ' + btoa(`${user.username}:${user.apiKey}`),
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
