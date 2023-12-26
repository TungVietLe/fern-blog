export type BlogData = {
	title:string,
	content:string, 
	id?:string,
	date?:string
}

export type ImgUpData = { //upload
	id: string,
	file: File,
}

export type ImgDownData = { //retrive from db
	id: string,
	url: string,
}