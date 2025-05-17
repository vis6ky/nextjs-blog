export interface IPostResponse {
    id: string;
    title: string;
    author: string;
    content: string;
    createdAt: string;
}

export interface IPostRequest {
    title: string;
    author: string;
    content: string;
}