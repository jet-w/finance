import axios from 'axios';
import { Auth } from "aws-amplify";

type ResponseType = 'text' | 'arraybuffer' | 'blob' | 'document' | 'json' | 'stream' | undefined | null;

/**
 * There are some serious shenanigans going on with the Axios request library error handling:
 * https://github.com/axios/axios/issues/960
 *
 * This forms part of why this error parsing function exists.
 */
export function parseHttpRequestError(error: any): string {
    if (error.response && error.response.data) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);

        // this would use more complex error messages, but we can get these from the console, so instead we use the simpler version, below
        // return error.response.status + " error: " + error.message + " - " + JSON.stringify(error.response.data);
        if (error.response.data.startsWith("{")) {
            const errorResponseObject = JSON.parse(error.response.data);

            if (errorResponseObject.message !== undefined) {
                return errorResponseObject.message
            }
        }

        return error.response.data;
    }
    else if (error.request && error.request.data) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        return "A request was made but no response was received from the server";
    }
    else {
        // Something happened in setting up the request that triggered an Error
        return error.message;
    }
}

export async function createHttpRequest(responseType: ResponseType = null) {
    ////get the token
    //let jwt = "";
    //const session = await Auth.currentSession()
    //// Better to use the accessToken instead of the idToken for API calls
    //// so we're not sending unencrypted personal details over the wire
    //const accessToken = session.getAccessToken();
    //jwt = accessToken.getJwtToken();


    return axios.create({
        baseURL: import.meta.env.VITE_API_URI,
        headers: {
            //"Authorization": `Bearer ${jwt}`,
            "Content-Type": "application/json"
        },
        responseType: responseType == null ? 'text' : responseType,
        paramsSerializer: {
            indexes: null
        }
    });
}

export async function simpleDelete(url: any, data: any): Promise<any> {
    const http = await createHttpRequest();

    const result = await http.delete(encodeURI(url), { data: data })
        .catch(function (error: any) {
            throw new Error(parseHttpRequestError(error));
        });

    return result;
}

export async function simplePut(url: string, data: any): Promise<any> {
    const http = await createHttpRequest();

    const result = await http.put(encodeURI(url), data)
        .catch(function (error: any) {
            throw new Error(parseHttpRequestError(error));
        });

    return result;
}

export async function simplePost(url: string, data: any): Promise<any> {
    const http = await createHttpRequest();

    const result = await http.post(encodeURI(url), data)
        .catch(function (error: any) {
            throw new Error(parseHttpRequestError(error));
        });

    return result;
}

export async function simpleGet(url: string, options?: { params: { [key: string]: any } | null }): Promise<any> {
    const http = await createHttpRequest();

    const result = await http
        .get(encodeURI(url), {
            params: options?.params
        })
        .catch(function (error: any) {
            throw new Error(parseHttpRequestError(error));
        });

    return result;
}

export async function simpleGet_Blob(url: string): Promise<any> {
    const http = await createHttpRequest("blob");

    const result = await http
        .get(encodeURI(url))
        .catch(function (error: any) {
            throw new Error(parseHttpRequestError(error));
        });

    return result;
}

export async function simplePost_Blob(url: string, data: any): Promise<any> {
    const http = await createHttpRequest("blob");

    const result = await http
        .post(encodeURI(url), data)
        .catch(function (error: any) {
            throw new Error(parseHttpRequestError(error));
        });

    return result;
}
