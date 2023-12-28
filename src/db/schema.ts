import { relations } from "drizzle-orm";
import {
  index,
  pgTable,
  serial,
  uuid,
  varchar,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";

// Users Table
export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    username: varchar("username", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }),
    walletAddress: varchar("wallet_address", { length: 100 })
      .notNull()
      .unique(),
  },
  (table) => ({
    displayIdIndex: index("users_display_id_index").on(table.displayId),
  }),
);

// Events Table
export const eventsTable = pgTable(
  "events",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    eventAddress: varchar("event_address", { length: 100 }),
    title: varchar("title", { length: 100 }).notNull(),
    description: jsonb("description").notNull(),
    startDate: varchar("start_date", { length: 100 }).notNull(),
    endDate: varchar("end_date", { length: 100 }).notNull(),
    targetValue: integer("target_value").notNull(),
    currentValue: integer("current_value").notNull(),
    currency: varchar("currency", { length: 100 }).notNull(),
    imageSrc: varchar("image_src", { length: 100 }).notNull(),
  },
  (table) => ({
    displayIdIndex: index("events_display_id_index").on(table.displayId),
    userIdIndex: index("events_user_id_index").on(table.userId),
  }),
);

// NFTs Table
export const nftsTable = pgTable(
  "nfts",
  {
    id: serial("id").primaryKey(),
    eventId: uuid("event_id")
      .notNull()
      .references(() => eventsTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    totalAmount: integer("total_amount").notNull(),
    nowAmount: integer("now_amount").notNull(),
    imageSrc: varchar("image_src", { length: 255 }).notNull(),
    price: integer("price").notNull(),
    name: varchar("name", { length: 100 }).notNull(),
  },
  (table) => ({
    eventIdIndex: index("nfts_event_id_index").on(table.eventId),
  }),
);

// Transactions Table
export const transactionTable = pgTable(
  "transactions",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    eventId: uuid("event_id")
      .notNull()
      .references(() => eventsTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    totalAmount: integer("total_amount").notNull(),
    transactionDate: varchar("transaction_date", { length: 100 }).notNull(),
  },
  (table) => ({
    userTransactionIndex: index("transactions_user_id_index").on(table.userId),
    eventTransactionIndex: index("transactions_event_id_index").on(
      table.eventId,
    ),
  }),
);

// Transaction Items Table
export const transactionItemsTable = pgTable(
  "transaction_items",
  {
    id: serial("id").primaryKey(),
    transactionId: integer("transaction_id")
      .notNull()
      .references(() => transactionTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    nftId: integer("nft_id")
      .notNull()
      .references(() => nftsTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    quantity: integer("quantity").notNull(),
  },
  (table) => ({
    transactionItemIndex: index("transaction_items_transaction_nft_index").on(
      table.transactionId,
      table.nftId,
    ),
  }),
);

// Relations
// Note: Define relations as per your application logic
export const usersRelations = relations(usersTable, ({ many }) => ({
  events: many(eventsTable),
}));

export const eventsRelations = relations(eventsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [eventsTable.userId],
    references: [usersTable.displayId],
  }),
  // Other relations for events
}));

export const nftsRelations = relations(nftsTable, ({ one }) => ({
  event: one(eventsTable, {
    fields: [nftsTable.eventId],
    references: [eventsTable.displayId],
  }),
}));

export const transactionRelations = relations(
  transactionTable,
  ({ one, many }) => ({
    user: one(usersTable, {
      fields: [transactionTable.userId],
      references: [usersTable.displayId],
    }),
    event: one(eventsTable, {
      fields: [transactionTable.eventId],
      references: [eventsTable.displayId],
    }),
    items: many(transactionItemsTable),
  }),
);

export const transactionItemsRelations = relations(
  transactionItemsTable,
  ({ one }) => ({
    transaction: one(transactionTable, {
      fields: [transactionItemsTable.transactionId],
      references: [transactionTable.id],
    }),
    nft: one(nftsTable, {
      fields: [transactionItemsTable.nftId],
      references: [nftsTable.id],
    }),
  }),
);
