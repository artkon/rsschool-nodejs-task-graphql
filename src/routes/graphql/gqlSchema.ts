import { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString, GraphQLNonNull } from 'graphql';

import { MemberTypeId, MemberType } from './types/memberType.js';
import { UUIDType } from './types/uuid.js';
import { PostType, CreatePostInput, ChangePostInput } from './types/post.js';
import { ChangeProfileInput, CreateProfileInput, ProfileType } from './types/profile.js';
import { ChangeUserInput, CreateUserInput, UserType } from './types/user.js';


/* eslint-disable */
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

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Post
        createPost: {
            type: PostType,
            args: {
                dto: { type: CreatePostInput },
            },
            resolve: ({ createPost }, { dto }, { prisma }) => createPost({ dto }, { prisma }),
        },
        changePost: {
            type: PostType,
            args: {
                id: { type: UUIDType },
                dto: { type: ChangePostInput },
            },
            resolve: ({ changePost }, { id, dto }, { prisma }) => changePost({ id, dto }, { prisma }),
        },
        deletePost: {
            type: GraphQLString,
            args: {
                id: { type: UUIDType },
            },
            resolve: ({ deletePost }, { id }, { prisma }) => deletePost({ id }, { prisma }),
        },

        // User
        createUser: {
            type: UserType,
            args: {
                dto: { type: CreateUserInput },
            },
            resolve: ({ createUser }, { dto }, { prisma }) => createUser({ dto }, { prisma }),
        },
        changeUser: {
            type: UserType,
            args: {
                id: { type: UUIDType },
                dto: { type: ChangeUserInput },
            },
            resolve: ({ changeUser }, { id, dto }, { prisma }) => changeUser({ id, dto }, { prisma }),
        },
        deleteUser: {
            type: GraphQLString,
            args: {
                id: { type: UUIDType },
            },
            resolve: ({ deleteUser }, { id }, { prisma }) => deleteUser({ id }, { prisma }),
        },

        // Profile
        createProfile: {
            type: ProfileType,
            args: {
                dto: { type: CreateProfileInput },
            },
            resolve: ({ createProfile }, { dto }, { prisma }) => createProfile({ dto }, { prisma }),
        },
        changeProfile: {
            type: ProfileType,
            args: {
                id: { type: UUIDType },
                dto: { type: new GraphQLNonNull(ChangeProfileInput) },
            },
            resolve: ({ changeProfile }, { id, dto }, { prisma }) => changeProfile({ id, dto }, { prisma }),
        },
        deleteProfile: {
            type: GraphQLString,
            args: {
                id: { type: UUIDType },
            },
            resolve: ({ deleteProfile }, { id }, { prisma }) => deleteProfile({ id }, { prisma }),
        },
        subscribeTo: {
            type: UserType,
            args: {
                userId: { type: UUIDType },
                authorId: { type: UUIDType },
            },
            resolve: ({ subscribeTo }, args, { prisma }) => subscribeTo(args, { prisma }),
        },
        unsubscribeFrom: {
            type: GraphQLString,
            args: {
                userId: { type: UUIDType },
                authorId: { type: UUIDType },
            },
            resolve: ({ unsubscribeFrom }, args, { prisma }) => unsubscribeFrom(args, { prisma }),
        }
    },
});

const schema = new GraphQLSchema({
    query: QueryType,
    types: [UserType],
    mutation: MutationType,
});

export default schema;
