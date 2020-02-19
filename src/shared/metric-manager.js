import { MetricBuilder } from "./metric-builder";

export class MetricManager {

    constructor({ chartBuilder, containerId }) {
        this._metricBuilder = new MetricBuilder(chartBuilder, containerId);
        this._metrics = [];
    }

    addMetric(metric) {
        this._metricBuilder.buildMetric(metric);
        this._metrics.push(metric);
    }

    get metrics() {
        return this._metrics;
    }
}
