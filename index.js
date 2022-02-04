let movieDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json"

let mData


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

    blck.append("rect")
        .attr("class", "tile")


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