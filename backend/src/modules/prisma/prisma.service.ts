import { OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        const connectionString = process.env.DATABASE_URL;
        const pool = new Pool({ connectionString });
        const adapter = new PrismaPg(pool);

        // Передаем adapter, как того требует Prisma v7
        super({ adapter });
    }

    onModuleInit() {
        this.$connect();
    }

    onModuleDestroy() {
        this.$disconnect();
    }
}