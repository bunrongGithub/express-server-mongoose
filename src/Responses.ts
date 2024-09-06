const Responses = {
    _200(data = {}){
        return {
            headers: {
                'Content-Type': 'application-json',
                'Access-Control-Allow-Methods':'*',
                'Access-Control-Allow-Origin':'*',
            },
            statusCode: 200,
            body: data
        }
    },
    _400(data = {}){
        return {
            headers: {
                'Content-Type': 'application-json',
                'Access-Control-Allow-Methods':'*',
                'Access-Control-Allow-Origin':'*',
            },
            statusCode: 400,
            body: data
        }
    },
    _201(data = {}){
        return {
            headers: {
                'Content-Type': 'application-json',
                'Access-Control-Allow-Methods':'*',
                'Access-Control-Allow-Origin':'*',
            },
            statusCode: 201,
            body: data
        }
    }
}
export default Responses