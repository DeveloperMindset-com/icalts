import fs from 'fs'
import { NEW_LINE } from './constants'
import { lines2tree } from './lines2tree'

// const file = fs.readFileSync('./samples/ics/blank_description.ics', 'utf-8')
const file = fs.readFileSync('./samples/ics/google_birthday.ics', 'utf-8')

const ics2json = (raw:string) => {
    const lines = raw.split(NEW_LINE)
    const obj = lines2tree(lines)

    // tslint:disable-next-line
    console.log(JSON.stringify(obj, null, 2))

    return obj
}

ics2json(file)