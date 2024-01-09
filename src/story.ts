/**
 * Class representing the necessary data of a Twine Passage.
 * Tags, Color etc. are not needed and omitted.
 */
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

/**
 * Hold the necessary data of the story and the passages in an array.
 */
export class TWStory {
    name: string;
    startNode: number;
    passages: TWPassage[];

    /**
     * Reads the attributes of the storydata tag. Uses default values if no value can be found.
     */
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

    /**
     * Returns a passage from the passage Array with the matching ID. 
     * Throws an error if no passage can not be found.
     * @param id ID to look for 
     * @returns Passage with the fitting ID
     */
    getPassageByID = (id: number): TWPassage => {
        const result = this.passages.find(p => p.pID == id);
        if (result != null) return result;
        else throw new Error('Passage not found!');
    };

    /**
     * Return a passage from the passage Array with the matching name.
     * Throws an error if no passage can be found.
     * @param name 
     * @returns 
     */
    getPassageByName = (name: string): TWPassage => {
        const result = this.passages.find(p => p.name == name);
        if (result != null) return result;
        else throw new Error('Passage not found!');
    };

    /**
     * Takes a string(the content of a passage) and returns the parsed HTML.
     * @param inp Passage content
     * @returns string containing parsed HTML
     */
    htmlDecode = (inp: string): string => {
        const result = new DOMParser().parseFromString(inp, 'text/html');
        return result.documentElement.textContent || '';
    };

    /**
     * Append passage to the document body.
     * @param passage Passage to append.
     */
    appendPassage = (passage: TWPassage) => {
        document.body.innerHTML = this.htmlDecode(passage.content);
    };

    /**
     * Starts the story by appending the start passage to the document body.
     */
    start = () => {
        const startPassage = this.getPassageByID(this.startNode);
        this.appendPassage(startPassage);
    };
}