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
    async createPost({ dto }, { prisma }) {
        return prisma.post.create({
            data: dto,
        });
    },
    async createUser({ dto }, { prisma }) {
        return prisma.user.create({
            data: dto,
        });
    },
    async createProfile({ dto }, { prisma }) {
        return prisma.profile.create({
            data: dto,
        });
    },
    async deletePost({ id }, { prisma }) {
        await prisma.post.delete({ where: { id } });

        return 'post was deleted';
    },
    async deleteProfile({ id }, { prisma }) {
        await prisma.profile.delete({ where: { id } });

        return 'profile was deleted';
    },
    async deleteUser({ id }, { prisma }) {
        await prisma.user.delete({ where: { id } });

        return 'user was deleted';
    },
    async changePost({ id, dto }, { prisma }) {
        return await prisma.post.update({ where: { id }, data: dto });
    },
    async changeProfile({ id, dto }, { prisma }) {
        try {
            return await prisma.profile.update({ where: { id }, data: dto });
        } catch (error) {
            return error;
        }
    },
    async changeUser({ id, dto }, { prisma }) {
        return await prisma.user.update({ where: { id }, data: dto });
    },
    async subscribeTo({ userId, authorId }, { prisma }) {
        await prisma.subscribersOnAuthors.create({ data: { subscriberId: userId, authorId } });

        return prisma.user.findUnique({ where: { id: authorId } });
    },
    async unsubscribeFrom({ userId, authorId }, { prisma }) {
        await prisma.subscribersOnAuthors.delete({ where: {
            subscriberId_authorId: {
                subscriberId: userId,
                authorId: authorId,
            },
        }});

        return 'unsubscribed successfully';
    }
};

export default resolvers;
