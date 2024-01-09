class TWPassage {
    pID: number;
    name: string;
    content: string;

    constructor(name: string = 'default', pID: number = -1, content: string = '') {
        this.name = name;
        this.pID = pID;
        this.content = content;
    }
}

class TWStory {
    name: string;
    startNode: number;
    passages: TWPassage[];

    constructor() {
        const data = document.querySelector('tw-storydata');
        
        this.name = data?.getAttribute('name') || 'default';
        this.startNode = parseInt(data?.getAttribute('startnode') || '1');
        this.passages = [];
        data?.querySelectorAll('tw-passagedata').forEach( (item) => {
            this.passages.push(new TWPassage(
                item.getAttribute('name') || 'NO_NAME!',
                parseInt(item.getAttribute('pid') || '-1'),
                item.innerHTML,
            ));
        });

    }

    getPassageByID = (id: number): TWPassage => {
        const result = this.passages.find(p => p.pID == id);
        if (result != null) return result;
        else throw new Error('Passage not found!');
    };

    getPassageByName = (name: string): TWPassage => {
        const result = this.passages.find(p => p.name == name);
        if (result != null) return result;
        else throw new Error('Passage not found!');
    };


    htmlDecode = (inp: string): string => {
        const result = new DOMParser().parseFromString(inp, 'text/html');
        return result.documentElement.textContent || '';
    };

    appendPassage = (passage: TWPassage) => {
        document.body.innerHTML = this.htmlDecode(passage.content);
    };


    start = () => {
        const startPassage = this.getPassageByID(this.startNode);
        this.appendPassage(startPassage);
    };
}

const story = new TWStory();
story.start();