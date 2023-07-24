import {
    GraphQLFloat,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLNonNull,
} from 'graphql';

import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';
import { PostType } from './post.js';


const UserFieldsTypes = {
    name: GraphQLString,
    balance: GraphQLFloat,
}

const createUserDtoFields = Object.keys(UserFieldsTypes).reduce((dto, field): object => {
    dto[field] = { type: new GraphQLNonNull(UserFieldsTypes[field]) };
    return dto;
}, {});

const changeUserDtoFields = Object.keys(UserFieldsTypes).reduce((dto, field): object => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    dto[field] = { type: UserFieldsTypes[field] };
    return dto;
}, {});

export const CreateUserInput = new GraphQLInputObjectType({
    name: 'CreateUserInput',
    fields: createUserDtoFields,
});

export const ChangeUserInput = new GraphQLInputObjectType({
    name: 'ChangeUserInput',
    fields: changeUserDtoFields,
});

/* eslint-disable */
export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: UUIDType },
        ...createUserDtoFields,
        profile: { type: ProfileType },
        posts: { type: new GraphQLList(PostType) },
        userSubscribedTo: {
            type: new GraphQLList(UserType),
            resolve: async ({ id }, _, { prisma } ) =>
                await prisma.user.findMany({ where: { subscribedToUser: { some: { subscriberId: id } } } }),
        },
        subscribedToUser: {
            type: new GraphQLList(UserType),
            resolve: async ({ id }, _, { prisma } ) =>
                await prisma.user.findMany({ where: { userSubscribedTo: { some: { authorId: id } } } }),
        },
    }),
});
