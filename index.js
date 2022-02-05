let movieDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json"

let mData


let tooltip = d3.select("#tooltip")
let canvas = d3.select("#canvas")

let drawTreeMap = () => {
    let hierarchy = d3.hierarchy(mData, node => {
        return node['children']
    }).sum(node => {
        return node.value
    }).sort((node1, node2) => {
        return node2.value - node1.value

    })

    let createTreemap = d3.treemap()
                            .size([1000, 600])


    createTreemap(hierarchy)

    let movieTiles = hierarchy.leaves()

    let blck = canvas.selectAll("g")
        .data(movieTiles)
        .enter()
        .append("g")
        .attr("transform", movie => {
            return "translate(" + movie.x0 + "," + movie.y0 +")"
        })

    blck.append("rect")
        .attr("class", "tile")
        .attr("fill", (movie) => {
            let category = movie.data.category
            if(category === "Action"){
                return "orange"
            }else if(category === "Drama"){
                return "lightgreen"
            }else if(category === "Adventure"){
                return "coral"
            }else if(category === "Family"){
                return "lightblue"
            }else if(category === "Animation"){
                return "pink"
            }else if(category === "Comedy"){
                    return "khaki"
            }else{
                return "tan"
            }
        })
        .attr("data-name" , i => {
            return i.data.name
        })
        .attr("data-category", i=> {
            return i.data.category
        })
        .attr("data-value", i => {
            return i.data.value
        })
        .attr("width", i => {
            return i.x1 - i.x0
        })
        .attr("height", i => {
            return i.y1 - i.y0
        })
        .on("mouseover", (event, i) => {
                tooltip.transition()
                .style("visibility", "visible")
            
            tooltip.html(
                "$" + i.data.value + "<br />" + i.data.name
                
            )

            tooltip.attr("data-value", i.data.value)
        })
        .on("mouseout", i=> {
            tooltip.transition()
            .style("visibility", "hidden")
        })
            blck.append("text")
            .text(i => {
                return i.data.name
            })
            .attr("x", 5)
            .attr("y", 15)


    console.log(hierarchy   )
}

d3.json(movieDataUrl)
    .then((data, error) => {
        if(error){
            console.log(error)
        }else{
            mData = data
            console.log(mData)
            drawTreeMap()
        }
    })