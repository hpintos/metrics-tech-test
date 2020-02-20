export class MetricBuilder {

    constructor(chartBuilder, containerId) {
        this.chartBuilder = chartBuilder;
        this._container = document.getElementById(containerId);
    }

    buildMetric(metric) {
        const total = metric.devices.reduce((acc, device)=>{ return acc + device.value;}, 0);
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
            <div class="metric-footer-col-${index % 2 === 0 ? 'left' : 'right'}">
                <p class="device-name" style="color: ${colors[index]}">${device.name}</p>
                <span>${porcentage}<span class="device-value">${Math.round(device.value).toLocaleString('es-ES', localeStringOptions)}</span></span>
            </div>`;
        });

        const newMetricContainer = document.createElement('div');
        newMetricContainer.className = 'metric-container';
        newMetricContainer.innerHTML = `
            <div class="metric-header">
                <div class="${chartSelector}"></div>
            </div>
            <div class="metric-footer">
                ${devicesDataboxes.join('')}
            </div>
        `;
        this._container.appendChild(newMetricContainer);
        this.chartBuilder.drawChart(metric, `.${chartSelector}`);
    }
}
