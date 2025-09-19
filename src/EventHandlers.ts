/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import { Lock, LockFactory, TokenFactory, Tokens } from "generated";
import type { TokenType_t } from "generated/src/db/Enums.gen";

TokenFactory.FeeTokenCreated.handler(async ({ event, context }) => {
  const entity: Tokens = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    token: event.params.token,
    name: event.params.name ?? "TEST",
    symbol: event.params.symbol ?? "TEST",
    totalSupply: event.params.totalSupply ?? BigInt(0),
    decimalPlaces: event.params.decimalPlaces ?? BigInt(0),
    owner: event.params.owner ?? "0x0000000000000000000000000000000000000000",
    tokenType: "FEE" as TokenType_t,
    createdAt: BigInt(event.block.timestamp),
    fee: event.params.transferTax ?? BigInt(0),
    transferTax: event.params.transferTax ?? BigInt(0),
  };

  const stats = await context.PlatformStats.get("1");

  if (!stats) {
    context.PlatformStats.set({
      id: "1",
      totalTokens: BigInt(1),
      totalTokenLockers: BigInt(0),
      totalLPLockers: BigInt(0),
      totalSales: BigInt(0),
    });
  } else {
    context.PlatformStats.set({
      id: "1",
      totalTokens: BigInt(stats.totalTokens ?? 0) + BigInt(1),
      totalTokenLockers: stats.totalTokenLockers,
      totalLPLockers: stats.totalLPLockers,
      totalSales: stats.totalSales,
    });
  }

  context.Tokens.set(entity);
});

TokenFactory.StandardTokenCreated.handler(async ({ event, context }) => {
  const entity: Tokens = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    token: event.params.token as string,
    name: event.params.name,
    symbol: event.params.symbol,
    totalSupply: event.params.totalSupply,
    decimalPlaces: event.params.decimalPlaces,
    owner: event.params.owner,
    tokenType: "STANDARD" as TokenType_t,
    createdAt: BigInt(event.block.timestamp),
    fee: BigInt(0),
    transferTax: BigInt(0),
  };

  const stats = await context.PlatformStats.get("1");

  if (!stats) {
    context.PlatformStats.set({
      id: "1",
      totalTokens: BigInt(1),
      totalTokenLockers: BigInt(0),
      totalLPLockers: BigInt(0),
      totalSales: BigInt(0),
    });
  } else {
    context.PlatformStats.set({
      id: "1",
      totalTokens: BigInt(stats.totalTokens ?? 0) + BigInt(1),
      totalTokenLockers: stats.totalTokenLockers,
      totalLPLockers: stats.totalLPLockers,
      totalSales: stats.totalSales,
    });
  }

  context.Tokens.set(entity);
});

LockFactory.LockCreated.handler(async ({ event, context }) => {
  const entity: Lock = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    token: event.params.token,
    owner: event.params.owner,
    lockingAmount: event.params.lockingAmount,
    lockTimeEnd: event.params.lockTimeEnd,
    projectImageUrl: event.params.projectImageUrl,
    createdAt: BigInt(event.block.timestamp),
    lockAddress: event.params.lock,
  };

  const stats = await context.PlatformStats.get("1");

  if (!stats) {
    context.PlatformStats.set({
      id: "1",
      totalTokens: BigInt(0),
      totalTokenLockers: BigInt(1),
      totalLPLockers: BigInt(0),
      totalSales: BigInt(0),
    });
  } else {
    context.PlatformStats.set({
      id: "1",
      totalTokens: stats.totalTokens,
      totalTokenLockers: BigInt(stats.totalTokenLockers ?? 0) + BigInt(1),
      totalLPLockers: stats.totalLPLockers,
      totalSales: stats.totalSales,
    });
  }

  context.Lock.set(entity);
});
