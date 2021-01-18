import fs from 'fs'
import { NEW_LINE } from './constants'
import { lines2tree } from './lines2tree'

// const file = fs.readFileSync('./samples/ics/blank_description.ics', 'utf-8')
// const file = fs.readFileSync('./samples/ics/google_birthday.ics', 'utf-8')

const ics2json = (raw:string) => {
    const lines = raw.split(NEW_LINE)
    const obj = lines2tree(lines)

    // tslint:disable-next-line
    // console.log(JSON.stringify(obj, null, 2))

    return obj
}

// ics2json(file)

const PATH_IN = `./samples/ics`
const PATH_OUT = `./samples/json`
const files = fs.readdirSync(PATH_IN)

files.map( filename => {
    if(filename.includes('.ics')){
        const f = filename.split('.')[0]
        const filenameICS = `${PATH_IN}/${f}.ics`
        const filenameJSON = `${PATH_OUT}/${f}.json`

        const file = fs.readFileSync(filenameICS, 'utf-8')
        const obj  = ics2json(file)
        const json  = JSON.stringify(obj, null, 2)

        fs.writeFileSync(filenameJSON, json)

        console.log(`'${f}',`)
    }
})