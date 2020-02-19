export default class Metric {

    constructor({name, devices, historicData}, options) {
        this.title = name || '';
        this.devices = devices || [];
        this.historicData = historicData || [];
        this.options = options || {};
    }
}
