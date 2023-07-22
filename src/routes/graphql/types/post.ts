import { GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

import { UUIDType } from './uuid.js';


const PostFieldsTypes = {
    title: GraphQLString,
    content: GraphQLString,
    authorId: UUIDType,
};

const createPostDtoFields = Object.keys(PostFieldsTypes).reduce((dto, field): object => {
    dto[field] = { type: new GraphQLNonNull(PostFieldsTypes[field]) };
    return dto;
}, {});

const changePostDtoFields = Object.keys(PostFieldsTypes).reduce((dto, field): object => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    dto[field] = { type: PostFieldsTypes[field] };
    return dto;
}, {});

export const CreatePostInput = new GraphQLInputObjectType({
    name: 'CreatePostInput',
    fields: createPostDtoFields,
});

export const ChangePostInput = new GraphQLInputObjectType({
    name: 'ChangePostInput',
    fields: changePostDtoFields,
});

export const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: {
        id: { type: UUIDType },
        ...createPostDtoFields,
    },
});
