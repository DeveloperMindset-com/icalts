import fs from 'fs'

const file = fs.readFileSync('./samples/blank_description.ics', 'utf-8')

const NEW_LINE = /\r\n|\n|\r/
const COLON = ':'
// const SEMICOLON = ';'
const BEGIN = 'BEGIN'
const END = 'END'

const ics2json = (raw:string) => {
    const lines = raw.split(NEW_LINE)
    const obj = lines2tree(lines)

    console.log(JSON.stringify(obj, null, 2))
}

type KeyValue = {
    [key:string]: KeyValue[] | TreeType | string
}
type TreeType = {
    [key:string]: KeyValue[] | TreeType | string
}
const lines2tree = (lines:string[]):TreeType => {
    let output:TreeType = {}

    for(let i=0;i<lines.length;i++){
        const line = lines[i]
        const index = line.indexOf(COLON)

        const key = line.substr(0, index)
        const value = line.substr(index + 1)

        if(key === BEGIN){
            const componentName = value //VCALENDAR, VTIMEZONE, VEVENT, VALARM
            const lastLine = [END, componentName].join(COLON)
            const lastIndex = lines.indexOf(lastLine)

            const newLines = lines.slice(i + 1, lastIndex)
            if(newLines.length){
                const tree = lines2tree(newLines)
                
                if(!output[componentName])
                    output[componentName] = []

                let array:KeyValue[] = output[componentName] as any
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

ics2json(file)