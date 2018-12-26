import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { Tooltip } from '../tooltip'

@Component({
  selector: 'opos-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.less']
})
export class OverviewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var data = [
      { "weight": 8770, "color" : "green" },
      { "weight": 1770, "color" : "purple"},
      { "weight": 1200, "color" : "red"}];
     
     var weights = data.map(function(d) { return d.weight; });
     const reducer = (r, i) => r + i;
     
     var svg = d3.select("div#container")
       .append("svg")
       .attr("preserveAspectRatio", "xMinYMin meet")
       .attr("viewBox", "0 0 300 300")
       .classed("svg-content", true)
    
     var container = svg.append("g")

     const tooltip = new Tooltip(svg);

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
  }
}
