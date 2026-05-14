// var express = require('express');
// var router = express.Router();
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { IReq, IRes } from './common/types';
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

async function getAll(req: IReq, res: IRes) {
  console.log("getall users");
  console.log(req);
  res.status(HttpStatusCodes.OK).json({});
}

// module.exports = router;
export default {
  getAll
} as const;
