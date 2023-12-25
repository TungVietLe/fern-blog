export class Content {
	constructor(id, title) {
		this.id = id;
		this.title = title;
		this.text = '';
		this.date = '';
	}

	getID() {
		return this.id;
	}
	setID(i) {
		this.id = i;
	}
	getTitle() {
		return this.title;
	}
	setTitle(t) {
		this.title = t;
	}
}
