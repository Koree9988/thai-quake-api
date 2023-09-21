-- CreateTable
CREATE TABLE "fault_data" (
    "id" SERIAL NOT NULL,
    "magnitute" DOUBLE PRECISION NOT NULL,
    "date_utc" TIMESTAMP(3) NOT NULL,
    "fault_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "raw_data_id" INTEGER NOT NULL,

    CONSTRAINT "fault_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faults" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL DEFAULT 'Unknown',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "faults_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "raw_data" (
    "id" SERIAL NOT NULL,
    "date_utc" TIMESTAMP(6) NOT NULL,
    "magnitute" DOUBLE PRECISION NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "long" DOUBLE PRECISION NOT NULL,
    "utm_x" INTEGER NOT NULL,
    "utm_y" INTEGER NOT NULL,
    "depth" INTEGER,
    "phase" INTEGER,
    "center_th" VARCHAR,
    "center_en" VARCHAR,
    "severity_level" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "raw_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fault_area" (
    "id" SERIAL NOT NULL,
    "fault_id" INTEGER NOT NULL DEFAULT 0,
    "lats" TEXT,
    "longs" TEXT,
    "utms_x" TEXT,
    "utms_y" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "fault_area_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fault_area_fault_id_key" ON "fault_area"("fault_id");

-- AddForeignKey
ALTER TABLE "fault_data" ADD CONSTRAINT "fault_data_fault_id_fkey" FOREIGN KEY ("fault_id") REFERENCES "faults"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fault_data" ADD CONSTRAINT "fault_data_raw_data_id_fkey" FOREIGN KEY ("raw_data_id") REFERENCES "raw_data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fault_area" ADD CONSTRAINT "fault_area_fault_id_fkey" FOREIGN KEY ("fault_id") REFERENCES "faults"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
