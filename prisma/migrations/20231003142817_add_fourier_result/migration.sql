-- CreateTable
CREATE TABLE "fourier_result" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "faultId" INTEGER NOT NULL,
    "x" INTEGER NOT NULL,
    "y_3" DOUBLE PRECISION NOT NULL,
    "y_4" DOUBLE PRECISION NOT NULL,
    "y_5" DOUBLE PRECISION NOT NULL,
    "y_6" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "fourier_result_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fourier_result" ADD CONSTRAINT "fourier_result_faultId_fkey" FOREIGN KEY ("faultId") REFERENCES "faults"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
