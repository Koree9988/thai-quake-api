/*
  Warnings:

  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user_phone_number_key";

-- DropIndex
DROP INDEX "user_user_name_key";

-- AlterTable
ALTER TABLE "faults" ADD COLUMN     "lastest_event" TIMESTAMP(3),
ADD COLUMN     "next_event" INTEGER;

-- AlterTable
ALTER TABLE "fourier_result" ALTER COLUMN "y_3" SET DATA TYPE TEXT,
ALTER COLUMN "y_4" SET DATA TYPE TEXT,
ALTER COLUMN "y_5" SET DATA TYPE TEXT,
ALTER COLUMN "y_6" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "password",
DROP COLUMN "phone_number",
DROP COLUMN "user_name",
ALTER COLUMN "role" SET DEFAULT 'NORMAL_USER';
