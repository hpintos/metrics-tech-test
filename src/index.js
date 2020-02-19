import './index.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

import Metric from "./models/metric-model";
import { ChartDonutBuilder } from "./charts/chart-donut-builder";
import { MetricManager } from './shared/metric-manager';
import { RevenueService } from './services/revenue-service';
import { ImpresionsService } from './services/impresions-service';
import { VisitsService } from './services/visits-service';

const config = {
    "chartBuilder": new ChartDonutBuilder(),
    "containerId": 'app-container'
};

const metricManager = new MetricManager(config);

(async function() {
    const revenueResponse = await RevenueService.getRevenue();
    metricManager.addMetric(new Metric(revenueResponse, { colors: ['#8CD543', '#3B681C'], isCurrency: true }));

    const impresionsResponse = await ImpresionsService.getImpresions();
    metricManager.addMetric(new Metric(impresionsResponse, { colors: ['#78C9EB', '#2F5569'], isCurrency: false }));

    const visitResponse = await VisitsService.getVisits();
    metricManager.addMetric(new Metric(visitResponse, { colors: ['#ECC42C', '#C05820'], isCurrency: false }));
})();
