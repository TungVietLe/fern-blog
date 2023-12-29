import parse from "html-react-parser"
import { handleDeleteAllFilesInFolder, handleGetAllDataInCollection, handleGetAllFileIDs } from "./firebaseUtils/handler";
import { ImgData } from "./types/BlogData";
import { marked } from "marked";

export function DecodeThenParseToHTML(inputString: string, imageSrc: ImgData[]) {
    const replaced =
            inputString
                .replace(/{{image(\d+)}}/g, (match, id) => {
                    const url = imageSrc.find((elem) => elem.id == id)?.url;
                    return `![${id}](${url})`;
                })
    //             .replace(/```([^`]+)```/g, (match, inside) => {
    //                 return `<pre class="code">${inside}</pre>`;
    //             })
    //             .replace(/``([^`]+)``/g, (match, inside) => {
    //                 return `<mark>${inside}</mark>`;
    //             })
    //             .replace(/`([^`]+)`/g, (match, inside) => {
    //                 return `<mark class="key">${inside}</mark>`;
    //             }) +
        return parse(marked.parse(replaced) as string); //parse markdown then parse html

}

export async function  DeleteUnusedFilesInStorage() {
    const usedID:string[] = []
    await handleGetAllDataInCollection("blogs").then((result) => {
        result.map((elem)=>{
            usedID.push(elem.title)
        })
    })
    const allIDs = await handleGetAllFileIDs("/images")
    const unusedIDs = allIDs.filter(item => !usedID.includes(item))

    await Promise.all(unusedIDs.map(async(item)=>{
        await handleDeleteAllFilesInFolder(`images/${item}`)
        console.log(`DELETE FILES IN ${item}`)
    }))
}