
import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const BarGraph = ({ isDataUploaded }) => {
    const svgRef = useRef();
    const [data, setData] = useState(null);

    const fetchBand = async () => {
        try {
            setData(null);
            const response = await axios.get("http://localhost:3004/banddata");
            const employeeData = response.data;

            const bandCounts = employeeData.reduce((counts, employee) => {
                const band = employee.Band;
                counts[band] = (counts[band] || 0) + 1;
                return counts;
            }, {});

            const formattedData = Object.entries(bandCounts).map(([band, count]) => ({ band, count }));
            setData(formattedData);
        } catch (error) {
            console.error("Error fetching band data:", error);
        }
    };

    useEffect(() => {
        fetchBand();
    }, [isDataUploaded]);

    useEffect(() => {
        if (!data) return;
        d3.select(svgRef.current).selectAll("*").remove();

        // Define dimensions and margins
        const margin = { top: 10, right: 30, bottom: 50, left: 24 };
        const width = 300 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        // Create scales
        const x = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.count)])
            .nice()
            .range([0, width]);

        const y = d3.scaleBand()
            .domain(data.map(d => d.band))
            .range([0, height])
            .padding(0.9); // Increase padding for larger gap between bars

        // Create SVG element
        const svg = d3.select(svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Create x-axis line
        svg.append('line')
            .attr('class', 'x-axis-line')
            .attr('x1', 0)
            .attr('y1', height)
            .attr('x2', width)
            .attr('y2', height)
            .attr('stroke', 'white')
            .attr('stroke-width', 1)
            .attr('shape-rendering', 'crispEdges');

        // Create bars
        svg.selectAll('.bar')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', 0)
            .attr('y', d => y(d.band))
            .attr('width', d => x(d.count))
            .attr('height', y.bandwidth())
            .attr('fill', 'blue')
            .attr('stroke', 'white') // Add white border to each bar
            .attr('stroke-width', 0.1); // Thinner bar lines

        // Add count labels
        svg.selectAll('.label')
            .data(data)
            .enter().append('text')
            .attr('class', 'label')
            .attr('x', d => x(d.count) + 5)
            .attr('y', d => y(d.band) + y.bandwidth() / 2)
            .text(d => d.count)
            .attr('fill', 'white'); // Set count labels to white

        // Add x-axis with band names
        svg.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x).tickSizeOuter(0)) // Tick size outer to remove end ticks
            .selectAll('text')
            .attr('fill', 'white'); // Set x-axis label color to white

        // Remove x-axis line
        svg.select('.x-axis path').remove();

        // Add y-axis band names
        svg.append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(y).tickSizeOuter(0)) // Tick size outer to remove end ticks
            .selectAll('text')
            .attr('fill', 'white'); // Set y-axis label color to white

    }, [data,isDataUploaded]);

    return (
        <div>
        <h5 style={{margin:"1rem"}}>Band</h5>
         <svg ref={svgRef}></svg>
       </div>
    );
};

export default BarGraph;
