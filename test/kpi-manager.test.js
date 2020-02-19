const MetricManager = require('../src/shared/metric-manager').MetricManager;
const Metric = require('../src/models/metric-model').Metric;

const metricManager = new MetricManager({});

describe('MetricManager tests', function () {
    describe('Test addMetric', function () {
        it('should return 0 when manager is created', function () {
            assert.equal(metricManager.metrics().length, 0);
        });

        it('should return 1 after a metric is added', function () {
            assert.equal(metricManager.metrics().length, 1);
        });
    });
});
