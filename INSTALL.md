## Setup

- ## Modules

```bash
nest g resource users
```

### Auth

- With RestAPI and without CRUD points:

```bash
nest g resource auth
```

## Prisma

```bash
npm install prisma --save-dev
```

```bash
npx prisma init
```

```bash
npm install @prisma/client
```

- then , add prisma.module and prisma.service files

```ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
```

```ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

- finally:

```bash
npx prisma migrate dev --name init
```

## Validation

```bash
npm i --save class-validator class-transformer
```

## Encryption and Hashing

```bash
npm i bcrypt
```

```bash
npm i -D @types/bcrypt
```

## Authentication

```bash
npm install --save @nestjs/jwt
```

## Cookie

```bash
npm i cookie-parser
```

```bash
npm i -D @types/cookie-parser
```
