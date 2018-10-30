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

    function rename() {
        console.log('1');
        let nodepath = process.cwd();
        fs.rename(`${nodepath}/new.jpg`, `${nodepath}/node_modules/hubot/src/public/new.jpg`, function (err) {
            if (err) throw err;
        });
        robot.emit('bearychat.attachment', {
            message: res.message,
            text: 'tinypic',
            attachments: [
                {
                    images: [
                        { url: "./node_modules/hubot/src/public/tiny.jpg" },
                    ]
                }]
        })
    }
    function tinypic(url, res) {
        // var source = tinify.fromUrl("https://tinypng.com/images/panda-happy.png");
        var source = tinify.fromUrl(url);
        console.log(source.toFile("new.jpg"));
        source.toFile("new.jpg")
            .then(rename)
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
    // function resizepic(url, w, h) {
    //     var source = tinify.fromUrl(url).resize({
    //         method: "fit",
    //         width: w,
    //         height: h
    //     });
    //     source.toFile("./node_modules/hubot/src/public/resize.jpg");
    // };

    robot.hear(/.*/, (res) => {
        var picurl = res.message.user.message.text;
        console.log(picurl);
        tinypic(picurl, res);
    });
}