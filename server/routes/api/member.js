import express from 'express';
import multer from 'multer';
import Member from '../../models/member.js';

const router = express.Router();

//=================================
//             Member
//=================================

import multerS3 from 'multer-s3';
import path from 'path';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY,
});

const uploadS3 = multer({
    storage: multerS3({
        s3,
        bucket: 'jinseokproject1/upload',
        region: 'ap-northeast-2',
        key(req, file, cb) {
            const ext = path.extname(file.originalname); // 파일 확장자
            const basename = path.basename(file.originalname, ext); //
            cb(null, basename + new Date().valueOf() + ext); // 파일 중복이 없도록 설정하는 것들
        },
    }),
    limits: { fileSize: 100 * 1024 * 1024 }, //파일 용량 사이즈 설정
});

router.post('/image', uploadS3.single('file'), function (req, res, next) {
    res.json({ success: true, filePath: req.file.location, fileName: req.file.originalname });
});

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//       cb(null, `${Date.now()}_${file.originalname}`)
//     }
//   })

//   var upload = multer({ storage: storage }).single("file")

// router.post('/image', (req, res) => {

//     //가져온 이미지를 저장을 해주면 된다.
//     upload(req, res, err => {
//         if(err){
//             return req.json({success: false, err})
//         }
//         return res.json({success: true, filePath:res.req.file.path , fileName:res.req.file.filename})
//     })

// })

router.post('/', async (req, res) => {
    try {
        //받아온 정보들을 DB에 넣어준다.
        const member = new Member(req.body);

        await member.save(() => {
            res.status(200).json({ success: true });
        });
    } catch (e) {
        res.status(400).json({ success: false, err });
    }
});

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

router.get('/', async (req, res) => {
    try {
        const { page, size, title } = req.query;
        var condition = title ? { title: { $regex: new RegExp(title), $options: 'i' } } : {};

        const { limit, offset } = getPagination(page, size);

        await Member.paginate(condition, { offset, limit }).then((data) => {
            res.send({
                totalItems: data.totalDocs,
                memberdata: data.docs,
                totalPages: data.totalPages,
                currentPage: data.page - 1,
            });
        });
    } catch (e) {
        res.status(500).send({
            message: err.message || 'Some error occurred while retrieving tutorials.',
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        await Member.findByIdAndRemove(id, { useFindAndModify: false }).then((data) => {
            if (!data) {
                res.status(404).send({
                    success: false,
                });
            } else {
                res.send({
                    success: true,
                });
            }
        });
    } catch (e) {
        res.status(500).send({
            success: false,
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        await Member.findById(id).then((data) => {
            if (!data) res.status(404).send({ message: 'Not found id ' + id });
            else res.send(data);
        });
    } catch (e) {
        res.status(500).send({ message: 'Error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({
                message: 'Data to update can not be empty!',
            });
        }
        const id = req.params.id;

        await Member.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update id=${id}.`,
                });
            } else res.send({ message: 'updated successfully.' });
        });
    } catch (e) {
        res.status(500).send({
            message: 'Error updating id=' + id,
        });
    }
});

export default router;
