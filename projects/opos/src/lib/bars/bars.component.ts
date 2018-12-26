import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { Tooltip } from '../tooltip'

@Component({
  selector: 'opos-bars',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.less']
})
export class BarsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var height = 300;
    var width = 300;
    var data = [
      { "weight": 1000, "color" : "grey" },
      { "weight": 8770, "color" : "grey" },
      { "weight": 3000, "color" : "yellow"},
      { "weight": 5000, "color" : "yellow"},
      { "weight": 8770, "color" : "red"}];
     
     var weights = data.map(function(d) { return d.weight; });
     const reducer = (r, i) => r + i;
     
     var svg = d3.select("div#container")
       .append("svg")
       .attr("preserveAspectRatio", "xMinYMin meet")
       .attr("viewBox", `0 0 ${width} ${height}`)
       .classed("svg-content", true)
    
     var barPadding = 5;
     var barWidth = 50;

     var container = svg.append("g")
     const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, weights.reduce(reducer, 0)]);
     const xScale = d3.scaleLinear()
        .range([barWidth * weights.length + barPadding * weights.length, 0])
        .domain([weights.length, 0])

     const tooltip = new Tooltip(svg);

     var bar = container.selectAll("g")
            .data(data)
          .enter().append("g")
            .attr("transform", function(d,i) {return `translate(${xScale(i)}, ${yScale(d.weight)})`})

      bar
        .append('rect')
        .attr('width', function(d) {  return barWidth; })
        .attr('fill', function(d) { return d.color})
        .attr('height', function(d, i) {return yScale(d.weight)});
    
      tooltip.addTooltip(bar)
     /*
     var identityScale = d3.scaleLinear()
       .domain([0, weights.reduce(reducer, 0)])
       .range([0, 300]);
                            
     var barHeight = 50;
         
     var bar = container.selectAll("g")
           .data(data)
         .enter().append("g")
           .attr('transform', function(d, i) {return "translate(" + identityScale(weights.slice(0, i).reduce(reducer, 0)) + ", 0)";})
    
     tooltip.addTooltip(bar)

     // rectangle
     bar
       .append('rect')
       .attr('width', function(d) {  return identityScale(d.weight); })
       .attr('fill', function(d) { return d.color})
       .attr('height', barHeight);

     // lable         
     bar.append("text")
         .attr("x", function(d, i) { return identityScale(d.weight / 2) })
         .attr("y", barHeight / 2)
         .attr("text-anchor", "middle")
         .attr("dy", ".35em")
         .text(function(d, i) { return weights[i]; });
      */
/*
     var barChart = svg.selectAll("rect")
     .data(dataset)
     .enter()
     .append("rect")
     .attr("y", function(d) {
         return svgHeight - d
     })
     .attr("height", function(d) {
         return d;
     })
     .attr("width", barWidth - barPadding)
     .attr("transform", function (d, i) {
          var translate = [barWidth * i, 0];
          return "translate("+ translate +")";
     });*/
  }

}
