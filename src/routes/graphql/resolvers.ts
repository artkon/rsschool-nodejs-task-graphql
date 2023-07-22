const userIncludes = {
    profile: {
        include: { memberType: true }
    },
    posts: true,
};

/* eslint-disable */
const resolvers = {
    async memberTypes({ prisma }) {
        return await prisma.memberType.findMany();
    },
    async users({ prisma }) {
        return await prisma.user.findMany({ include: userIncludes });
    },
    async posts({ prisma }) {
        return await prisma.post.findMany();
    },
    async profiles({ prisma }) {
        return await prisma.profile.findMany();
    },
    async memberType({ id }, { prisma }) {
        return await prisma.memberType.findUnique({ where: { id } });
    },
    async user({ id }, { prisma }) {
        return await prisma.user.findUnique({ where: { id }, include: userIncludes });
    },
    async post({ id }, { prisma }) {
        return await prisma.post.findUnique({ where: { id } });
    },
    async profile({ id }, { prisma }) {
        return await prisma.profile.findUnique({ where: { id } });
    },
};

export default resolvers;
