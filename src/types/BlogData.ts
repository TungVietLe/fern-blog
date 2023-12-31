import { Timestamp } from "@firebase/firestore";

export type BlogData = {
	title:string,
	content:string, 
	description:string,
	date:Timestamp,
	tag: string,
	thumbnailURL: string, 
	isPublished: boolean
}
export const defaulBlogData = {
	title: "",
	content: "",
	isPublished: false
} 

export type ImgData = { //upload
	id: string,
	file?: File,
	url: string
}
