export default class VBaseError extends Error {
    public statusCode: number
    public statusText: string
    public fileName: string

    constructor(message: string, statusCode: number = 500, statusText: string = '', fileName: string = '') {
        super(message)
        this.name = 'VBaseError'
        this.statusCode = statusCode
        this.statusText = statusText
        this.fileName = fileName
    }
}