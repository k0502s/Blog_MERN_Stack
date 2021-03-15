import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config/index.js';
import auth from '../../middleware/auth.js';
const { JWT_SECRET } = config;

// Model
import User from '../../models/user.js';
import Member from '../../models/member.js';

const router = express.Router();

// @routes     GET api/user
// @desc       Get all user
// @access     public

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        if (!users) throw Error('No users');
        res.status(200).json(users);
    } catch (e) {
        console.log(e);
        res.status(400).json({ msg: e.message });
    }
});

// @routes     POST api/user
// @desc       Register  user
// @access     public

router.post('/', (req, res) => {
    console.log(req);
    const { name, email, password } = req.body;

    // Simple validation
    if (!name || !email || !password) {
        return res.status(400).json({ msg: '모든 필드를 채워주세요' });
    }
    // Check for existing user
    User.findOne({ email }).then((user) => {
        if (user) return res.status(400).json({ msg: '이미 가입된 유저가 존재합니다' });
        const newUser = new User({
            name,
            email,
            password,
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save().then((user) => {
                    jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                        if (err) throw err;
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                            },
                        });
                    });
                });
            });
        });
    });
});

// @route    POST   api/user/:username/profile
// @desc     POST   Edit Password
// @access   Private

router.post('/:userName/profile', auth, async (req, res) => {
    try {
        const { previousPassword, password, rePassword, userId, email, name } = req.body;
        console.log(req.body, 'userName Profile');
        const result = await User.findById(userId, 'password');
        // Check for existing user
        //  const user = User.findOne({ email })
        //     if (user)
        //       return res.status(400).json({ msg: "이미 가입된 유저가 존재합니다" });

        //   if(!user) {
        //     await User.findByIdAndUpdate(
        //       userId,
        //       {
        //         name,
        //         email,
        //       },
        //       { new: true } //몽고DB 업데이트 조건
        //     );
        //   }

        bcrypt.compare(previousPassword, result.password).then((isMatch) => {
            if (!isMatch) {
                return res.status(400).json({
                    match_msg: '기존 비밀번호와 일치하지 않습니다',
                });
            } else {
                if (password === rePassword) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(password, salt, (err, hash) => {
                            if (err) throw err;
                            result.password = hash;
                            result.name = name;
                            result.email = email;
                            result.save();
                        });
                    });
                    res.status(200).json({ success_msg: '비밀번호 업데이트에 성공했습니다' });
                } else {
                    res.status(400).json({ fail_msg: '새로운 비밀번호가 일치하지 않습니다' });
                }
            }
        });
    } catch (e) {
        console.log(e);
    }
});

router.post('/warn', auth, (req, res) => {
    //먼저 User 콜렉션에 해당 유저의 정보 가져오기
    //req.user === user //middleware을 통과하여 토큰에서 얻어온 user의 id값 가져옴
    User.findOne({ _id: req.user.id }, (err, userInfo) => {
        //가져온 정보에서 카트에다 넣으려하는 상품이 이미 들어 있는지 확인
        let duplicate = false;
        userInfo.cart.forEach((item) => {
            if (item.id === req.body.warndata) {
                //product와 user에 들가있는 cart id 값을 비교해서 확인
                duplicate = true;
            }
        });
        //상품이 이미 있을때
        if (duplicate) {
            User.findOneAndUpdate(
                { _id: req.user.id, 'cart.id': req.body.warndata },
                //$inc 올려준다, 더해준다는 의미이며
                //$.quantity을 통해 cart의 quantity을 1 올려준다는 의미이다.
                { $inc: { 'cart.$.quantity': 1 } },
                //업데이트된 정보를 받기 위해 new: true을 주었다.
                { new: true },
                (err, userInfo) => {
                    if (err) return res.status(400).json({ success: false, err });
                    res.status(200).send(userInfo.cart);
                }
            );
        }
        //상품이 이미 있지 않을때
        else {
            User.findOneAndUpdate(
                { _id: req.user.id },
                {
                    $push: {
                        cart: {
                            id: req.body.warndata,
                            quantity: 1,
                            date: Date.now(),
                        },
                    },
                },
                { new: true },
                (err, userInfo) => {
                    if (err) return res.status(400).json({ success: false, err });
                    res.status(200).send(userInfo.cart);
                }
            );
        }
    });
});

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

router.get('/warnlist_by_id', (req, res) => {
    // const { page, size } = req.body.params;
    console.log(req);
    const page = req.query.page;
    const size = req.query.size;

    const { limit, offset } = getPagination(page, size);
    const options = {
        limit: limit,
        offset: offset,
        populate: 'writier',
    };
    let type = req.query.type;
    let warnmemberIds = req.query.id;
    // id=12312,1231231,123123 이거를
    //이렇게 바꿈 productIds = ['12312', '1231231', '123123'] 받은 여러 id값을 배열로 만들어줌
    if (type === 'array') {
        let ids = req.query.id.split(',');
        warnmemberIds = ids.map((item) => {
            //map으로 콤마 하나하나 박아줌
            return item;
        });
    }
    //이제 여러개 상품 id을 이용하여 여러 개 삼품 가져올 수 있게됨
    const condition = { _id: { $in: warnmemberIds } };
    //productIds을 이용해서 DB에서 productId와 같은 상품의 정보를 가져온다. //id값이 여러개 들어 있는 배열을 못넣어서 $in을 사용함
    Member.paginate(condition, { offset, limit }).then((warnmember) => {
        // console.log(warnmember);
        res.status(200).send({
            totalItems: warnmember.totalDocs,
            warndata: warnmember.docs,
            totalPages: warnmember.totalPages,
            currentPage: warnmember.page - 1,
        });
    });
});

router.get('/removeWarnMember', auth, (req, res) => {
    //먼저 cart 안에 내가 지우려고 한 상품을 지워주기
    User.findOneAndUpdate(
        { _id: req.user.id },
        {
            //$push와 반대 개념이다. 끌어오는 것이니 없어버린다는 것이다.
            $pull: { cart: { id: req.query.id } },
        },
        { new: true },
        (err, userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map((item) => {
                return item.id;
            });

            //product collection에서 현재 남아있는 삼푸들의 정보를 가져오기

            //변수 array에 담겨있는 id 값들을 $in으로 productIds = ['123123124', '12312312'] 이런식으로 바꿔줌.
            Member.find({ _id: { $in: array } })
                .populate('writer')
                .exec((err, listInfo) => {
                    return res.status(200).json({
                        listInfo, //원하는 카트 삭제한 해당 product 콜렉션 값 가져옴(클라이언트에서 합쳐 다시 카트 페이지에 놓아주기 위한것임)
                        cart, //원하는 카트 삭제 후 업데이트 된 값이 담겨있는 cart
                    });
                });
        }
    );
});

export default router;
