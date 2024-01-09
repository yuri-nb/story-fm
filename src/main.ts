class TWStory {
    name: string;

    constructor() {
        this.name = 'default';
    }

    print = () => {
        console.log(`
        story.name: ${this.name}
        `);
    };
}

const story = new TWStory();
story.print();