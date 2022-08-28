
const path = require('path')
const webpack = require('webpack')

module.exports={
    mode:"production",
    entry: path.resolve(__dirname,'src/index.js'),
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:"jobsheet.js"
    }
    ,
    plugins:[
        new webpack.ProvidePlugin({
            html2pdf:"html2pdf.js"
        })
    ]
    
}