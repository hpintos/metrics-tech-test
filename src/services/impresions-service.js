export class ImpresionsService {

    static async getImpresions() {
        return fetch('/impresions').then((response)=> {
            return response.json();
        });
    }

}
