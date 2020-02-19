export class RevenueService {

    static async getRevenue() {
        return fetch('/revenue').then((response)=> {
            return response.json();
        });
    }

}
