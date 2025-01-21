import { sql } from 'drizzle-orm';
import { bigint, int, mysqlTable, serial, text, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users', {
	id: int().primaryKey().autoincrement(),
	username: varchar({ length: 255 }).notNull(),
	displayName: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	password: varchar({length: 255}).notNull(),
});

export const postsTable = mysqlTable('posts', {
	id: int().primaryKey().autoincrement(),
	author_id: int().references(()=>usersTable.id, {onDelete: 'cascade'}).notNull(),
	contents: text().notNull().default(""),
	timestamp: timestamp().notNull().defaultNow(),
})
