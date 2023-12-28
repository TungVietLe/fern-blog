import parse from "html-react-parser"
import { ImgData } from "./types/BlogData";

export function DecodeThenParseToHTML(inputString: string, imageSrc: ImgData[]) {
    const replaced =
            '<pre>' +
            inputString
                .replace(/{{image(\d+)}}/g, (match, id) => {
                    const url = imageSrc.find((elem) => elem.id == id)?.url;
                    return `<img src="${url}" />`;
                })
                .replace(/```([^`]+)```/g, (match, inside) => {
                    return `<pre class="code">${inside}</pre>`;
                })
                .replace(/``([^`]+)``/g, (match, inside) => {
                    return `<mark>${inside}</mark>`;
                })
                .replace(/`([^`]+)`/g, (match, inside) => {
                    return `<mark class="key">${inside}</mark>`;
                }) +
            '</pre>';
        return parse(replaced);

}