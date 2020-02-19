import * as d3 from "d3";
import { ChartBuilder } from "./chart-builder";

export class ChartDonutBuilder extends ChartBuilder {

    drawChart(chart, selector) {
        // Apply reverse to device and colors to make charts clockwise
        this._data = chart.devices.reverse();
        this._title = chart.title;
        this._colors = chart.options.colors.reverse();

        const localeStringOptions = chart.options.isCurrency ? {
            style: 'currency',
            currency: 'EUR',
            currencyDisplay: 'symbol',
            minimumFractionDigits: 0,
        } : {};

        const total = this._data.reduce((acc, d) => { return acc + d.value; }, 0);
        const width = 160;
        const height = 160;
        const thickness = 8;
        const radius = Math.min(width, height) / 2;
        const color = d3.scaleOrdinal().range(this._colors);

        const svg = d3.select(selector)
            .append('svg')
            .attr('class', 'pie')
            .attr('width', width)
            .attr('height', height);
        const g = svg.append('g')
            .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

        const arc = d3.arc()
            .innerRadius(radius - thickness)
            .outerRadius(radius);

        const pie = d3.pie()
            .value(function (d) { return d.value; })
            .sort(null);

        g.selectAll('path')
            .data(pie(this._data))
            .enter()
            .append("g")
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => color(i))
            .each(function (d, i) {
                this._current = i;
            });

        g.append('text')
            .attr('text-anchor', 'middle')
            .attr('font-weight', '400')
            .attr('font-size', '18px')
            .attr('dy', '-17px')
            .style('fill', '#AAAAAA')
            .text(this._title.toUpperCase());

        g.append('text')
            .attr('text-anchor', 'middle')
            .style('fill', '#333333')
            .attr('font-size', '24px')
            .attr('font-weight', '500')
            .attr('dy', '7px')
            .text(total.toLocaleString('es-ES', localeStringOptions));
    }
}