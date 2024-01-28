
export class ApiResponse {
    static ok(message: string){
        return {
            statusCode: 200,
            message: message,
            dateTime: Date.now().toString()
        }
    }
}