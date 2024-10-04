import multer from '@koa/multer';

import { userService } from 'resources/user';

import { cloudStorageService } from 'services';

import { AppKoaContext, AppRouter, Next } from 'types';

const upload = multer();

async function validator(ctx: AppKoaContext, next: Next) {
  const { file } = ctx.request;

  ctx.assertClientError(file, { global: 'File cannot be empty' });

  await next();
}

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;
  const { file } = ctx.request;

  const fileName = `${user._id}-${Date.now()}-${file.originalname}`;
  const avatarUrl = await cloudStorageService.upload(fileName, file);

  ctx.body = await userService.updateOne({ _id: user._id }, () => ({ avatarUrl })).then(userService.getPublic);
}

export default (router: AppRouter) => {
  router.post('/avatar', upload.single('file'), validator, handler);
};
