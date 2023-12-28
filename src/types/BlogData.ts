import { Timestamp } from "@firebase/firestore";

export type BlogData = {
	title:string,
	content:string, 
	description:string,
	date:Timestamp,
	tag: string,
	thumbnailURL: string
}
export const defaulBlogData = {
	title: "",
	content: "",
}

export type ImgUpData = { //upload
	id: string,
	file: File,
}

export type ImgDownData = { //retrive from db
	id: string,
	url: string,
}