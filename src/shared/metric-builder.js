export class MetricBuilder {

    constructor(chartBuilder, containerId) {
        this.chartBuilder = chartBuilder;
        this._container = document.getElementById(containerId);
    }

    buildMetric(metric) {
        const total = metric.devices.reduce((acc, d)=>{ return acc + d.value;}, 0);
        const colors = metric.options.colors;
        const localeStringOptions = metric.options.isCurrency ? {
            style: 'currency',
            currency: 'EUR',
            currencyDisplay: 'symbol',
            minimumFractionDigits: 0,
        } : {};
        const chartSelector = `mrf_donut_chart${metric.title}`;

        const devicesDataboxes = metric.devices.map((device, index)=>{
            const porcentage = Math.round(device.value * 100 / total ) + '%';
            return `
            <div class="col-6 p-0 mrf-device">
                <p class="mrf-device-name" style="color: ${colors[index]}">${device.name}</p>
                <span>${porcentage}<span class="mrf-device-value">${Math.round(device.value).toLocaleString('es-ES', localeStringOptions)}</span></span>
            </div>`;
        });

        const newMetricContainer = document.createElement('div');
        newMetricContainer.className = 'mrf-metric-container col-md';
        newMetricContainer.innerHTML = `
            <div class="row">
                <div class="col text-center">
                    <div class="${chartSelector}"></div>
                </div>
            </div>
            <div class="row">
                ${devicesDataboxes.join('')}
            </div>
        `;
        this._container.appendChild(newMetricContainer);
        this.chartBuilder.drawChart(metric, `.${chartSelector}`);
    }
}
