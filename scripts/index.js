// Description:  
//   This is a tinypic.  
// Commands:  
//   okbot helo - Reply with world!  
var fs = require("fs");
var process = require("process");
var tinify = require("tinify");
var axios = require("axios");
tinify.key = "VRX9bi9e8ZyI63fV9d4uZcc35xrvvHTq";
module.exports = (robot) => {

    var axpost = function (base64, res) {
        var randomnum = Math.random();
        axios.post('http://116.85.17.155:3000', {
            pic: base64,
            math: randomnum
        })
            .then(function (response) {
                // console.log(response);
                robot.emit('bearychat.attachment', {
                    message: res.message,
                    text: 'tinypic',
                    attachments: [
                        {
                            images: [
                                { url: `http://116.85.17.155:3000/image${randomnum}.png` },
                            ]
                        }]
                })
            })
            .catch(function (error) {
                console.log("error123");
                robot.emit('bearychat.attachment', {
                    message: res.message,
                    text: 'tinypic',
                    attachments: [
                        {
                            images: [
                                { url: `http://116.85.17.155:3000/image${randomnum}.png` },
                            ]
                        }]
                })
            });
    };
    var base64pic;

    function tinypic(url, res) {
        // "https://tinypng.com/images/panda-happy.png"
        var source = tinify.fromUrl(url);
        base64pic = source.toFile("image.png");
        base64pic
            .then(function () {
                fs.readFile(`${process.cwd()}/image.png`, (err, data) => {
                    if (err) throw err;
                    console.log("要传送了");
                    axpost(data, res);
                });
            })
            .catch(function () {
                robot.emit('bearychat.attachment', {
                    message: res.message,
                    text: 'tinypic',
                    attachments: [
                        {
                            text: "please input valid image url"
                        }]
                })
            });
    };

    robot.hear(/.*/, (res) => {
        var picurl = res.message.user.message.text;
        console.log(picurl);
        tinypic(picurl, res);
    });
}