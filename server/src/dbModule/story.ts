/* eslint-disable no-underscore-dangle */
import { Types } from '@codepocket/core-server';
import { to } from 'await-to-js';
import { FastifyInstance } from 'fastify';

import { CustomResponse } from '../utils/responseHandler';
import { getCodeInfoById } from './code';

export const getStories =
  (server: FastifyInstance) =>
  async ({ codeAuthor, codeName }: Types.CodeInfo) => {
    const [err, stories] = await to(
      (async () => await server.store.Story.find({ codeAuthor, codeName }))(),
    );
    if (err) throw new CustomResponse({ customStatus: 5000 });
    if (!stories) throw new CustomResponse({ customStatus: 4002 });

    return stories;
  };

export const getStory =
  (server: FastifyInstance) =>
  async ({ codeAuthor, codeName, storyAuthor, storyName }: Types.StoryInfo) => {
    const [err, story] = await to(
      (async () =>
        await server.store.Story.findOne({ codeAuthor, codeName, storyAuthor, storyName }))(),
    );
    if (err) throw new CustomResponse({ customStatus: 5000 });
    if (!story) throw new CustomResponse({ customStatus: 4002 });

    return story;
  };

export const updateStory =
  (server: FastifyInstance) =>
  async ({ storyId, codes }: Types.StoryIdWithCode) => {
    const [err] = await to(
      (async () =>
        await server.store.Story.findByIdAndUpdate(storyId, { codes: JSON.stringify(codes) }))(),
    );

    if (err) throw new CustomResponse({ customStatus: 5000 });
  };

export const existStory =
  (server: FastifyInstance) =>
  async ({ codeId, storyAuthor, storyName }: Types.StoryInfoWithCodeId) => {
    const { codeAuthor, codeName } = await getCodeInfoById(server)({ codeId });
    const [err, story] = await to(
      (async () =>
        await server.store.Story.findOne({ codeAuthor, codeName, storyAuthor, storyName }))(),
    );
    if (err) throw new CustomResponse({ customStatus: 5000 });
    return !!story;
  };

export const existStoryWithStoryId =
  (server: FastifyInstance) =>
  async ({ storyId }: Types.StoryId) => {
    const [err, story] = await to((async () => await server.store.Story.findById(storyId))());
    if (err) throw new CustomResponse({ customStatus: 5000 });
    return !!story;
  };

export const getStoryFullNames =
  (server: FastifyInstance) =>
  async ({ codeId }: Types.CodeId) => {
    const { codeAuthor, codeName } = await getCodeInfoById(server)({ codeId });
    const stories = await getStories(server)({ codeAuthor, codeName });

    const storyNames = stories.map(({ storyAuthor, storyName, _id }) => ({
      storyName: `${storyAuthor}-${storyName}`,
      storyId: String(_id),
    }));
    return storyNames;
  };

export const getStoryCode =
  (server: FastifyInstance) =>
  async ({ storyId }: Types.StoryId) => {
    const [getStoryCodeErr, story] = await to(
      (async () => await server.store.Story.findById(storyId))(),
    );
    if (getStoryCodeErr) throw new CustomResponse({ customStatus: 5000 });
    if (!story) throw new CustomResponse({ customStatus: 4002 });

    return JSON.parse(story.codes) as { [x: string]: string };
  };

export const createStory =
  (server: FastifyInstance) =>
  async ({ codeId, storyAuthor, storyName, codes }: Types.StoryInfoWithCode) => {
    const { codeAuthor, codeName } = await getCodeInfoById(server)({ codeId });
    const [createError, story] = await to(
      (async () =>
        await server.store.Story.create({
          codeId,
          codeName,
          codeAuthor,
          storyName,
          storyAuthor,
          codes: JSON.stringify(codes),
        }))(),
    );

    if (createError) throw new CustomResponse({ customStatus: 5000 });
    return String(story._id);
  };

export const deleteStory =
  (server: FastifyInstance) =>
  async ({ codeId, storyName, storyAuthor }: Types.StoryInfoWithCodeId) => {
    const [deleteError] = await to(
      (async () =>
        await server.store.Story.deleteOne({
          codeId,
          storyName,
          storyAuthor,
        }))(),
    );

    if (deleteError) throw new CustomResponse({ customStatus: 5000 });
  };
