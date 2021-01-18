import {
    COLON,
    BEGIN,
    END
} from './constants'

export type KeyValue = {
    [key:string]: KeyValue[] | TreeType | string
}

export type TreeType = {
    [key:string]: KeyValue[] | TreeType | string
}

export const lines2tree = (lines:string[]):TreeType => {
    const output:TreeType = {}

    for(let i=0;i<lines.length;i++){
        const line = lines[i]
        const index = line.indexOf(COLON)

        const key = line.substr(0, index)
        const value = line.substr(index + 1)

        if(key === BEGIN){
            const componentName = value // VCALENDAR, VTIMEZONE, VEVENT, VALARM
            const lastLine = [END, componentName].join(COLON)
            const lastIndex = lines.indexOf(lastLine)

            const newLines = lines.slice(i + 1, lastIndex)
            if(newLines.length){
                const tree = lines2tree(newLines)

                if(!output[componentName])
                    output[componentName] = []

                const array:KeyValue[] = output[componentName] as any
                array.push(tree)
                output[componentName] = array

                i = lastIndex
            }
        }else if(line){
            output[key] = value
        }
    }

    return output
}