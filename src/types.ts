export type KeyValue = {
    key:string;
    __value__:any;
    [key:string]:string;
}

export type TreeType = {
    [key:string]: TreeType[] | TreeType | string
}
