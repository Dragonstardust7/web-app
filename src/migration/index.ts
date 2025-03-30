import addUserTable from "./00_add_user_table";

export async function applyMigrations() {
  await addUserTable();
}
