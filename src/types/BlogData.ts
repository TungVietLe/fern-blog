export class BlogData 
{
	private id: string;
	private title:string;
	private content:string;
	private date:string;
	
	constructor(title:string, content:string) {
		this.id = "";
		this.title = title;
		this.content = content;
		this.date = '';
	}

	getID() {
		return this.id;
	}
	setID(i:string) 
	{
		this.id = i;
	}
	getTitle() {
		return this.title;
	}
	setTitle(t:string) {
		this.title = t;
	}

	toDictionary():Object{
		return {
			id: this.id,
			title: this.title,
			content: this.content,
			date:this.date
		}
	}
}
