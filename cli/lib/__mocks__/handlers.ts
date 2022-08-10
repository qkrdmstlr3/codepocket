import { GetCodeAuthorsResponse, GetCodeNamesResponse } from '@pocket/schema';
import { rest } from 'msw';

import {
  DefaultResponseData,
  NetworkResponseData,
  PullCodeAPIResponseData,
  ServerResponseData,
} from '../api';
import { BASE_DEFAULT_URL, POCKET_PROD_SERVER } from '../env';
import { generateListCodeResponseMock } from './mockup';

type Error = 'NO' | 'SERVER' | 'NETWORK';

const baseURL =
  (process.env.NODE_ENV === 'development' ? BASE_DEFAULT_URL : POCKET_PROD_SERVER) ||
  BASE_DEFAULT_URL;

export const pushCodeHandler = (error: Error = 'NO') =>
  rest.post(`${baseURL}/code`, (_, res, ctx) => {
    if (error === 'SERVER')
      return res(ctx.status(401), ctx.json<ServerResponseData>({ message: '서버 에러 발생' }));
    if (error === 'NETWORK')
      return res(ctx.status(404), ctx.json<NetworkResponseData>('네트워크 에러 발생'));
    return res(ctx.status(200), ctx.json<DefaultResponseData>({ message: 'success' }));
  });

export const pullCodeHandler = (error: Error = 'NO') =>
  rest.get(`${baseURL}/code`, (_, res, ctx) => {
    if (error === 'SERVER')
      return res(ctx.status(401), ctx.json<ServerResponseData>({ message: '서버 에러 발생' }));
    if (error === 'NETWORK')
      return res(ctx.status(404), ctx.json<NetworkResponseData>('네트워크 에러 발생'));
    return res(ctx.status(200), ctx.json<PullCodeAPIResponseData>({ code: 'this is code' }));
  });

export const getCodeAuthorsHandler = () =>
  rest.get(`${baseURL}/code/authors`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<GetCodeAuthorsResponse>({
        codeAuthors: [{ codeAuthor: 'author', isAnonymous: false }],
        message: 'success',
      }),
    );
  });

export const listCodeHandler = (error: Error = 'NO', isAuthor = false) =>
  rest.get(`${baseURL}/code/list`, (_, res, ctx) => {
    if (error === 'SERVER')
      return res(ctx.status(401), ctx.json<ServerResponseData>({ message: '서버 에러 발생' }));
    if (error === 'NETWORK')
      return res(ctx.status(404), ctx.json<NetworkResponseData>('네트워크 에러 발생'));
    return res(
      ctx.status(200),
      ctx.json<GetCodeNamesResponse>(generateListCodeResponseMock({ isAuthor })),
    );
  });

export const deleteCodeHandler = (error: Error = 'NO') =>
  rest.post(`${baseURL}/code/delete`, (_, res, ctx) => {
    if (error === 'SERVER')
      return res(ctx.status(401), ctx.json<ServerResponseData>({ message: '서버 에러 발생' }));
    if (error === 'NETWORK')
      return res(ctx.status(404), ctx.json<NetworkResponseData>('네트워크 에러 발생'));
    return res(ctx.status(200), ctx.json<DefaultResponseData>({ message: 'success' }));
  });
