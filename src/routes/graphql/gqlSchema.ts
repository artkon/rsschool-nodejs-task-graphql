import {
    GraphQLSchema,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLList,
} from 'graphql';

import { MemberTypeId } from './types/memberTypeId.js';
import { UUIDType } from './types/uuid.js';


const MemberType = new GraphQLObjectType({
    name: 'MemberType',
    fields: {
        id: { type: MemberTypeId },
        discount: { type: GraphQLFloat },
        postsLimitPerMonth: { type: GraphQLInt }
    },
});

const ProfileType = new GraphQLObjectType({
    name: 'Profile',
    fields: {
        id: { type: UUIDType },
        isMale: { type: GraphQLBoolean },
        yearOfBirth: { type: GraphQLInt },
        userId: { type: UUIDType },
        memberTypeId: { type: MemberTypeId },
        memberType: { type: MemberType },
    },
});

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: {
        id: { type: UUIDType },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        authorId: { type: UUIDType },
    },
});
/* eslint-disable */
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: UUIDType },
        name: { type: GraphQLString },
        balance: { type: GraphQLFloat },
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

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        memberTypes: {
            type: new GraphQLList(MemberType),
            resolve: ({ memberTypes }, _, { prisma }) => memberTypes({ prisma }),
        },
        users: {
            type: new GraphQLList(UserType),
            resolve: ({ users }, _, { prisma }) => users({ prisma }),
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve: ({ posts }, _, { prisma }) => posts({ prisma }),
        },
        profiles: {
            type: new GraphQLList(ProfileType),
            resolve: ({ profiles }, _, { prisma }) => profiles({ prisma }),
        },
        memberType: {
            type: MemberType,
            args: {
              id: { type: MemberTypeId },
            },
            resolve: ({ memberType }, { id }, { prisma }) => memberType({ id }, { prisma }),
        },
        user: {
            type: UserType,
            args: {
                id: { type: UUIDType },
            },
            resolve: ({ user }, { id }, { prisma }) => user({ id }, { prisma }),
        },
        post: {
            type: PostType,
            args: {
                id: { type: UUIDType },
            },
            resolve: ({ post }, { id }, { prisma }) => post({ id }, { prisma }),
        },
        profile: {
            type: ProfileType,
            args: {
                id: { type: UUIDType },
            },
            resolve: ({ profile }, { id }, { prisma }) => profile({ id }, { prisma }),
        },
    },
});

const schema = new GraphQLSchema({
    query: QueryType,
    types: [UserType],
});

export default schema;
