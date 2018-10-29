// Description:  
//   This is a tinypic.  
// Commands:  
//   okbot helo - Reply with world!  

const bearychat = require('bearychat');
var fs = require("fs");
var process = require("process");
var tinify = require("tinify");
var axios = require("axios");
tinify.key = "VRX9bi9e8ZyI63fV9d4uZcc35xrvvHTq";

module.exports = (robot) => {

    // var source = tinify.fromUrl("https://tinypng.com/images/panda-happy.png").resize({
    //     method: "fit",
    //     width: 100,
    //     height: 100
    // });
    // console.log(source.toFile("thumbnail.jpg"));
    // source.toFile("thumbnail.jpg");
    // var source = tinify.fromUrl("https://tinypng.com/images/panda-happy.png");
    // console.log(source.toFile("thumbnail.jpg"));
    // source.toFile("optimized.jpg");
    console.log(process.cwd());

    let pic = fs.readFile('./thumbnail.jpg', (err, data) => {
        if (err) throw err;
        // console.log(data);
    });

    robot.hear(/.*/, (res) => {
        // console.log(res);
        // res.send(pic);
        robot.emit('bearychat.attachment', {
            message: res.message,
            text: '当时我就念了...',
            attachments: [
                {
                    color: '#cb3f20',
                    text: '苟利国家生死以',
                },
                {
                    text: '岂因祸福避趋之',
                },
                {
                    images: [
                        { url: pic },
                    ]
                }]
        }
        );
    });
}