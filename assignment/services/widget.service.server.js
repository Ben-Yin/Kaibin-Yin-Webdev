/**
 * Created by BenYin on 2/18/17.
 */
module.exports = function (app, model) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgets);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/upload", upload.single('image-upload-file'), uploadImage);
    app.put("/api/page/:pageId/widget", sortWidget);
    app.get("/api/sign-s3", signS3);
    app.delete("/api/delete-s3", deleteS3Obj);

    function findAllWidgets(req, res) {
        var pageId = req.params.pageId;
        model
            .WidgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    res.json(widgets);
                }
            );

    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        model
            .WidgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    res.json(widget);
                }
            );
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var newWidget = req.body;
        model
            .WidgetModel
            .updateWidget(widgetId, newWidget)
            .then(
                function (widget) {
                    res.sendStatus(200);
                },
                function (err) {
                    console.log(err);
                    res.sendStatus(404);
                }
            );
    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var newWidget = req.body;
        model
            .WidgetModel
            .createWidget(pageId, newWidget)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (err) {
                    console.log(err);
                    res.sendStatus(404);
                }
            );
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        model
            .WidgetModel
            .deleteWidget(widgetId)
            .then(
                function () {
                    res.sendStatus(200);
                },
                function (err) {
                    console.log(err);
                    res.sendStatus(404);
                }
            );
    }

    function sortWidget(req, res) {
        var initial = req.query.initial;
        var final = req.query.final;
        var pageId = req.params.pageId;
        model
            .WidgetModel
            .reorderWidget(pageId, initial, final)
            .then(
                function () {
                    res.sendStatus(200);
                },
                function (err) {
                    console.log(err);
                    res.sendStatus(404);
                }
            );
    }


    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var redirectURL   = req.body.redirectURL;
        var uploadFile    = req.file;

        var originalname  = uploadFile.originalname; // file name on user's computer
        var filename      = uploadFile.filename;     // new file name in upload folder
        var format        = uploadFile.originalname.split(".").pop();
        var path          = uploadFile.path;         // full path of uploaded file
        var destination   = uploadFile.destination;  // folder where file is saved to
        var size          = uploadFile.size;
        var mimetype      = uploadFile.mimetype;

        for (var i in widgets) {
            if (widgets[i]._id == widgetId) {
                // widgets[i].url = "/uploads/" + md5(filename) + "." + format;
                widgets[i].url = "/uploads/" + filename;
                widgets[i].width = width;
                res.redirect("/assignment/#" + redirectURL);

            }
        }
    }

    function signS3(req, res) {
        var aws = require('aws-sdk');
        var s3 = new aws.S3();
        const S3_BUCKET = process.env.S3_BUCKET;

        const fileName = req.query.fileName;
        const fileType = req.query.fileType;
        const s3Params = {
            Bucket: S3_BUCKET,
            Key: fileName,
            Expires: 60,
            ContentType: fileType,
            ACL: 'public-read'
        };

        s3.getSignedUrl('putObject', s3Params, function(err, data) {
            if(err){
                console.log(err);
                return res.end();
            }
            const returnData = {
                signedRequest: data,
                url: "https://"+S3_BUCKET+".s3.amazonaws.com/"+fileName
            };
            res.write(JSON.stringify(returnData));
            res.end();
        });
    }

    function deleteS3Obj(req, res) {
        var aws = require('aws-sdk');
        var s3 = new aws.S3();
        const S3_BUCKET = process.env.S3_BUCKET;

        const fileName = req.query.fileName;
        const s3Params = {
            Bucket: S3_BUCKET,
            Key: fileName
        };

        s3.deleteObject(s3Params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
        });
    }

};