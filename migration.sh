#!/bin/bash
npx prisma db push
yarn seed
yarn dev