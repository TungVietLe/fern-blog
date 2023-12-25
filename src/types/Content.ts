

export class Content 
{
	private id: string;
	private title:string;
	private text:string;
	private date:string;
	
	constructor(id:string, title:string) {
		this.id = id;
		this.title = title;
		this.text = '';
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
}
