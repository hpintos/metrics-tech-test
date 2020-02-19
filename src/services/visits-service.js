export class VisitsService {

    static async getVisits() {
        return fetch('/visits').then((response) => {
            return response.json();
        });
    }

}
