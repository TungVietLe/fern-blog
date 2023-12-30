import { signal } from "@preact/signals-react";
import { BlogData, defaulBlogData, ImgData } from "types/BlogData";

// signals
export const blogData = signal<BlogData>(defaulBlogData as BlogData);
export const imageList = signal<ImgData[]>([]);
export const thumbnailFile = signal<ImgData[]>([]); // only take the first file as thumbnail
// end signals