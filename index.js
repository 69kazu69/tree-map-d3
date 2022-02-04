let movieDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json"

let mData


let canvas = d3.select("#canvas")

let drawTreeMap = () => {

}

d3.json(movieDataUrl)
    .then((data, error) => {
        if(error){
            console.log(error)
        }else{
            mData = data
            console.log(mData)
        }
    })