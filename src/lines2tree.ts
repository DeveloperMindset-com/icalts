import {
    COLON,
    BEGIN,
    END,

    ComponentType,
    SPACE,
    // SPACE
} from './constants'

export type KeyValue = {
    [key:string]: KeyValue[] | TreeType | string
}

export type TreeType = {
    [key:string]: KeyValue[] | TreeType | string
}

// parsing content lines according to https://tools.ietf.org/html/rfc5545#section-3.1
const preprocessing = (lines:string[]):string[] => {
    let output:string[] = []

    for(let i=0;i<lines.length;i++){
        const line = lines[i]
    
        if(line.startsWith(SPACE)){
            output[output.length-1] += line.trim()
        }else if(line){
            output.push(line)
        }
    }

    return output
}

export const lines2tree = (rawLines:string[]):TreeType => {
    const lines:string[] = preprocessing(rawLines)
    return process(lines)
}

const process = (lines:string[], intend:number = 0):TreeType => {
    const output:TreeType = {}
    let componentName:ComponentType

    for(let i=0;i<lines.length;i++){
        const line = lines[i]
        const index = line.indexOf(COLON)

        const key = line.substr(0, index)
        const value = line.substr(index + 1)

        if(key === BEGIN){
            componentName = value as any
            const lastLine = [END, componentName].join(COLON)
            const lastIndex = lines.indexOf(lastLine, i)

            const newLines = lines.slice(i + 1, lastIndex)

            if(newLines.length){
                const tree = process(newLines, intend+1)

                if(!output[componentName])
                    output[componentName] = []

                const array:KeyValue[] = output[componentName] as any
                array.push(tree)
                output[componentName] = array

                i = lastIndex
            }
        }else if(line && !line.startsWith(END)){
            output[key] = value
        }
    }

    return output
}