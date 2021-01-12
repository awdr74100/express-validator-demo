const router = require('express').Router();
const {
  body,
  check,
  oneOf,
  query,
  param,
  validationResult,
} = require('express-validator');

router.post(
  '/signup',
  body('username').trim().isAlphanumeric().withMessage('包含非法字元'),
  body('email').isEmail().normalizeEmail(),
  body('password', 'The password must be 5+ chars long and contain a number')
    .not()
    .isIn(['123', 'password'])
    .withMessage('Do not use a common word as the password')
    .isLength({ min: 8, max: 12 })
    .matches(/\d/),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const { username, email, password } = req.body;
    return res.send({ username, email, password });
  },
);

router.post(
  '/signin',
  body('usernameOrEmail').custom((value) => {
    console.log(value);
    if (!value) throw new Error('errr');
    return true;
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const { usernameOrEmail } = req.body;
    return res.send({ usernameOrEmail });
  },
);

router.post(
  '/body',
  check(['products.price', 'products.total'], 'error!!!').notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const { products } = req.body;
    return res.send({ products });
  },
);

router.post(
  '/params/:id',
  oneOf([
    param('id').toInt().isInt({ min: 4000 }),
    query(['name', 'age']).notEmpty(),
  ]),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const { id } = req.params;
    const { name, age } = req.query;
    return res.send({ id, name, age });
  },
);

module.exports = router;
