import fs from 'fs'
import { NEW_LINE } from './constants'
import { lines2tree } from './lines2tree'

const file = fs.readFileSync('./samples/blank_description.ics', 'utf-8')

const ics2json = (raw:string) => {
    const lines = raw.split(NEW_LINE)
    const obj = lines2tree(lines)

    console.log(JSON.stringify(obj, null, 2))
}

ics2json(file)