import * as d3 from "d3";

export class Tooltip {
    xShift: number;
    xTextPos: number;
    yShift: number;
    yTextPos: number;
    container: any;
    
    constructor(private svg: any) {
        this.svg = svg
        this.xShift = 0
        this.yShift = 0

        const onMove = () => {
            var pt = this.svg.node().createSVGPoint(), svgP;
            pt.x = d3.event.clientX + this.xShift
            pt.y = d3.event.clientY + this.yShift
            svgP = pt.matrixTransform(this.svg.node().getScreenCTM().inverse());

            this.container.attr('transform', `translate(${svgP.x},${svgP.y})`)
        }
          
        this.container = this.svg.append('g')
        this.svg.on('mousemove', onMove)
        this.container.append('path')
            .style('fill', 'white').style('stroke', 'black')
        this.container.append('text')
            .attr('text-anchor', 'middle')
      }
  
      topTooltipPath(width, height, offset, radius) {
        const left = -width / 2
        const right = width / 2
        const top = -offset - height
        const bottom = -offset
        return `M 0,0 
            L ${-offset},${bottom} 
            H ${left + radius}
            Q ${left},${bottom} ${left},${bottom - radius}  
            V ${top + radius}   
            Q ${left},${top} ${left + radius},${top}
            H ${right - radius}
            Q ${right},${top} ${right},${top + radius}
            V ${bottom - radius}
            Q ${right},${bottom} ${right - radius},${bottom}
            H ${offset} 
            L 0,0 z`
    }

    addTooltip(obj) {
        obj
            .style('cursor', 'pointer')
            .on('mouseover', (d, i, e) => {
                    var pt = this.svg.node().createSVGPoint(), svgP;
                    pt.x = d3.event.clientX
                    pt.y = d3.event.clientY
                    svgP = pt.matrixTransform(this.svg.node().getScreenCTM().inverse());

                    this.showTooltip({x: svgP.x, y: svgP.y, text: d.weight})
                }).on('mouseleave', (d, i) => {
                    this.showTooltip(null)
                })
    }
    
    bottomTooltipPath(width, height, offset, radius) {
      const left = -width / 2
      const right = width / 2
      const bottom = offset + height
      const top = offset
      return `M 0,0 
        L ${-offset},${top} 
        H ${left + radius}
        Q ${left},${top} ${left},${top + radius}  
        V ${bottom - radius}   
        Q ${left},${bottom} ${left + radius},${bottom}
        H ${right - radius}
        Q ${right},${bottom} ${right},${bottom - radius}
        V ${top + radius}
        Q ${right},${top} ${right - radius},${top}
        H ${offset} 
        L 0,0 z`
    }
    
    leftTooltipPath(width, height, offset, radius) {
      const left = -offset - width
      const right = -offset
      const top = -height / 2
      const bottom = height / 2
      return `M 0,0 
        L ${right},${-offset} 
        V ${top + radius}
        Q ${right},${top} ${right - radius},${top}  
        H ${left + radius}   
        Q ${left},${top} ${left},${top + radius}
        V ${bottom - radius}
        Q ${left},${bottom} ${left + radius},${bottom}
        H ${right - radius}
        Q ${right},${bottom} ${right},${bottom - radius}
        V ${offset} 
        L 0,0 z`
    }
  
    rightTooltipPath(width, height, offset, radius) {
      const left = offset
      const right = offset + width
      const top = -height / 2
      const bottom = height / 2
      return `M 0,0 
        L ${left},${-offset} 
        V ${top + radius}
        Q ${left},${top} ${left + radius},${top}  
        H ${right - radius}   
        Q ${right},${top} ${right},${top + radius}
        V ${bottom - radius}
        Q ${right},${bottom} ${right - radius},${bottom}
        H ${left + radius}
        Q ${left},${bottom} ${left},${bottom - radius}
        V ${offset} 
        L 0,0 z`
      }
    
    tooltipPath(width, height, offset, radius, position) {
      const method = `${position}TooltipPath`
      return this[method](width, height, offset, radius)
    }
    
    
    getPlacement(obj) {
        this.yShift = 0
        this.yTextPos = 8
        
        if(obj.x < 150) {
            this.xTextPos = 100
            this.xShift = 5
            return 'right'
        }
        
        if(obj.x > 550) {
            this.xTextPos = -100
            this.xShift = -5
            return 'left'
        }
    
        this.xShift = 0
        this.xTextPos = 0
        
        if(obj.y > 150) {
          this.yTextPos = -32
          this.yShift = -5
          return 'top'
        }
        
        this.yTextPos = 48
        this.yShift = 5
        return 'bottom'
    }
    
    showTooltip(obj) {
        if(obj) {
            const placement = this.getPlacement(obj)
            this.container.select('path')
                .attr('d', this.tooltipPath(180,60,10,5,placement))
          
            this.container.select('text')
                .text(obj.text)
                .attr('x', this.xTextPos)
                .attr('y', this.yTextPos)
          
            this.container.transition()
                .duration(750).style('opacity', 1)
        } else {
            this.container.transition()
                .duration(100).style('opacity', 0)
      }
    }
  }